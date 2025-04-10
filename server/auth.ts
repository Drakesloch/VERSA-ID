import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import { generateAndStoreOTP, verifyOTP } from "./web3";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "versa-id-secret-key",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false, { message: "Invalid username or password" });
        } else {
          return done(null, user);
        }
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // API routes for authentication
  app.post("/api/register", async (req, res, next) => {
    try {
      // Check if username already exists
      const existingUserByUsername = await storage.getUserByUsername(req.body.username);
      if (existingUserByUsername) {
        return res.status(400).json({ success: false, message: "Username already exists" });
      }

      // Check if email already exists
      const existingUserByEmail = await storage.getUserByEmail(req.body.email);
      if (existingUserByEmail) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      }

      // Create user with hashed password
      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
      });

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      // Log the user in
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json({ 
          success: true, 
          message: "Registration successful", 
          user: userWithoutPassword 
        });
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: info?.message || "Invalid username or password",
        });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        
        res.status(200).json({
          success: true,
          message: "Login successful",
          user: userWithoutPassword,
        });
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).json({ success: true, message: "Logout successful" });
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = req.user;
    
    res.json({
      success: true,
      user: userWithoutPassword,
    });
  });

  // API route to connect wallet
  app.post("/api/connect-wallet", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    try {
      const { walletAddress } = req.body;

      if (!walletAddress) {
        return res.status(400).json({
          success: false,
          message: "Wallet address is required",
        });
      }

      const updatedUser = await storage.connectWallet(req.user.id, walletAddress);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser;

      res.status(200).json({
        success: true,
        message: "Wallet connected successfully",
        user: userWithoutPassword,
      });
    } catch (err) {
      next(err);
    }
  });

  // API route to generate OTP for VERSA-ID authentication
  app.post("/api/generate-otp", async (req, res) => {
    try {
      const { versaId } = req.body;

      if (!versaId) {
        return res.status(400).json({
          success: false,
          message: "VERSA-ID is required",
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

      // Generate and store OTP
      const otp = generateAndStoreOTP(versaId);

      res.status(200).json({
        success: true,
        message: "OTP generated successfully",
        otp,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error generating OTP",
      });
    }
  });

  // API route to verify OTP for VERSA-ID authentication
  app.post("/api/verify-otp", async (req, res) => {
    try {
      const { versaId, otp } = req.body;

      if (!versaId || !otp) {
        return res.status(400).json({
          success: false,
          message: "VERSA-ID and OTP are required",
        });
      }

      // Verify OTP
      const isValid = verifyOTP(versaId, otp);

      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired OTP",
        });
      }

      // Get user by VERSA-ID
      const user = await storage.getUserByVersaId(versaId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "VERSA-ID not found",
        });
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        user: userWithoutPassword,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error verifying OTP",
      });
    }
  });
}
