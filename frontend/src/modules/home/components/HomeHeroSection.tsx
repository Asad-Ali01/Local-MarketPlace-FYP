import { Button } from "@/components/ui/button";
import {
  Handshake,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

function HomeHeroSection() {
  return (
    
    <section className="w-full py-16 px-4 sm:px-8 lg:px-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        
      {/* LEFT CONTENT */}
      <div className="w-full lg:w-1/2 flex flex-col items-start">
        
        {/* Badge */}
        <span className="text-sm font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
          AI-Powered Local Marketplace
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold mt-5 leading-tight text-gray-900">
          Find Trusted Freelancers <br />
          <span className="text-purple-700">Near You Instantly</span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 mt-4 max-w-md">
          Connect with skilled professionals for web, design, and local services.
          Fast, reliable, and tailored to your needs.
        </p>

      

        {/* Quick Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {["Web Dev", "Logo Design", "Video Editing", "Nearby"].map(
            (tag, i) => (
              <span
                key={i}
                className="text-sm bg-blue-800 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-blue-700 transition-all delay-50"
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* Features */}
        <div className="mt-6 space-y-4">
          
          <div className="flex items-start gap-3">
            <Handshake className="text-purple-600 bg-purple-100 p-2 rounded-lg w-10 h-10" />
            <div>
              <h3 className="font-semibold text-gray-900">
                Skilled Professionals
              </h3>
              <p className="text-sm text-gray-500">
                Connect with verified experts in your area.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MessageCircle className="text-green-600 bg-green-100 p-2 rounded-lg w-10 h-10" />
            <div>
              <h3 className="font-semibold text-gray-900">
                Direct Communication
              </h3>
              <p className="text-sm text-gray-500">
                Chat, discuss, and finalize work easily.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="text-blue-600 bg-blue-100 p-2 rounded-lg w-10 h-10" />
            <div>
              <h3 className="font-semibold text-gray-900">
                Trusted Platform
              </h3>
              <p className="text-sm text-gray-500">
                Ratings, reviews, and secure interactions.
              </p>
            </div>
          </div>

        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-8 flex-col sm:flex-row">
          <Link to="/register">
            <Button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg flex items-center gap-2">
              Get Started <ArrowRight size={18} />
            </Button>
          </Link>

          <Link to="/services">
            <Button variant="default" className="px-5 py-2 rounded-lg">
              Explore Services
            </Button>
          </Link>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src="/hero-image.png"
          alt="Marketplace"
          className="w-full max-w-md object-contain"
        />
      </div>
    </section>
  );
}

export default HomeHeroSection;