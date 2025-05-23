
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, UserCircle, LogOut } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import { useCart } from "../contexts/CartContext";
import AuthModals from "./AuthModals";
import AccountModal from "./AccountModal";

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

const Navbar = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const isMobile = useIsMobile();
  const { toggleCart } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openAccountModal = () => setIsAccountModalOpen(true);
  const closeAccountModal = () => setIsAccountModalOpen(false);

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

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser) as UserData;
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Listen for login events
    const handleUserLogin = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        try {
          const userData = JSON.parse(updatedUser) as UserData;
          setUser(userData);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    };

    window.addEventListener("userLogin", handleUserLogin);

    return () => {
      window.removeEventListener("userLogin", handleUserLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const UserAvatar = ({ firstName }: { firstName: string }) => (
    <div className="flex items-center justify-center w-7 h-7 rounded-full border border-[#C9AD7E] bg-[#3A1B1F] text-white text-xs font-serif">
      {firstName.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isAtTop ? "py-3 bg-[#3A1B1F]" : "py-2 bg-[#3A1B1F]/90 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="z-10">
              <img
                src="/lovable-uploads/d3b80508-b477-4405-b3eb-da75ceeb4f59.png"
                alt="Intimisii Logo"
                className="h-12 md:h-14"
              />
            </Link>

            {isMobile && (
              <div className="flex items-center gap-4 z-10">
                <button onClick={toggleCart} className="text-white">
                  <ShoppingBag className="h-6 w-6" />
                </button>
                {user ? (
                  <div className="relative">
                    <button onClick={openAccountModal}>
                      <UserAvatar firstName={user.firstName} />
                    </button>
                  </div>
                ) : (
                  <div 
                    className="text-white hover:text-[#C9AD7E] transition-colors duration-300 cursor-pointer"
                    onClick={openAuthModal}
                  >
                    <UserCircle className="h-6 w-6" />
                  </div>
                )}
                <button onClick={toggleMenu} className="text-white focus:outline-none">
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
              </div>
            )}

            {!isMobile && (
              <nav className="flex items-center gap-8">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/testimonials">Testimonials</NavLink>
                <NavLink to="/faqs">FAQs</NavLink>
                <NavLink to="/">Contact</NavLink>
                <button onClick={toggleCart} className="text-white hover:text-[#C9AD7E] transition-colors duration-300">
                  <ShoppingBag className="h-5 w-5" />
                </button>
                {user ? (
                  <div className="relative">
                    <button 
                      onClick={openAccountModal}
                      className="focus:outline-none"
                    >
                      <UserAvatar firstName={user.firstName} />
                    </button>
                  </div>
                ) : (
                  <div 
                    className="text-white hover:text-[#C9AD7E] transition-colors duration-300 cursor-pointer"
                    onClick={openAuthModal}
                  >
                    <UserCircle className="h-5 w-5" />
                  </div>
                )}
              </nav>
            )}

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
                  <MobileNavLink to="/shop" onClick={toggleMenu}>
                    Shop
                  </MobileNavLink>
                  <MobileNavLink to="/blog" onClick={toggleMenu}>
                    Blog
                  </MobileNavLink>
                  <MobileNavLink to="/testimonials" onClick={toggleMenu}>
                    Testimonials
                  </MobileNavLink>
                  <MobileNavLink to="/faqs" onClick={toggleMenu}>
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

      <AuthModals isOpen={isAuthModalOpen} onClose={closeAuthModal} />
      <AccountModal 
        isOpen={isAccountModalOpen} 
        onClose={closeAccountModal} 
        user={user} 
        onLogout={handleLogout} 
      />
    </>
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
