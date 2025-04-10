import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Copy, Check, FileText, Code, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DocumentationPage() {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const CodeSnippet = ({ id, code }: { id: string; code: string }) => (
    <div className="relative">
      <pre className="bg-black rounded-lg p-4 overflow-x-auto text-sm font-mono text-gray-300">
        {code}
      </pre>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8 p-0"
        onClick={() => copyToClipboard(code, id)}
      >
        {copiedSnippet === id ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  const javaScriptIntegration = `
// Install the VERSA-ID SDK
// npm install versa-id-sdk

import { VersaID } from 'versa-id-sdk';

// Initialize the SDK with your API key
const versaId = new VersaID({
  apiKey: 'YOUR_API_KEY',
  environment: 'production' // or 'sandbox' for testing
});

// Add the "Sign in with VERSA-ID" button to your page
const signInButton = document.getElementById('versa-id-signin');

signInButton.addEventListener('click', async () => {
  try {
    // This will open the VERSA-ID authentication flow
    const result = await versaId.authenticate();
    
    if (result.success) {
      console.log('Authentication successful!');
      console.log('User ID:', result.userId);
      console.log('VERSA-ID:', result.versaId);
      
      // You can now authenticate the user in your backend
      // by verifying the authentication token
      const response = await fetch('/api/auth/versa-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: result.token
        })
      });
      
      // Handle login in your application
    }
  } catch (error) {
    console.error('Authentication failed:', error);
  }
});`;

  const pythonBackendVerification = `
# Install the VERSA-ID server SDK
# pip install versa-id-server

from versa_id import VersaIdServer

# Initialize the server SDK with your API key and secret
versa_id = VersaIdServer(
    api_key='YOUR_API_KEY',
    api_secret='YOUR_API_SECRET'
)

# In your Flask/Django/FastAPI route
@app.route('/api/auth/versa-id', methods=['POST'])
def verify_versa_id():
    # Get the token from the request
    data = request.json
    token = data.get('token')
    
    if not token:
        return jsonify({'error': 'Token is required'}), 400
    
    try:
        # Verify the token with the VERSA-ID server
        result = versa_id.verify_token(token)
        
        if result.is_valid:
            # Token is valid, authenticate the user in your system
            user = find_or_create_user(
                versa_id=result.versa_id,
                user_id=result.user_id
            )
            
            # Create a session for the user
            login_user(user)
            
            return jsonify({'success': True})
        else:
            return jsonify({'error': 'Invalid token'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500`;

  return (
    <div className="flex flex-col min-h-screen bg-dark text-white">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">VERSA-ID Documentation</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive guides and references for integrating VERSA-ID authentication
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-dark-lighter rounded-lg border border-neutral-800 p-5">
                <h3 className="text-lg font-semibold mb-3">Contents</h3>
                <nav className="space-y-1">
                  <a href="#getting-started" className="block py-2 text-primary hover:underline">Getting Started</a>
                  <a href="#authentication" className="block py-2 text-gray-300 hover:text-primary">Authentication</a>
                  <a href="#api-reference" className="block py-2 text-gray-300 hover:text-primary">API Reference</a>
                  <a href="#sdk-reference" className="block py-2 text-gray-300 hover:text-primary">SDK Reference</a>
                  <a href="#webhooks" className="block py-2 text-gray-300 hover:text-primary">Webhooks</a>
                </nav>
              </div>

              <div className="bg-dark-lighter rounded-lg border border-neutral-800 p-5">
                <h3 className="text-lg font-semibold mb-3">Resources</h3>
                <nav className="space-y-1">
                  <a href="#" className="block py-2 text-gray-300 hover:text-primary flex items-center">
                    <FileText className="h-4 w-4 mr-2" /> 
                    API Status
                  </a>
                  <a href="#" className="block py-2 text-gray-300 hover:text-primary flex items-center">
                    <Code className="h-4 w-4 mr-2" /> 
                    Sample Projects
                  </a>
                  <a href="#" className="block py-2 text-gray-300 hover:text-primary flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" /> 
                    GitHub Repositories
                  </a>
                </nav>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3 space-y-8">
              <section id="getting-started">
                <h2 className="text-2xl font-bold mb-6">Getting Started with VERSA-ID</h2>
                
                <div className="bg-dark-lighter rounded-lg border border-neutral-800 p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">1. Create a Developer Account</h3>
                  <p className="text-gray-300 mb-4">
                    To use VERSA-ID in your application, you'll need to create a developer account and get an API key.
                  </p>
                  <Button>Register for API Key</Button>
                </div>

                <div className="bg-dark-lighter rounded-lg border border-neutral-800 p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">2. Install the SDK</h3>
                  <p className="text-gray-300 mb-4">
                    Install the VERSA-ID SDK for your platform using your preferred package manager.
                  </p>
                  
                  <Tabs defaultValue="npm">
                    <TabsList className="mb-4">
                      <TabsTrigger value="npm">npm</TabsTrigger>
                      <TabsTrigger value="yarn">yarn</TabsTrigger>
                      <TabsTrigger value="pip">pip</TabsTrigger>
                    </TabsList>
                    <TabsContent value="npm" className="mt-0">
                      <CodeSnippet id="npm" code="npm install versa-id-sdk" />
                    </TabsContent>
                    <TabsContent value="yarn" className="mt-0">
                      <CodeSnippet id="yarn" code="yarn add versa-id-sdk" />
                    </TabsContent>
                    <TabsContent value="pip" className="mt-0">
                      <CodeSnippet id="pip" code="pip install versa-id-server" />
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="bg-dark-lighter rounded-lg border border-neutral-800 p-6">
                  <h3 className="text-xl font-semibold mb-4">3. Integrate Authentication</h3>
                  <p className="text-gray-300 mb-4">
                    Add the VERSA-ID authentication flow to your application. Here's a simple example:
                  </p>
                  
                  <Tabs defaultValue="js">
                    <TabsList className="mb-4">
                      <TabsTrigger value="js">JavaScript (Frontend)</TabsTrigger>
                      <TabsTrigger value="py">Python (Backend)</TabsTrigger>
                    </TabsList>
                    <TabsContent value="js" className="mt-0">
                      <CodeSnippet id="js" code={javaScriptIntegration} />
                    </TabsContent>
                    <TabsContent value="py" className="mt-0">
                      <CodeSnippet id="py" code={pythonBackendVerification} />
                    </TabsContent>
                  </Tabs>
                </div>
              </section>

              <Separator />

              <section id="authentication" className="pt-4">
                <h2 className="text-2xl font-bold mb-6">Authentication Flow</h2>
                <p className="text-gray-300 mb-6">
                  VERSA-ID uses a secure, blockchain-based authentication flow that involves a challenge-response mechanism with the user's wallet.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-dark-lighter rounded-lg border border-neutral-800 p-4">
                    <h4 className="font-semibold mb-2">1. Initiate Authentication</h4>
                    <p className="text-sm text-gray-400">
                      Your app requests authentication, and VERSA-ID generates a unique challenge.
                    </p>
                  </div>
                  <div className="bg-dark-lighter rounded-lg border border-neutral-800 p-4">
                    <h4 className="font-semibold mb-2">2. User Verification</h4>
                    <p className="text-sm text-gray-400">
                      The user confirms the authentication request in their VERSA-ID account.
                    </p>
                  </div>
                  <div className="bg-dark-lighter rounded-lg border border-neutral-800 p-4">
                    <h4 className="font-semibold mb-2">3. Complete Authentication</h4>
                    <p className="text-sm text-gray-400">
                      The challenge is verified, and a signed token is returned to your application.
                    </p>
                  </div>
                </div>

                <p className="text-gray-300">
                  For a more detailed explanation of the authentication flow, see the 
                  <a href="#" className="text-primary hover:underline mx-1">Authentication Guide</a>
                  in our documentation.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}