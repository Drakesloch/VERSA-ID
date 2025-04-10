import {
  ShieldCheck,
  Fingerprint,
  Wallet,
  Key,
  Code,
  Globe,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="p-6 rounded-xl border border-neutral-800 shadow-lg bg-gradient-to-br from-dark to-dark-lighter transition-all duration-300 hover:translate-y-[-5px]">
    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br from-primary/20 to-secondary/20">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export function FeaturesSection() {
  const features = [
    {
      icon: <Fingerprint className="text-2xl text-primary" />,
      title: "Secure Single Sign-On",
      description:
        "Use your VERSA-ID to securely log in to any compatible website or application without creating multiple accounts or passwords.",
    },
    {
      icon: <Wallet className="text-2xl text-primary" />,
      title: "MetaMask Integration",
      description:
        "Seamlessly connect with MetaMask wallet for secure blockchain authentication and verification on the Ethereum network.",
    },
    {
      icon: <ShieldCheck className="text-2xl text-primary" />,
      title: "Enhanced Security",
      description:
        "Multi-factor authentication with blockchain verification provides an additional layer of security beyond traditional methods.",
    },
    {
      icon: <Key className="text-2xl text-primary" />,
      title: "Data Privacy",
      description:
        "You control what information is shared with each service. No more over-permissioned access to your personal data.",
    },
    {
      icon: <Code className="text-2xl text-primary" />,
      title: "Developer-Friendly",
      description:
        "Easy-to-implement SDKs and APIs make adding \"Sign in with VERSA-ID\" to your application simple and straightforward.",
    },
    {
      icon: <Globe className="text-2xl text-primary" />,
      title: "Cross-Platform",
      description:
        "Works across desktop, mobile, and browser extensions to provide a seamless authentication experience on any device.",
    },
  ];

  return (
    <section className="py-20" id="features">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Blockchain-Powered Identity Authentication
          </h2>
          <p className="text-lg text-gray-300">
            VERSA-ID leverages blockchain technology to provide a secure and decentralized
            authentication system that puts you in control of your digital identity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
