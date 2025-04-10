export interface VersaIdInfo {
  versaId: string;
  walletAddress: string;
  username: string;
}

export interface MetaMaskError {
  code: number;
  message: string;
}

export interface SignInWithVersaIdRequest {
  versaId: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    username: string;
    email: string;
    fullName: string;
    walletAddress?: string;
    versaId?: string;
  };
}
