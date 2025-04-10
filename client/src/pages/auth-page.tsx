import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterForm } from "@/components/auth/register-form";
import { LoginForm } from "@/components/auth/login-form";
import { WalletConnect } from "@/components/auth/wallet-connect";
import { useAuth } from "@/hooks/use-auth";
import { Shield, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [showWalletConnect, setShowWalletConnect] = useState(false);
  const { user } = useAuth();
  const [location, navigate] = useLocation();

  // Check for tab param in the URL (e.g., /auth?tab=register)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab === 'register' || tab === 'login') {
      setActiveTab(tab);
    }
  }, []);

  // If user is already logged in with a wallet connection, redirect to dashboard
  useEffect(() => {
    if (user?.walletAddress && user?.versaId) {
      navigate("/dashboard");
    } else if (user && !user.walletAddress) {
      // If user is logged in but doesn't have a wallet, show wallet connect
      setShowWalletConnect(true);
    }
  }, [user, navigate]);

  const handleAuthSuccess = () => {
    setShowWalletConnect(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark text-white">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-stretch gap-8">
            {/* Left Column - Auth Forms */}
            <div className="md:w-1/2">
              {showWalletConnect ? (
                <WalletConnect />
              ) : (
                <Card className="border-neutral-800 bg-dark-card">
                  <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="login">Log In</TabsTrigger>
                      <TabsTrigger value="register">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login" className="p-6">
                      <LoginForm onSuccess={handleAuthSuccess} />
                    </TabsContent>
                    <TabsContent value="register" className="p-6">
                      <RegisterForm onSuccess={handleAuthSuccess} />
                    </TabsContent>
                  </Tabs>
                </Card>
              )}
            </div>

            {/* Right Column - Info/Hero */}
            <div className="md:w-1/2 bg-gradient-to-br from-dark to-dark-lighter rounded-xl border border-neutral-800 p-8 flex flex-col justify-center">
              <div className="text-center md:text-left mb-6">
                <h1 className="text-3xl font-bold mb-3">
                  Secure Identity for the{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Web3 Future
                  </span>
                </h1>
                <p className="text-gray-300">
                  VERSA-ID provides a secure, decentralized single sign-on solution
                  that gives you control of your digital identity.
                </p>
              </div>

              {/* Feature bullets */}
              <div className="space-y-6 mt-8">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-medium mb-1">Blockchain Verified</h2>
                    <p className="text-sm text-gray-400">
                      All authentication requests are verified on the Ethereum blockchain
                      ensuring maximum security and transparency.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-medium mb-1">One ID for Everything</h2>
                    <p className="text-sm text-gray-400">
                      Use your VERSA-ID across multiple platforms with a single
                      secure identity, eliminating password fatigue.
                    </p>
                  </div>
                </div>
              </div>

              {/* Info bubble */}
              <div className="mt-10 bg-dark p-4 rounded-lg border border-neutral-700">
                <h3 className="font-medium text-primary mb-2">Why connect your wallet?</h3>
                <p className="text-sm text-gray-400">
                  Connecting your MetaMask wallet allows VERSA-ID to generate a unique
                  identifier tied to your blockchain address, providing an additional
                  layer of security beyond traditional username/password authentication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
