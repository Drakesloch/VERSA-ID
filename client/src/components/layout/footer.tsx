import { Link } from "wouter";
import { ShieldCheck } from "lucide-react";
import { FaTwitter, FaGithub, FaDiscord, FaTelegram, FaEthereum } from "react-icons/fa";

const productLinks = [
  { name: "VERSA-ID Authentication", href: "/products/authentication" },
  { name: "Developer SDK", href: "/products/sdk" },
  { name: "Web3 Integrations", href: "/products/integrations" },
  { name: "Enterprise Solutions", href: "/products/enterprise" },
  { name: "API Documentation", href: "/docs/api" },
];

const resourceLinks = [
  { name: "Documentation", href: "/docs" },
  { name: "Tutorials", href: "/resources/tutorials" },
  { name: "Blog", href: "/blog" },
  { name: "Community Forum", href: "/community" },
  { name: "Support Center", href: "/support" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Press", href: "/press" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com", icon: FaTwitter },
  { name: "GitHub", href: "https://github.com", icon: FaGithub },
  { name: "Discord", href: "https://discord.com", icon: FaDiscord },
  { name: "Telegram", href: "https://telegram.org", icon: FaTelegram },
];

export function Footer() {
  return (
    <footer className="bg-dark-lighter text-gray-400 border-t border-neutral-800">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <ShieldCheck className="text-white" size={16} />
              </div>
              <span className="text-lg font-bold text-white">VERSA-ID</span>
            </div>

            <p className="mb-4">
              The future of secure blockchain authentication and identity management.
            </p>

            <div className="flex space-x-4 mb-6">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>

            <p className="text-sm">© {new Date().getFullYear()} VERSA-ID. All rights reserved.</p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Products
            </h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link
              href="/privacy"
              className="text-sm text-gray-400 hover:text-white transition-colors mr-4"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-400 hover:text-white transition-colors mr-4"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm">Built on</span>
            <FaEthereum size={16} />
            <span className="text-sm">Ethereum</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
