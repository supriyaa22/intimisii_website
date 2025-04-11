
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-12 pt-16">
      {/* Top border line */}
      <div className="border-t border-[#333333] mb-12"></div>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <h2 className="font-playfair text-2xl md:text-3xl font-medium text-[#C8A97E]">INTIMISII</h2>
            <p className="text-sm text-gray-300 max-w-xs">
              Crafting luxurious sensory experiences through curating candles
            </p>
          </div>

          {/* Shop Column */}
          <div className="flex flex-col gap-4">
            <h2 className="font-playfair text-2xl md:text-3xl font-medium text-[#C8A97E]">Shop</h2>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                Signature Collections
              </Link>
              <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                Gift Sets
              </Link>
              <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                Accessories
              </Link>
            </div>
          </div>

          {/* About Column */}
          <div className="flex flex-col gap-4">
            <h2 className="font-playfair text-2xl md:text-3xl font-medium text-[#C8A97E]">About</h2>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                Our Story
              </Link>
              <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                Curation
              </Link>
              <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                Sustainability
              </Link>
              <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                Press
              </Link>
              <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                Careers
              </Link>
            </div>
          </div>

          {/* Customer Care Column */}
          <div className="flex flex-col gap-4">
            <h2 className="font-playfair text-2xl md:text-3xl font-medium text-[#C8A97E]">Customer Care</h2>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                FAQs
              </Link>
              <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                Shipping & Returns
              </Link>
              <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and social links */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-4 border-t border-[#333333]">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-[#C8A97E] text-xl">©</span>
            <span className="text-sm text-gray-300">2025 INTIMISII. All Rights Reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">Instagram</Link>
            <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">Facebook</Link>
            <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">Twitter</Link>
            <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">Snapchat</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
