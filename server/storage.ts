import { users, type User, type InsertUser } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { generateVersaId } from "./web3";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByVersaId(versaId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  connectWallet(userId: number, walletAddress: string): Promise<User | undefined>;
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async getUserByVersaId(versaId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.versaId === versaId,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt, walletAddress: null, versaId: null };
    this.users.set(id, user);
    return user;
  }

  async connectWallet(userId: number, walletAddress: string): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;

    // Generate VERSA-ID based on wallet address
    const versaId = generateVersaId(walletAddress);
    
    // Update user with wallet address and VERSA-ID
    const updatedUser: User = {
      ...user,
      walletAddress,
      versaId,
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
}

export const storage = new MemStorage();
