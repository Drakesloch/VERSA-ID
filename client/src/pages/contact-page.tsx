import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Mail, MessageSquare, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send the form data to an API
    // For now, just simulate a successful submission
    setSubmitted(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-dark text-white">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Get in touch with our team for support, partnership inquiries, or feedback
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-dark-lighter p-6 rounded-lg border border-neutral-800 flex flex-col items-center text-center">
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-400">
                For general inquiries, support, and partnership opportunities
              </p>
              <a href="mailto:info@versa-id.com" className="text-primary mt-2 hover:underline">
                info@versa-id.com
              </a>
            </div>
            
            <div className="bg-dark-lighter p-6 rounded-lg border border-neutral-800 flex flex-col items-center text-center">
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-400">
                Chat with our support team for immediate assistance
              </p>
              <Button variant="link" className="text-primary mt-2">
                Start a Conversation
              </Button>
            </div>
            
            <div className="bg-dark-lighter p-6 rounded-lg border border-neutral-800 flex flex-col items-center text-center">
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-400">
                For urgent matters and direct communication
              </p>
              <a href="tel:+18005551234" className="text-primary mt-2 hover:underline">
                +1 (800) 555-1234
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 bg-dark-lighter p-6 rounded-lg border border-neutral-800">
              <h2 className="text-2xl font-bold mb-4">Our Office</h2>
              <div className="flex items-start mb-4">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Headquarters</h3>
                  <p className="text-sm text-gray-400">
                    1234 Blockchain Street<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </div>
              
              <h3 className="font-medium mt-6 mb-2">Office Hours</h3>
              <p className="text-sm text-gray-400">
                Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                Saturday - Sunday: Closed
              </p>
              
              <h3 className="font-medium mt-6 mb-2">Social Media</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-primary">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-primary">GitHub</a>
                <a href="#" className="text-gray-400 hover:text-primary">Discord</a>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-dark-lighter p-8 rounded-lg border border-green-600 text-center">
                  <div className="rounded-full w-16 h-16 bg-green-600/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-300 mb-4">
                    Thank you for reaching out to us. We'll get back to you as soon as possible.
                  </p>
                  <Button onClick={() => setSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <div className="bg-dark-lighter p-6 rounded-lg border border-neutral-800">
                  <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Your Name
                        </label>
                        <Input id="name" placeholder="Enter your name" required />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <Input id="email" type="email" placeholder="you@example.com" required />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input id="subject" placeholder="What is this regarding?" required />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea 
                        id="message" 
                        placeholder="How can we help you?" 
                        rows={6}
                        className="text-white placeholder:text-gray-400 resize-none"
                        required 
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                    >
                      Send Message
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}