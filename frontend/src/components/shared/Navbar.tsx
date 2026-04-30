import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, NavLink } from "react-router";

function Navbar() {
  return (
    <header className="w-full border-b bg-white">
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-3">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-purple-700">
          HunarHub
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-purple-700 font-semibold" : "text-gray-600 hover:text-purple-700"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              isActive ? "text-purple-700 font-semibold" : "text-gray-600 hover:text-purple-700"
            }
          >
            About
          </NavLink>
           <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive ? "text-purple-700 font-semibold" : "text-gray-600 hover:text-purple-700"
            }
          >
            Contact Us
          </NavLink>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink to="/login">
            <Button variant="outline">Sign in</Button>
          </NavLink>

          <NavLink to="/register">
            <Button className="bg-purple-700 hover:bg-purple-800 text-white">
              Sign up
            </Button>
          </NavLink>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="text-2xl">☰</SheetTrigger>

            <SheetContent side="left" className="w-70 bg-white">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold text-purple-700">
                  HunarHub
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col  justify-between h-full py-6">
                
                {/* Links */}
                <div className="flex flex-col pl-5  gap-5 text-lg">
                  <SheetClose asChild>
                    <Link to="/" className="text-gray-700 hover:text-purple-700">
                      Home
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link to="/about-us" className="text-gray-700 hover:text-purple-700">
                      About
                    </Link>
                  </SheetClose>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                  <SheetClose asChild>
                    <NavLink to="/login">
                      <Button variant="outline" className="w-full">
                        Sign in
                      </Button>
                    </NavLink>
                  </SheetClose>

                  <SheetClose asChild>
                    <NavLink to="/register">
                      <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white">
                        Sign up
                      </Button>
                    </NavLink>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}

export default Navbar;