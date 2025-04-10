import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-primary/20 to-secondary/20 py-16 border-y border-neutral-800">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to secure your digital identity?
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust VERSA-ID for secure blockchain authentication.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/auth">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
            >
              Create Your VERSA-ID
            </Button>
          </Link>
          <Link href="/developers">
            <Button size="lg" variant="outline">
              For Developers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
