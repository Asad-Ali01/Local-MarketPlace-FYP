import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-linear-to-tr  from-blue-800 to-blue-900 text-white py-10 px-6">
      <div className="grid md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-3">Our Platform</h2>
          <p className="text-sm text-gray-200">
            AI-powered local marketplace connecting buyers and sellers with
            smart search, trusted profiles, and direct communication.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-200 inline">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/#search-provider">Browse Providers</Link>
            </li>
            <li>
              <Link to="/#categories">Categories</Link>
            </li>
            <li>
              <Link to="/contact-us" className="w-fit">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Features / Contact */}
        <div>
          <h2 className="text-xl font-bold mb-3">Features</h2>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>Smart AI Search</li>
            <li>Direct Communication</li>
            <li>Trusted Users</li>
            <li>Local Marketplace</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-blue-700 mt-8 pt-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} HunarHub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
