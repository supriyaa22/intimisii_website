
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../components/ui/breadcrumb";

// Breadcrumb component
const ArticleBreadcrumb = () => {
  return (
    <Breadcrumb className="mb-12">
      <BreadcrumbList className="text-gray-500">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="hover:text-[#C9AD7E]">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/blog" className="hover:text-[#C9AD7E]">Blog</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="text-white font-medium">
            Sustainable Luxury: The Future of Home Fragrance
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const SustainableLuxuryArticle = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f] bg-opacity-90 bg-[url('/lovable-uploads/3f7fadb9-649e-4d7f-b636-4bae9d7d34f9.png')] bg-blend-overlay">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-32">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <ArticleBreadcrumb />
          
          {/* Article Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-center mb-12">
            <span className="text-[#C9AD7E]">Sustainable Luxury:</span><br />
            <span className="text-white">The Future of Home Fragrance</span>
          </h1>
          
          {/* Hero Image with Gold Border */}
          <div className="mb-12 mx-auto p-1 border border-[#C9AD7E]/70 max-w-3xl">
            <img 
              src="/lovable-uploads/0c8d28ee-46dc-4f6b-90bd-93b597cbaeeb.png"
              alt="Sustainable Luxury: The Future of Home Fragrance" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Article Content */}
          <div className="text-left max-w-3xl mx-auto">
            <h3 className="text-[#C9AD7E] font-serif text-xl mb-4">The Future of Home Fragrance</h3>
            <p className="text-gray-400 leading-relaxed font-serif tracking-wide text-lg text-justify">
              Luxury and sustainability were once considered opposing forces, with opulence often associated with excess and environmental impact. However, as consumer values evolve, eco-conscious brands are redefining luxury by integrating responsible practices and innovative solutions into the world of home fragrance. Today, sustainability and indulgence go hand in hand, offering an elevated sensory experience that respects both people and the planet.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SustainableLuxuryArticle;
