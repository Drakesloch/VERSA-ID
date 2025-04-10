import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";

export function HeroSection() {
  const [formStep, setFormStep] = useState(1);

  // This is just for demonstration on the landing page
  // The actual form functionality is in the auth components
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, we would validate the form first
    setFormStep(2);
  };

  return (
    <section className="relative py-20 md:py-28 bg-dark">
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {/* Grid lines animation */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{
              top: `${(i + 1) * 5}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Secure Identity for the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Web3 Future
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 md:max-w-xl">
              VERSA-ID provides a secure, decentralized single sign-on solution
              powered by blockchain technology. Take control of your digital identity.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/auth?tab=register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center text-sm text-gray-400">
              <ShieldCheck className="mr-2 text-primary" size={16} />
              <span>Enterprise-grade security with blockchain verification</span>
            </div>
          </div>

          <div className="md:w-1/2 relative">
            <div className="relative bg-dark-card rounded-xl shadow-lg overflow-hidden border border-neutral-800">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-semibold">
                    {formStep === 1 ? "Create Your VERSA-ID" : "Connect Your Wallet"}
                  </h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>

                {formStep === 1 ? (
                  <form onSubmit={handleContinue} className="space-y-4 mb-8">
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-400 mb-1">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 bg-dark-lighter border border-neutral-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-400 mb-1">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-dark-lighter border border-neutral-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="password" className="text-sm font-medium text-gray-400 mb-1">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-dark-lighter border border-neutral-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                      />
                    </div>

                    <Button
                      type="button"
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                      onClick={() => window.location.href = "/auth?tab=register"}
                    >
                      Continue to Registration
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-4 mb-4">
                    <div className="text-center mb-4">
                      <p className="text-gray-400">Link your crypto wallet to complete VERSA-ID setup</p>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-between p-4 hover:border-primary transition-colors"
                      onClick={() => setFormStep(1)}
                    >
                      <div className="flex items-center">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                          alt="MetaMask"
                          className="w-6 h-6 mr-3"
                        />
                        <span>MetaMask</span>
                      </div>
                      <span className="text-gray-400">→</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-between p-4 hover:border-primary transition-colors"
                      disabled
                    >
                      <div className="flex items-center">
                        <FaEthereum className="w-6 h-6 mr-3" />
                        <span>WalletConnect</span>
                      </div>
                      <span className="text-gray-400">→</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-between p-4 hover:border-primary transition-colors"
                      disabled
                    >
                      <div className="flex items-center">
                        <span className="w-6 h-6 flex items-center justify-center mr-3">🔒</span>
                        <span>Coinbase Wallet</span>
                      </div>
                      <span className="text-gray-400">→</span>
                    </Button>
                  </div>
                )}

                <div className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link href="/auth?tab=login" className="text-primary hover:text-primary-light">
                    Log In
                  </Link>
                </div>
              </div>
            </div>

            {/* Decorative blurs */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-secondary opacity-10 blur-3xl rounded-full"></div>
            <div className="absolute -z-10 -top-6 -left-6 w-64 h-64 bg-primary opacity-10 blur-3xl rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Import used in Hero Section component
import { FaEthereum } from "react-icons/fa";
