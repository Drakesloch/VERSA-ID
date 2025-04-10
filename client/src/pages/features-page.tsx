import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ShieldCheck, Lock, Globe, Zap, Key, Fingerprint } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      title: "Blockchain Authentication",
      description: "Secure, decentralized authentication using Ethereum blockchain technology. Your identity is cryptographically secured and cannot be forged.",
      icon: ShieldCheck
    },
    {
      title: "Single Sign-On (SSO)",
      description: "One VERSA-ID for seamless authentication across multiple platforms. No more remembering dozens of passwords.",
      icon: Key
    },
    {
      title: "Privacy Focused",
      description: "You control what information is shared. Our zero-knowledge proofs allow verification without revealing sensitive data.",
      icon: Lock
    },
    {
      title: "Universal Compatibility",
      description: "Works with both Web3 applications and traditional websites. Bridge the gap between blockchain and conventional services.",
      icon: Globe
    },
    {
      title: "Lightning Fast Verification",
      description: "Authentication in seconds, not minutes. Our optimized verification process ensures minimal waiting time.",
      icon: Zap
    },
    {
      title: "Biometric Integration",
      description: "Optional biometric security layer for enhanced protection. Combine what you have (wallet) with who you are.",
      icon: Fingerprint
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-dark text-white">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">VERSA-ID Features</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our blockchain-based authentication system provides unparalleled security and convenience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-dark-lighter p-6 rounded-lg border border-neutral-800 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-neutral-800 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-dark-lighter p-4 rounded border border-neutral-800">
                <h3 className="font-medium mb-2">Blockchain Infrastructure</h3>
                <p className="text-sm text-gray-400">Built on Ethereum with support for Polygon, Arbitrum, and other EVM-compatible chains</p>
              </div>
              <div className="bg-dark-lighter p-4 rounded border border-neutral-800">
                <h3 className="font-medium mb-2">Cryptographic Standards</h3>
                <p className="text-sm text-gray-400">ECDSA signatures with secp256k1 curves, AES-256 encryption for secure data storage</p>
              </div>
              <div className="bg-dark-lighter p-4 rounded border border-neutral-800">
                <h3 className="font-medium mb-2">Authentication Protocol</h3>
                <p className="text-sm text-gray-400">Challenge-response authentication with time-based one-time passwords (TOTP)</p>
              </div>
              <div className="bg-dark-lighter p-4 rounded border border-neutral-800">
                <h3 className="font-medium mb-2">API Integration</h3>
                <p className="text-sm text-gray-400">RESTful API with OpenAPI specification, WebSocket support for real-time authentication</p>
              </div>
              <div className="bg-dark-lighter p-4 rounded border border-neutral-800">
                <h3 className="font-medium mb-2">Developer Tools</h3>
                <p className="text-sm text-gray-400">SDKs for JavaScript, Python, and Java, comprehensive documentation and examples</p>
              </div>
              <div className="bg-dark-lighter p-4 rounded border border-neutral-800">
                <h3 className="font-medium mb-2">Security Audits</h3>
                <p className="text-sm text-gray-400">Regular third-party security audits, bug bounty program for vulnerability disclosure</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}