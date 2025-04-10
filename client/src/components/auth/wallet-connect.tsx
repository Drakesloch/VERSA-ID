import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useMetaMask } from "@/hooks/use-metamask";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle, ExternalLink } from "lucide-react";
import { truncateAddress } from "@/lib/web3";
import { VersaIdBadge } from "@/components/ui/versa-id-badge";
import { useLocation } from "wouter";

export function WalletConnect() {
  const { user, connectWalletMutation } = useAuth();
  const { isInstalled, isConnected, isConnecting, connect, currentAccount, error, clearError } = useMetaMask();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"check" | "connect" | "connecting" | "success">("check");

  useEffect(() => {
    // Initial step based on MetaMask state
    if (!isInstalled) {
      setStep("check");
    } else if (isConnected && currentAccount) {
      setStep("success");
    } else {
      setStep("connect");
    }
  }, [isInstalled, isConnected, currentAccount]);

  useEffect(() => {
    // Update step based on connection state
    if (isConnecting) {
      setStep("connecting");
    } else if (isConnected && currentAccount) {
      setStep("success");
    }
  }, [isConnecting, isConnected, currentAccount]);

  // When user has a wallet address and VERSA-ID, go to dashboard
  useEffect(() => {
    if (user?.walletAddress && user?.versaId) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  const handleConnect = async () => {
    setStep("connecting");
    const address = await connect();
    
    if (address) {
      // Connect wallet on backend
      connectWalletMutation.mutate({ walletAddress: address }, {
        onSuccess: (response) => {
          if (response.success) {
            setStep("success");
          }
        },
      });
    }
  };

  const installMetaMask = () => {
    window.open("https://metamask.io/download/", "_blank");
  };

  if (!user) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Required</AlertTitle>
        <AlertDescription>
          Please log in or create an account before connecting your wallet.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="border-neutral-800 bg-dark-card">
      <CardHeader>
        <CardTitle>Connect Your Wallet</CardTitle>
        <CardDescription>
          Link your Ethereum wallet to complete your VERSA-ID setup
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            <Button variant="ghost" size="sm" onClick={clearError} className="mt-2">
              Dismiss
            </Button>
          </Alert>
        )}

        {step === "check" && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-dark-lighter border border-neutral-800">
              <h3 className="font-medium mb-2">MetaMask Extension Required</h3>
              <p className="text-gray-400 text-sm mb-4">
                VERSA-ID requires MetaMask for secure blockchain authentication. Please install it to continue.
              </p>
              <Button onClick={installMetaMask} className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                Install MetaMask
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => setStep("connect")}
              className="w-full"
            >
              I've Installed MetaMask
            </Button>
          </div>
        )}

        {step === "connect" && (
          <div className="space-y-4">
            <Button
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
              onClick={handleConnect}
              disabled={connectWalletMutation.isPending}
            >
              Connect MetaMask
            </Button>
            <div className="text-center text-sm text-gray-400 mt-4">
              <p>New to Ethereum wallets?</p>
              <a
                href="https://metamask.io/faqs/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light mt-1 inline-flex items-center"
              >
                Learn how to set up MetaMask
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        )}

        {step === "connecting" && (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-center">Connecting to MetaMask...</p>
            <p className="text-center text-sm text-gray-400 mt-2">
              Please approve the connection request in the MetaMask popup
            </p>
          </div>
        )}

        {step === "success" && user?.versaId && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-dark-lighter border border-green-800 text-center">
              <div className="flex items-center justify-center text-green-500 mb-2">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Wallet Connected Successfully</span>
              </div>
              
              <div className="font-mono text-sm bg-dark p-2 rounded border border-neutral-800 mb-3">
                {truncateAddress(user.walletAddress || "")}
              </div>
              
              <p className="text-gray-400 text-sm mb-3">Your unique VERSA-ID has been generated:</p>
              
              <div className="flex justify-center mb-2">
                <VersaIdBadge versaId={user.versaId} size="lg" />
              </div>
              
              <p className="text-xs text-gray-500">
                Use this ID for secure authentication across supported platforms
              </p>
            </div>
            
            <Button 
              onClick={() => setLocation("/dashboard")}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
            >
              Go to Dashboard
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
