import { FaEthereum, FaBitcoin, FaCoins } from "react-icons/fa";
import { SiPolygon, SiChainlink, SiSolana } from "react-icons/si";

export function LogoCloud() {
  const logos = [
    { name: "Ethereum", icon: FaEthereum },
    { name: "Bitcoin", icon: FaBitcoin },
    { name: "Polygon", icon: SiPolygon },
    { name: "Chainlink", icon: SiChainlink },
    { name: "Arbitrum", icon: FaCoins },
    { name: "Solana", icon: SiSolana },
  ];

  return (
    <section className="bg-dark-lighter py-12 border-y border-neutral-800">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-gray-400 mb-8">
          Trusted by leading Web3 companies and platforms
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
          {logos.map((logo) => {
            const Icon = logo.icon;
            return (
              <div
                key={logo.name}
                className="flex items-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Icon className="text-4xl mr-2" />
                <span className="font-medium">{logo.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
