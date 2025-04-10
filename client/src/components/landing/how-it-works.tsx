import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronDown, Link as LinkIcon, UserPlus } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="bg-dark-lighter py-20 border-y border-neutral-800" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How VERSA-ID Works</h2>
          <p className="text-lg text-gray-300">
            A simple, secure authentication process powered by blockchain technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
              1
            </div>
            <div className="bg-dark-card rounded-xl p-6 border border-neutral-800 h-full relative pb-16">
              <h3 className="text-xl font-semibold mb-4 text-center">Create Account</h3>
              <p className="text-gray-300 text-center mb-6">
                Sign up with your email and personal information to create your base account.
              </p>

              <div className="mt-4 bg-dark-lighter rounded-lg p-4 border border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Registration Form</div>
                  <UserPlus className="text-primary" size={16} />
                </div>
                <div className="w-full h-1 bg-gray-700 rounded-full mb-1">
                  <div
                    className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">Complete</div>
              </div>

              <div className="absolute w-6 h-6 bottom-6 left-1/2 transform -translate-x-1/2">
                <ChevronDown className="text-primary" />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
              2
            </div>
            <div className="bg-dark-card rounded-xl p-6 border border-neutral-800 h-full relative pb-16">
              <h3 className="text-xl font-semibold mb-4 text-center">Connect MetaMask</h3>
              <p className="text-gray-300 text-center mb-6">
                Link your MetaMask wallet to securely connect to the Ethereum blockchain.
              </p>

              <div className="mt-4 bg-dark-lighter rounded-lg p-4 border border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Wallet Connection</div>
                  <LinkIcon className="text-primary" size={16} />
                </div>
                <div className="flex items-center space-x-3 mt-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                    alt="MetaMask"
                    className="w-8 h-8"
                  />
                  <div className="text-sm">Connect with MetaMask</div>
                </div>
              </div>

              <div className="absolute w-6 h-6 bottom-6 left-1/2 transform -translate-x-1/2">
                <ChevronDown className="text-primary" />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
              3
            </div>
            <div className="bg-dark-card rounded-xl p-6 border border-neutral-800 h-full">
              <h3 className="text-xl font-semibold mb-4 text-center">Use VERSA-ID</h3>
              <p className="text-gray-300 text-center mb-6">
                Your unique VERSA-ID is generated and ready to use for secure sign-on.
              </p>

              <div className="mt-4 bg-dark-lighter rounded-lg p-4 border border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Identity Generated</div>
                  <CheckCircle className="text-green-500" size={16} />
                </div>
                <div className="bg-dark-card border border-neutral-800 rounded p-2 font-mono text-sm text-center overflow-hidden">
                  <span className="text-primary">VERSA-</span>0xfa3...8e91
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/auth">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
            >
              Start Creating Your VERSA-ID
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
