import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { KeyRound, Check, Lightbulb } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ApiKeyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would submit this to an API
    // For now, simulate API key generation
    setApiKey("versaid_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    setSubmitted(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-dark text-white">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Get Your API Key</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Integrate VERSA-ID authentication into your applications with our secure API
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {submitted ? (
                <Card className="border-neutral-800 bg-dark-card">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <Check className="h-6 w-6 text-green-500 mr-2" />
                      Your API Key Has Been Generated
                    </CardTitle>
                    <CardDescription>
                      Keep this key secure and never expose it in client-side code
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert className="mb-6 border border-yellow-600 bg-yellow-950/20">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <AlertTitle>Important</AlertTitle>
                      <AlertDescription>
                        This is the only time your API key will be displayed. Please copy it now and store it securely.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Your API Key</label>
                      <div className="flex">
                        <Input 
                          value={apiKey || ""} 
                          readOnly 
                          className="font-mono bg-dark-lighter text-primary border-primary/30"
                        />
                        <Button 
                          className="ml-2" 
                          onClick={() => {
                            if (apiKey) navigator.clipboard.writeText(apiKey);
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Next Steps</h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-300">
                        <li>Store your API key securely in your application's environment variables</li>
                        <li>Check out the <a href="/documentation" className="text-primary hover:underline">documentation</a> for integration guides</li>
                        <li>Join our <a href="#" className="text-primary hover:underline">developer community</a> for support and updates</li>
                      </ol>
                      
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setSubmitted(false);
                            setApiKey(null);
                          }}
                        >
                          Request Another Key
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-neutral-800 bg-dark-card">
                  <CardHeader>
                    <CardTitle>Request an API Key</CardTitle>
                    <CardDescription>
                      Fill out this form to receive your VERSA-ID API key
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                            Full Name
                          </label>
                          <Input id="fullName" placeholder="Your full name" required />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address
                          </label>
                          <Input id="email" type="email" placeholder="you@example.com" required />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-2">
                          Company / Organization
                        </label>
                        <Input id="company" placeholder="Your company or organization name" required />
                      </div>
                      
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium mb-2">
                          Website URL
                        </label>
                        <Input id="website" type="url" placeholder="https://your-website.com" required />
                      </div>
                      
                      <div>
                        <label htmlFor="purpose" className="block text-sm font-medium mb-2">
                          Intended Use
                        </label>
                        <Textarea 
                          id="purpose" 
                          placeholder="Please describe how you plan to use VERSA-ID in your application"
                          className="text-white"
                          rows={4}
                          required 
                        />
                      </div>
                      
                      <div className="flex items-start space-x-2 pt-2">
                        <Checkbox id="terms" required />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{" "}
                          <a href="#" className="text-primary hover:underline">
                            terms of service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-primary hover:underline">
                            privacy policy
                          </a>
                        </label>
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                      >
                        Request API Key
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="space-y-6">
              <Card className="border-neutral-800 bg-dark-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <KeyRound className="h-5 w-5 mr-2 text-primary" />
                    About API Keys
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Your VERSA-ID API key grants access to our authentication services and is required for all API requests.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Unlimited authentication requests in development</li>
                    <li>• Production usage based on your plan</li>
                    <li>• Access to all VERSA-ID features</li>
                    <li>• Real-time dashboard and analytics</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-neutral-800 bg-dark-card">
                <CardHeader>
                  <CardTitle>Security Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex">
                      <span className="font-semibold text-white mr-2">•</span>
                      <span>Never expose API keys in client-side code or public repositories</span>
                    </li>
                    <li className="flex">
                      <span className="font-semibold text-white mr-2">•</span>
                      <span>Use environment variables to store your API keys</span>
                    </li>
                    <li className="flex">
                      <span className="font-semibold text-white mr-2">•</span>
                      <span>Implement proper access controls for your API keys</span>
                    </li>
                    <li className="flex">
                      <span className="font-semibold text-white mr-2">•</span>
                      <span>Rotate your API keys periodically for enhanced security</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}