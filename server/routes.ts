import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { WebSocketServer } from "ws";
import { log } from "./vite";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes and middleware
  setupAuth(app);
  
  // Route to serve the API JSON file for download
  app.get("/versa-id-api.json", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=versa-id-api.json');
    res.sendFile(path.join(process.cwd(), "client/public/versa-id-api.json"));
  });

  // Create HTTP server
  const httpServer = createServer(app);

  // Create WebSocket server for real-time notifications with proper error handling
  const wss = new WebSocketServer({ 
    server: httpServer,
    path: "/api/ws",  // Specify a path to avoid conflicts with Vite's WebSocket
    perMessageDeflate: false  // Disable compression to avoid some connection issues
  });

  // Store active connections
  const connections = new Map();

  // Handle WebSocket errors at the server level
  wss.on("error", (error) => {
    log(`WebSocket server error: ${error.message}`, "ws");
  });

  wss.on("connection", (ws, req) => {
    const id = Math.random().toString(36).substring(2, 10);
    log(`New WebSocket connection established: ${id}`, "ws");
    connections.set(id, ws);

    // Handle connection errors
    ws.on("error", (error) => {
      log(`WebSocket connection error: ${error.message}`, "ws");
    });

    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());
        log(`Received WebSocket message from ${id}: ${message.toString().substring(0, 50)}`, "ws");
        
        // Handle specific messages
        if (data.type === "subscribe" && data.versaId) {
          // Associate this connection with a specific VERSA-ID
          connections.set(id, { ws, versaId: data.versaId });
          log(`Client ${id} subscribed with VERSA-ID: ${data.versaId}`, "ws");
        }
      } catch (error) {
        log(`Error processing WebSocket message: ${error}`, "ws");
      }
    });

    ws.on("close", () => {
      log(`WebSocket connection closed: ${id}`, "ws");
      connections.delete(id);
    });
  });

  // API endpoint to check if a VERSA-ID exists
  app.get("/api/versa-id/:id", async (req, res) => {
    try {
      const versaId = req.params.id;
      const user = await storage.getUserByVersaId(versaId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "VERSA-ID not found",
        });
      }
      
      res.status(200).json({
        success: true,
        exists: true,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error checking VERSA-ID",
      });
    }
  });

  // API route for SSO verification
  app.post("/api/sso/verify", async (req, res) => {
    try {
      const { versaId, siteOrigin } = req.body;
      
      if (!versaId || !siteOrigin) {
        return res.status(400).json({
          success: false,
          message: "VERSA-ID and site origin are required",
        });
      }
      
      // Check if VERSA-ID exists
      const user = await storage.getUserByVersaId(versaId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "VERSA-ID not found",
        });
      }
      
      // Send notification to the user's active connections
      // Convert entries to array to avoid TypeScript downlevel iteration issues
      Array.from(connections.entries()).forEach(([id, connection]) => {
        if (connection.versaId === versaId && connection.ws.readyState === 1) {
          connection.ws.send(JSON.stringify({
            type: "sso_request",
            siteOrigin,
            timestamp: new Date().toISOString(),
          }));
        }
      });
      
      res.status(200).json({
        success: true,
        message: "SSO verification request sent",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error processing SSO verification",
      });
    }
  });

  return httpServer;
}
