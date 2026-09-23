import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';

function Navbar() {
  const [activeSection, setActiveSection] = useState('/');
  const isProgrammaticScroll = useRef(false);
  const [indicatorStyle, setIndicateorStyle] = useState({
    left: 0,
    width: 0,
  });
  const navRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        if(isProgrammaticScroll.current)  return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold:0.1
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (!navRef.current) return;
    console.log('Actiev section: ', activeSection);
    const activeLink = navRef.current.querySelector(
      `[data-section="${activeSection}"]`,
    ) as HTMLElement | null;

    if (!activeLink) return;
    setIndicateorStyle({
      left: activeLink?.offsetLeft,
      width: activeLink?.offsetWidth,
    });
  }, [activeSection]);

  const handleSectionClick = (sectionId: string) => {
  isProgrammaticScroll.current = true;

  setActiveSection(sectionId);

  const section = document.getElementById(sectionId);

  section?.scrollIntoView({
    behavior: "smooth",
  });
  let timeout: ReturnType<typeof setTimeout>;
 const handleScroll = () => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    isProgrammaticScroll.current = false;
    window.removeEventListener("scroll",handleScroll)
  },100)
 }
  window.addEventListener("scroll",handleScroll)
};
  return (
    <header className="w-full border-b bg-white">
      <div className="flex items-center justify-between px-4 py-3 sm:px-8 lg:px-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-purple-700">
          HunarHub
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex" ref={navRef}>
          {
            activeSection != "" &&
<div
            className="absolute bottom-[0px] h-0.5 bg-purple-700 transition-all duration-300"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
          />
          }
          
          <Link
            to="/"
            data-section="/"
            onClick={() => handleSectionClick('/')}
            className={
              activeSection === '/'
                ? 'font-semibold text-purple-700'
                : 'text-gray-600 hover:text-purple-700'
            }
          >
            Home
          </Link>

          {/* Services */}
          <Link
            to="/#services"
            data-section="services"

            onClick={() => handleSectionClick('services')}
            className={`${activeSection === 'services' ? 'font-semibold text-purple-700' : 'text-gray-600 transition-colors hover:text-purple-700'} `}
          >
            Services
          </Link>
          {/* About is an anchor */}
          <Link
            to="/#about-us"
            data-section="about-us"

            onClick={() => handleSectionClick('about-us')}
            className={`${activeSection === 'about-us' ? 'font-semibold text-purple-700' : 'text-gray-600 transition-colors hover:text-purple-700'} `}
          >
            About
          </Link>

          {/* Contact is an anchor */}
          <Link
            to="/#contact-us"
            data-section="contact-us"

            onClick={() => handleSectionClick('contact-us')}
            className={`${activeSection === 'contact-us' ? 'font-semibold text-purple-700' : 'text-gray-600 transition-colors hover:text-purple-700'} `}
          >
            Contact Us
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <NavLink to="/login" onClick={() => setActiveSection('')}>
            <Button variant="outline">Sign in</Button>
          </NavLink>

          <NavLink to="/register" onClick={() => setActiveSection('')}>
            <Button className="bg-purple-700 text-white hover:bg-purple-800">Sign up</Button>
          </NavLink>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="text-2xl">☰</SheetTrigger>

            <SheetContent side="left" className="w-70 bg-white">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold text-purple-700">HunarHub</SheetTitle>
              </SheetHeader>

              <nav className="flex h-full flex-col justify-between py-6">
                {/* Links */}
                <div className="flex flex-col gap-5 pl-5 text-lg">
                  <SheetClose asChild>
                    <a
                      href="/#home"
                      className={
                        activeSection === 'home'
                          ? 'font-semibold text-purple-700'
                          : 'text-gray-600 hover:text-purple-700'
                      }
                    >
                      Home
                    </a>
                  </SheetClose>
                  <SheetClose asChild>
                    <a
                      href="/#services"
                      className={`${activeSection === 'services' ? 'font-semibold text-purple-700' : 'text-gray-600 transition-colors hover:text-purple-700'} `}
                    >
                      Services
                    </a>
                  </SheetClose>

                  <SheetClose asChild>
                    <a
                      href="/#about-us"
                      onClick={() => setActiveSection('about-us')}
                      className={`${activeSection === 'about-us' ? 'font-semibold text-purple-700' : 'text-gray-600 transition-colors hover:text-purple-700'} `}
                    >
                      About
                    </a>
                  </SheetClose>

                  <SheetClose asChild>
                    <a
                      onClick={() => setActiveSection('contact-us')}

                      href="/#contact-us"
                      className={`${activeSection === 'contact-us' ? 'font-semibold text-purple-700' : 'text-gray-600 transition-colors hover:text-purple-700'} `}
                    >
                      Contact Us
                    </a>
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
                      <Button className="w-full bg-purple-700 text-white hover:bg-purple-800">
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
