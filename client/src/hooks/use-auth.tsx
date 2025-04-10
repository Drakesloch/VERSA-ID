import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { insertUserSchema, loginUserSchema, User as SelectUser, InsertUser } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { AuthResponse } from "@shared/types";

type AuthContextType = {
  user: SelectUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<AuthResponse, Error, z.infer<typeof loginUserSchema>>;
  logoutMutation: UseMutationResult<AuthResponse, Error, void>;
  registerMutation: UseMutationResult<AuthResponse, Error, z.infer<typeof insertUserSchema>>;
  connectWalletMutation: UseMutationResult<AuthResponse, Error, { walletAddress: string }>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const {
    data,
    error,
    isLoading,
  } = useQuery<AuthResponse>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const user = data?.user || null;

  const loginMutation = useMutation({
    mutationFn: async (credentials: z.infer<typeof loginUserSchema>) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: (data: AuthResponse) => {
      if (data.success && data.user) {
        queryClient.setQueryData(["/api/user"], data);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      } else {
        toast({
          title: "Login failed",
          description: data.message || "An error occurred",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: z.infer<typeof insertUserSchema>) => {
      const res = await apiRequest("POST", "/api/register", credentials);
      return await res.json();
    },
    onSuccess: (data: AuthResponse) => {
      if (data.success && data.user) {
        queryClient.setQueryData(["/api/user"], data);
        toast({
          title: "Registration successful",
          description: "Your account has been created",
        });
      } else {
        toast({
          title: "Registration failed",
          description: data.message || "An error occurred",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/logout");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], { success: false, user: null });
      toast({
        title: "Logout successful",
        description: "You have been logged out",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const connectWalletMutation = useMutation({
    mutationFn: async ({ walletAddress }: { walletAddress: string }) => {
      const res = await apiRequest("POST", "/api/connect-wallet", { walletAddress });
      return await res.json();
    },
    onSuccess: (data: AuthResponse) => {
      if (data.success && data.user) {
        queryClient.setQueryData(["/api/user"], data);
        toast({
          title: "Wallet connected",
          description: "Your MetaMask wallet has been connected and VERSA-ID generated",
        });
      } else {
        toast({
          title: "Wallet connection failed",
          description: data.message || "An error occurred",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Wallet connection failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error: error as Error | null,
        loginMutation,
        logoutMutation,
        registerMutation,
        connectWalletMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
