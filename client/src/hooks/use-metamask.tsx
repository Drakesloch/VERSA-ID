import { useState, useEffect, useCallback } from 'react';
import { isMetaMaskInstalled, getEthereumAccounts, getCurrentWalletAddress } from '@/lib/web3';

interface MetaMaskState {
  isInstalled: boolean;
  isConnecting: boolean;
  isConnected: boolean;
  accounts: string[];
  currentAccount: string | null;
  error: string | null;
}

export function useMetaMask() {
  const [state, setState] = useState<MetaMaskState>({
    isInstalled: false,
    isConnecting: false,
    isConnected: false,
    accounts: [],
    currentAccount: null,
    error: null,
  });

  // Check if MetaMask is installed
  useEffect(() => {
    const checkMetaMaskInstalled = async () => {
      const installed = isMetaMaskInstalled();
      setState(prevState => ({
        ...prevState,
        isInstalled: installed
      }));

      if (installed) {
        try {
          const address = await getCurrentWalletAddress();
          if (address) {
            setState(prevState => ({
              ...prevState,
              isConnected: true,
              currentAccount: address,
              accounts: [address]
            }));
          }
        } catch (error) {
          console.error('Error checking current wallet address:', error);
        }
      }
    };

    checkMetaMaskInstalled();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        setState(prevState => ({
          ...prevState,
          isConnected: false,
          accounts: [],
          currentAccount: null
        }));
      } else {
        // Update connected account
        setState(prevState => ({
          ...prevState,
          isConnected: true,
          accounts,
          currentAccount: accounts[0]
        }));
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  // Connect to MetaMask
  const connect = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      setState(prevState => ({
        ...prevState,
        error: 'MetaMask is not installed. Please install MetaMask to continue.'
      }));
      return null;
    }

    setState(prevState => ({
      ...prevState,
      isConnecting: true,
      error: null
    }));

    try {
      const accounts = await getEthereumAccounts();
      setState(prevState => ({
        ...prevState,
        isConnecting: false,
        isConnected: true,
        accounts,
        currentAccount: accounts[0] || null
      }));
      return accounts[0] || null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setState(prevState => ({
        ...prevState,
        isConnecting: false,
        error: errorMessage
      }));
      return null;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      error: null
    }));
  }, []);

  return {
    ...state,
    connect,
    clearError
  };
}
