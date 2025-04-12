
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/use-mobile";

const Navbar = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isAtTop ? "py-6 bg-[#3A1B1F]" : "py-4 bg-[#3A1B1F]/90 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="z-10">
            <img
              src="/lovable-uploads/d3b80508-b477-4405-b3eb-da75ceeb4f59.png"
              alt="Intimisii Logo"
              className="h-10 md:h-12" // Adjusted logo size
            />
          </Link>

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={toggleMenu}
              className="z-10 text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex gap-8">
              <NavLink to="/home">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/">Shop</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              <NavLink to="/">Testimonials</NavLink>
              <NavLink to="/">FAQs</NavLink>
              <NavLink to="/">Contact</NavLink>
            </nav>
          )}

          {/* Mobile Navigation Menu */}
          {isMobile && (
            <div
              className={`fixed inset-0 bg-[#3A1B1F]/95 flex flex-col items-center justify-center transition-opacity duration-300 ${
                isMenuOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <nav className="flex flex-col gap-8 items-center">
                <MobileNavLink to="/home" onClick={toggleMenu}>
                  Home
                </MobileNavLink>
                <MobileNavLink to="/about" onClick={toggleMenu}>
                  About
                </MobileNavLink>
                <MobileNavLink to="/" onClick={toggleMenu}>
                  Shop
                </MobileNavLink>
                <MobileNavLink to="/blog" onClick={toggleMenu}>
                  Blog
                </MobileNavLink>
                <MobileNavLink to="/" onClick={toggleMenu}>
                  Testimonials
                </MobileNavLink>
                <MobileNavLink to="/" onClick={toggleMenu}>
                  FAQs
                </MobileNavLink>
                <MobileNavLink to="/" onClick={toggleMenu}>
                  Contact
                </MobileNavLink>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink = ({ to, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className="text-white hover:text-[#C9AD7E] text-sm uppercase tracking-wider transition-colors duration-300"
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({ to, children, onClick }: MobileNavLinkProps) => {
  return (
    <Link
      to={to}
      className="text-white hover:text-[#C9AD7E] text-xl uppercase tracking-wider transition-colors duration-300"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
