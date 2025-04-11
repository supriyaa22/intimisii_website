
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full bg-[#2A1C1D] py-3 px-8 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="h-14">
          <img 
            src="/lovable-uploads/a3d3d2b3-567d-4211-81c2-d53b26ebd1b7.png" 
            alt="Intimisii Logo" 
            className="h-full"
          />
        </Link>
      </div>
      <nav className="hidden md:flex space-x-8">
        <Link to="/" className="text-white hover:text-[#D8A7A3] transition-colors">
          Home
        </Link>
        <Link to="/about" className="text-white hover:text-[#D8A7A3] transition-colors">
          About
        </Link>
        <Link to="/shop" className="text-white hover:text-[#D8A7A3] transition-colors">
          Shop
        </Link>
        <Link to="/blog" className="text-white hover:text-[#D8A7A3] transition-colors">
          Blog
        </Link>
        <Link to="/testimonials" className="text-white hover:text-[#D8A7A3] transition-colors">
          Testimonials
        </Link>
        <Link to="/faqs" className="text-white hover:text-[#D8A7A3] transition-colors">
          FAQs
        </Link>
        <Link to="/contact" className="text-white hover:text-[#D8A7A3] transition-colors">
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
