
import { Link } from 'react-router';

function Footer() {
  return (
    <footer className="bg-purple-700 px-6 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        {/* About */}
        <div>
          <h2 className="mb-3 text-xl font-bold">Our Platform</h2>

          <p className="text-sm leading-6 text-purple-200">
            AI-powered local marketplace connecting buyers and sellers with
            smart search, trusted profiles, and direct communication.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="mb-3 text-xl font-bold">Quick Links</h2>

          <ul className="space-y-2 text-sm text-purple-200">
            <li>
              <Link
                to="/"
                className="transition-colors hover:text-white"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/#services"
                className="transition-colors hover:text-white"
              >
                Services
              </Link>
            </li>

            <li>
              <Link
                to="/#about-us"
                className="transition-colors hover:text-white"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/#search-provider"
                className="transition-colors hover:text-white"
              >
                Browse Providers
              </Link>
            </li>

            <li>
              <Link
                to="/#contact-us"
                className="transition-colors hover:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h2 className="mb-3 text-xl font-bold">Features</h2>

          <ul className="space-y-2 text-sm text-purple-200">
            <li>Smart AI Search</li>
            <li>Direct Communication</li>
            <li>Trusted Users</li>
            <li>Local Marketplace</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mx-auto mt-8 max-w-7xl border-t border-purple-800 pt-4 text-center text-sm text-purple-300">
        © {new Date().getFullYear()} HunarHub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

