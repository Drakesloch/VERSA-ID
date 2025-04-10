import { randomBytes, createHash } from "crypto";

/**
 * Generates a unique VERSA-ID based on the wallet address
 * In production, this would involve more complex blockchain interactions
 */
export function generateVersaId(walletAddress: string): string {
  if (!walletAddress) {
    throw new Error("Wallet address is required to generate VERSA-ID");
  }

  // Create a deterministic but unique ID based on the wallet address
  // In a real system, this would involve smart contract interactions
  const hash = createHash('sha256')
    .update(walletAddress.toLowerCase())
    .digest('hex');
  
  // Format it as a VERSA-ID (using first 8 characters of the hash)
  const shortHash = hash.substring(0, 8);
  return `VERSA-${shortHash}`;
}

/**
 * Verifies a wallet address signature
 * In a real implementation, this would verify a signature from MetaMask
 */
export function verifyWalletSignature(walletAddress: string, signature: string): boolean {
  // In a real implementation, we would verify the signature
  // For now, just return true if both are provided
  return !!walletAddress && !!signature;
}

/**
 * Generate a one-time password for SSO authentication
 */
export function generateOTP(): string {
  // Generate a 6-digit OTP
  return randomBytes(3).toString('hex').substring(0, 6).toUpperCase();
}

/**
 * Store active OTPs with their associated VERSA-IDs
 * In a real implementation, this would be stored in a database with expiration
 */
const activeOTPs = new Map<string, { otp: string, timestamp: number }>();

/**
 * Generates and stores an OTP for a VERSA-ID
 */
export function generateAndStoreOTP(versaId: string): string {
  const otp = generateOTP();
  activeOTPs.set(versaId, { otp, timestamp: Date.now() });
  return otp;
}

/**
 * Verifies an OTP for a VERSA-ID
 */
export function verifyOTP(versaId: string, otp: string): boolean {
  const otpData = activeOTPs.get(versaId);
  
  if (!otpData) {
    return false;
  }
  
  // Check if OTP is expired (5 minutes)
  const isExpired = Date.now() - otpData.timestamp > 5 * 60 * 1000;
  
  if (isExpired) {
    activeOTPs.delete(versaId);
    return false;
  }
  
  // Verify OTP
  const isValid = otpData.otp === otp;
  
  if (isValid) {
    // Remove OTP after successful verification
    activeOTPs.delete(versaId);
  }
  
  return isValid;
}
