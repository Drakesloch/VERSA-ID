import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VersaIdBadge } from "@/components/ui/versa-id-badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Copy, CheckCircle, FileKey, Clock, ShieldCheck } from "lucide-react";
import { getNetworkName, truncateAddress } from "@/lib/web3";
import { FaEthereum } from "react-icons/fa";
import { connectWebSocket, on, disconnectWebSocket } from "@/lib/websocket";

export default function DashboardPage() {
  const { user } = useAuth();
  const [network, setNetwork] = useState<string>("Loading...");
  const [copied, setCopied] = useState(false);
  const [otp, setOtp] = useState<string | null>(null);
  const [otpExpiry, setOtpExpiry] = useState<number | null>(null);

  // For storing SSO requests
  const [ssoRequests, setSsoRequests] = useState<Array<{
    siteOrigin: string;
    timestamp: string;
  }>>([]);
  
  useEffect(() => {
    // Get the current network
    async function fetchNetwork() {
      try {
        const networkName = await getNetworkName();
        setNetwork(networkName);
      } catch (error) {
        console.error("Error fetching network:", error);
        setNetwork("Unknown");
      }
    }

    fetchNetwork();
    
    // Connect to WebSocket if user has a VERSA-ID
    if (user?.versaId) {
      connectWebSocket(user.versaId)
        .then(() => {
          console.log("WebSocket connected successfully");
        })
        .catch(error => {
          console.error("Failed to connect to WebSocket:", error);
        });
      
      // Listen for SSO requests
      const unsubscribe = on("sso_request", (data) => {
        console.log("Received SSO request:", data);
        // Add the new request to the list
        setSsoRequests(prev => [data, ...prev].slice(0, 5)); // Keep only 5 most recent requests
      });
      
      // Clean up on unmount
      return () => {
        unsubscribe();
        disconnectWebSocket();
      };
    }
  }, [user?.versaId]);

  // Simulate OTP generation and expiry (this would come from a real API)
  const generateOTP = () => {
    // In a real implementation, this would be an API call
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(mockOtp);
    setOtpExpiry(Date.now() + 5 * 60 * 1000); // 5 minutes from now
    
    // Auto-clear after 5 minutes
    setTimeout(() => {
      setOtp(null);
      setOtpExpiry(null);
    }, 5 * 60 * 1000);
  };

  const copyVersaId = () => {
    if (user?.versaId) {
      navigator.clipboard.writeText(user.versaId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatTimeRemaining = () => {
    if (!otpExpiry) return "0:00";
    
    const remaining = Math.max(0, otpExpiry - Date.now());
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Update the timer every second
  useEffect(() => {
    if (!otpExpiry) return;
    
    const interval = setInterval(() => {
      if (Date.now() >= otpExpiry) {
        clearInterval(interval);
        setOtp(null);
        setOtpExpiry(null);
      } else {
        // Force re-render to update time
        setOtpExpiry(otpExpiry);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [otpExpiry]);

  if (!user?.versaId || !user?.walletAddress) {
    return (
      <div className="flex flex-col min-h-screen bg-dark text-white">
        <Header />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4 md:px-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Account Not Configured</AlertTitle>
              <AlertDescription>
                Please complete your account setup by connecting your wallet.
              </AlertDescription>
            </Alert>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-dark text-white">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Welcome to Your VERSA-ID Dashboard</h1>
            <p className="text-gray-400 mt-2">
              Manage your blockchain authentication and monitor your security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* VERSA-ID Card */}
            <Card className="border-neutral-800 bg-dark-card col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Your VERSA-ID</CardTitle>
                <CardDescription>
                  Use this ID to authenticate across supported platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-dark-lighter rounded-lg border border-neutral-800">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <VersaIdBadge
                      versaId={user.versaId}
                      size="lg"
                      variant="outline"
                      showIcon={false}
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyVersaId}
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Wallet Info */}
            <Card className="border-neutral-800 bg-dark-card">
              <CardHeader className="pb-2">
                <CardTitle>Connected Wallet</CardTitle>
                <CardDescription>
                  Ethereum account details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-dark-lighter rounded-lg border border-neutral-800">
                  <div className="flex items-center mb-3">
                    <FaEthereum className="text-primary mr-2" size={18} />
                    <span className="font-medium">{truncateAddress(user.walletAddress)}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>Network: {network}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="authentication" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="authentication">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* OTP Generator */}
                <Card className="border-neutral-800 bg-dark-card">
                  <CardHeader>
                    <CardTitle>One-Time Password</CardTitle>
                    <CardDescription>
                      Generate an OTP for VERSA-ID authentication
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {otp ? (
                      <div className="text-center space-y-4">
                        <div className="flex items-center justify-center mb-2">
                          <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                          <span className="text-sm">Expires in {formatTimeRemaining()}</span>
                        </div>
                        <div className="p-4 bg-dark-lighter rounded-lg border border-neutral-800">
                          <p className="font-mono text-2xl tracking-widest">{otp}</p>
                        </div>
                        <p className="text-xs text-gray-400">
                          Enter this code on the site requesting VERSA-ID authentication
                        </p>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <p className="text-sm text-gray-400 mb-4">
                          When a website requests authentication with your VERSA-ID,
                          generate a one-time password to complete the verification.
                        </p>
                        <Button
                          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                          onClick={generateOTP}
                        >
                          <FileKey className="mr-2 h-4 w-4" />
                          Generate OTP
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card className="border-neutral-800 bg-dark-card">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>
                      Recent authentication events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {ssoRequests.length > 0 ? (
                        ssoRequests.map((request, index) => (
                          <div key={index} className="p-4 bg-dark-lighter rounded-lg border border-neutral-800">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium">Sign-in Request</span>
                              <span className="text-xs text-gray-400">
                                {new Date(request.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <div className="text-sm text-gray-300">
                              <p>Site: {request.siteOrigin}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 bg-dark-lighter rounded-lg border border-neutral-800">
                          <p className="text-gray-400 text-center">No recent authentication activities</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Security Settings */}
                <Card className="border-neutral-800 bg-dark-card">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Configure your authentication preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-400">
                        Security settings will be available in future updates.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Device Management */}
                <Card className="border-neutral-800 bg-dark-card">
                  <CardHeader>
                    <CardTitle>Device Management</CardTitle>
                    <CardDescription>
                      Manage devices that have access to your VERSA-ID
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-400">
                        Device management will be available in future updates.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
