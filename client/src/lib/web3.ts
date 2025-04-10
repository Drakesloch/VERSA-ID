import { MetaMaskError } from "@shared/types";

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (result: any) => void) => void;
      removeListener: (event: string, callback: (result: any) => void) => void;
    };
  }
}

export const isMetaMaskInstalled = (): boolean => {
  return window.ethereum?.isMetaMask === true;
};

export const getEthereumAccounts = async (): Promise<string[]> => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed");
  }

  try {
    const accounts = await window.ethereum!.request({ method: "eth_requestAccounts" });
    return accounts;
  } catch (error) {
    const metamaskError = error as MetaMaskError;
    // Error code 4001 is "User rejected the request"
    if (metamaskError.code === 4001) {
      throw new Error("Please connect to MetaMask to continue");
    }
    throw new Error(`Error connecting to MetaMask: ${metamaskError.message}`);
  }
};

export const getCurrentWalletAddress = async (): Promise<string | null> => {
  if (!isMetaMaskInstalled()) {
    return null;
  }

  try {
    const accounts = await window.ethereum!.request({ method: "eth_accounts" });
    return accounts[0] || null;
  } catch (error) {
    console.error("Error getting wallet address", error);
    return null;
  }
};

export const signMessage = async (message: string, address: string): Promise<string> => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed");
  }

  try {
    const signature = await window.ethereum!.request({
      method: "personal_sign",
      params: [message, address],
    });
    return signature;
  } catch (error) {
    const metamaskError = error as MetaMaskError;
    throw new Error(`Error signing message: ${metamaskError.message}`);
  }
};

// Helper to truncate wallet address for display
export const truncateAddress = (address: string): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Get network name from chain ID
export const getNetworkName = async (): Promise<string> => {
  if (!isMetaMaskInstalled()) {
    return "Unknown";
  }

  try {
    const chainId = await window.ethereum!.request({ method: "eth_chainId" });
    switch (chainId) {
      case "0x1":
        return "Ethereum Mainnet";
      case "0x3":
        return "Ropsten Testnet";
      case "0x4":
        return "Rinkeby Testnet";
      case "0x5":
        return "Goerli Testnet";
      case "0xaa36a7":
        return "Sepolia Testnet";
      default:
        return `Chain ID: ${chainId}`;
    }
  } catch (error) {
    console.error("Error getting chain ID", error);
    return "Unknown";
  }
};
