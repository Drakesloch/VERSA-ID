import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { LogoCloud } from "@/components/landing/logo-cloud";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CTASection } from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-dark text-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <LogoCloud />
        <FeaturesSection />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
