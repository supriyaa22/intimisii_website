
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full bg-darkbg py-5 px-8 flex items-center justify-between border-b border-stone-800">
      <div>
        <Link to="/" className="text-gold font-serif italic text-3xl">
          Intimisii
        </Link>
      </div>
      <nav className="hidden md:flex space-x-8">
        <Link to="/" className="text-white hover:text-gold transition-colors">
          Home
        </Link>
        <Link to="/about" className="text-white hover:text-gold transition-colors">
          About
        </Link>
        <Link to="/shop" className="text-white hover:text-gold transition-colors">
          Shop
        </Link>
        <Link to="/blog" className="text-white hover:text-gold transition-colors">
          Blog
        </Link>
        <Link to="/testimonials" className="text-white hover:text-gold transition-colors">
          Testimonials
        </Link>
        <Link to="/faqs" className="text-white hover:text-gold transition-colors">
          FAQs
        </Link>
        <Link to="/contact" className="text-white hover:text-gold transition-colors">
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
