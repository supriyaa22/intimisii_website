
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
            Intimisii Massage Spa Candles
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const IntimisiiMassageSpaCandlesArticle = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f] bg-opacity-90 bg-[url('/lovable-uploads/3f7fadb9-649e-4d7f-b636-4bae9d7d34f9.png')] bg-blend-overlay">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-32">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <ArticleBreadcrumb />
          
          {/* Article Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-center mb-12">
            <span className="text-[#C9AD7E]">Intimisii Massage Spa Candles:</span><br />
            <span className="text-white">A Luxurious Fusion of Fragrance and Skincare</span>
          </h1>
          
          {/* Hero Image with Gold Border */}
          <div className="mb-12 mx-auto p-1 border border-[#C9AD7E]/70 max-w-3xl">
            <img 
              src="/lovable-uploads/e6dabc81-fbb4-46b9-b202-a69724796f87.png"
              alt="Intimisii Massage Spa Candles" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Article Content */}
          <div className="text-left max-w-3xl mx-auto">
            <p className="text-gray-400 leading-relaxed font-serif tracking-wide text-lg text-justify">
              In the realm of self-care, the line between indulgence and functionality is blurring, giving rise to products that offer both sensory pleasure and tangible benefits. Intimisii's Massage Spa Candles epitomize this fusion, seamlessly blending luxury with skincare to create an experience that nourishes both body and mind. Crafted with rich botanical ingredients and exquisite fragrances, these candles transform ordinary spaces into serene sanctuaries.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IntimisiiMassageSpaCandlesArticle;
