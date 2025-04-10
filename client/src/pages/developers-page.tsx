import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Code, Server, Webhook, FileJson, FileCode, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DevelopersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-dark text-white">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">VERSA-ID for Developers</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Integrate secure blockchain authentication into your applications with our comprehensive developer tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Integration Made Simple</h2>
              <p className="text-gray-300 mb-6">
                Our developer-friendly SDKs and APIs make it easy to add VERSA-ID authentication to your application. Whether you're building a Web3 dApp or a traditional web service, our tools provide a seamless integration experience.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Server className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">RESTful API</h3>
                    <p className="text-sm text-gray-400">Comprehensive API for authentication and identity verification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Code className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Multiple SDKs</h3>
                    <p className="text-sm text-gray-400">Libraries for JavaScript, Python, Java, and more</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Webhook className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Webhooks</h3>
                    <p className="text-sm text-gray-400">Real-time notifications for authentication events</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileJson className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">OpenAPI Specification</h3>
                    <p className="text-sm text-gray-400">Complete API documentation in OpenAPI format</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex space-x-4">
                <Button onClick={() => window.location.href = "/api-key"}>Get API Key</Button>
                <Button variant="outline" onClick={() => window.location.href = "/documentation"}>View Documentation</Button>
              </div>
            </div>
            
            <div className="bg-dark-lighter rounded-lg p-6 border border-neutral-800">
              <h3 className="text-lg font-medium mb-4">Quick Start Example</h3>
              <Tabs defaultValue="javascript">
                <TabsList className="mb-4">
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>
                <TabsContent value="javascript" className="mt-0">
                  <pre className="bg-black rounded p-4 text-sm overflow-x-auto">
                    <code className="text-gray-300 font-mono">
{`// Install: npm install versa-id-sdk

import { VersaIdClient } from 'versa-id-sdk';

// Initialize the client
const versaId = new VersaIdClient({
  apiKey: 'YOUR_API_KEY',
});

// Authenticate a user
async function authenticateUser(versaIdValue) {
  try {
    const response = await versaId.authenticate(versaIdValue);
    if (response.success) {
      console.log('Authentication successful!');
      return response.user;
    }
  } catch (error) {
    console.error('Authentication failed:', error);
  }
}`}
                    </code>
                  </pre>
                </TabsContent>
                <TabsContent value="python" className="mt-0">
                  <pre className="bg-black rounded p-4 text-sm overflow-x-auto">
                    <code className="text-gray-300 font-mono">
{`# Install: pip install versa-id-sdk

from versa_id import VersaIdClient

# Initialize the client
versa_id = VersaIdClient(
    api_key='YOUR_API_KEY'
)

# Authenticate a user
def authenticate_user(versa_id_value):
    try:
        response = versa_id.authenticate(versa_id_value)
        if response.success:
            print('Authentication successful!')
            return response.user
    except Exception as e:
        print(f'Authentication failed: {e}')`}
                    </code>
                  </pre>
                </TabsContent>
                <TabsContent value="curl" className="mt-0">
                  <pre className="bg-black rounded p-4 text-sm overflow-x-auto">
                    <code className="text-gray-300 font-mono">
{`# Initiate authentication
curl -X POST https://api.versa-id.com/v1/authenticate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "versaId": "VERSA-1234abcd",
    "challenge": "random_challenge_string"
  }'`}
                    </code>
                  </pre>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-dark-lighter p-6 rounded-lg border border-neutral-800">
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                <FileCode className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Client Libraries</h3>
              <p className="text-gray-400 mb-4">
                Official SDKs for multiple programming languages to integrate VERSA-ID authentication into your application.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• JavaScript/TypeScript</li>
                <li>• Python</li>
                <li>• Java</li>
                <li>• Go</li>
                <li>• Ruby</li>
                <li>• PHP</li>
              </ul>
            </div>
            
            <div className="bg-dark-lighter p-6 rounded-lg border border-neutral-800">
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integration Guides</h3>
              <p className="text-gray-400 mb-4">
                Step-by-step tutorials for integrating VERSA-ID with popular frameworks and platforms.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• React/Next.js</li>
                <li>• Angular</li>
                <li>• Vue.js</li>
                <li>• Express.js</li>
                <li>• Django</li>
                <li>• Spring Boot</li>
              </ul>
            </div>
            
            <div className="bg-dark-lighter p-6 rounded-lg border border-neutral-800">
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                <RotateCw className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">API Reference</h3>
              <p className="text-gray-400 mb-4">
                Comprehensive documentation of all available endpoints, parameters, and response formats.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Authentication API</li>
                <li>• User Management API</li>
                <li>• Wallet Integration API</li>
                <li>• SSO API</li>
                <li>• Webhook API</li>
                <li>• Analytics API</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg border border-neutral-800 text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to implement VERSA-ID?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get started with our developer tools today. Sign up for a free API key and begin integrating blockchain-based authentication into your applications.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                onClick={() => window.location.href = "/api-key"}
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => window.location.href = "/documentation"}
              >
                Read Documentation
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}