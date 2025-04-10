import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-dark text-white">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">About VERSA-ID</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                At VERSA-ID, we believe in a future where digital identity is secure, user-controlled, and blockchain-verified. 
                Our mission is to revolutionize online authentication by leveraging the power of distributed ledger technology 
                to create a more secure and privacy-focused identity ecosystem.
              </p>
              <p className="text-gray-300">
                We're building the foundation for the next generation of online identity verification, empowering users 
                and organizations alike with a versatile, secure, and interoperable authentication solution.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
              <p className="text-gray-300 mb-4">
                VERSA-ID combines cutting-edge blockchain technology with user-friendly interfaces to create a seamless 
                authentication experience. By leveraging the immutability and security of distributed ledgers, we provide 
                a robust foundation for identity verification without compromising on privacy.
              </p>
              <p className="text-gray-300">
                Our platform is designed with interoperability in mind, working across different blockchains and traditional 
                web services to provide a unified authentication experience.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
              <p className="text-gray-300 mb-4">
                VERSA-ID was founded by a team of cybersecurity experts, blockchain developers, and user experience designers 
                passionate about solving the challenges of digital identity. With backgrounds spanning from cryptography to 
                enterprise security, our diverse team brings together the expertise needed to build a next-generation authentication system.
              </p>
              <p className="text-gray-300">
                We're committed to continuous innovation and maintaining an open dialogue with our community of users and developers.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}