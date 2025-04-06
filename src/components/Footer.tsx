
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-darkbg text-white pt-12 border-t border-stone-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-gold font-serif text-2xl mb-4">INTIMISII</h3>
            <p className="text-sm text-gray-400 mb-4">
              Crafting luxurious sensory experiences through curating candles
            </p>
          </div>
          
          <div>
            <h3 className="text-gold font-serif text-2xl mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-400 hover:text-gold text-sm">Signature Collections</Link></li>
              <li><Link to="/shop/gift-sets" className="text-gray-400 hover:text-gold text-sm">Gift Sets</Link></li>
              <li><Link to="/shop/accessories" className="text-gray-400 hover:text-gold text-sm">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gold font-serif text-2xl mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/our-story" className="text-gray-400 hover:text-gold text-sm">Our Story</Link></li>
              <li><Link to="/curation" className="text-gray-400 hover:text-gold text-sm">Curation</Link></li>
              <li><Link to="/sustainability" className="text-gray-400 hover:text-gold text-sm">Sustainability</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-gold text-sm">Press</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-gold text-sm">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gold font-serif text-2xl mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-gold text-sm">Contact Us</Link></li>
              <li><Link to="/faqs" className="text-gray-400 hover:text-gold text-sm">FAQs</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-gold text-sm">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-gold text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-800 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© 2025 INTIMISII. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="text-gray-400 hover:text-gold">
              <Instagram size={18} />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gold">
              <Facebook size={18} />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gold">
              <Twitter size={18} />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gold text-sm">
              Snapchat
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
