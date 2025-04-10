import { pgTable, text, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  walletAddress: text("wallet_address"),
  versaId: text("versa_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define a schema for inserting a user
export const insertUserSchema = createInsertSchema(users)
  .pick({
    username: true,
    email: true,
    password: true,
    fullName: true,
  })
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Define a schema for logging in
export const loginUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Define a schema for connecting a wallet
export const connectWalletSchema = z.object({
  walletAddress: z.string().min(1, "Wallet address is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type ConnectWallet = z.infer<typeof connectWalletSchema>;
export type User = typeof users.$inferSelect;
