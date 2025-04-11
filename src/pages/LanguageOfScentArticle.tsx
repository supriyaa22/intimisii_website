
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../components/ui/breadcrumb";

// Breadcrumb component for the Language of Scent article
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
            The Language of Scent
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const LanguageOfScentArticle = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f] bg-opacity-90 bg-[url('/lovable-uploads/3f7fadb9-649e-4d7f-b636-4bae9d7d34f9.png')] bg-blend-overlay">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-32">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <ArticleBreadcrumb />
          
          {/* Article Title */}
          <h1 className="text-center mb-8">
            <span className="text-[#C9AD7E] text-4xl md:text-5xl lg:text-6xl font-serif">The Language</span>
            <span className="text-white text-4xl md:text-5xl lg:text-6xl font-serif"> of Scent</span>
          </h1>
          
          {/* Hero Image with Gold Border - UPDATED IMAGE */}
          <div className="mb-16 mx-auto p-1 border border-[#C9AD7E]/70 max-w-3xl">
            <img 
              src="/lovable-uploads/cdd9f755-8a6d-49d4-b604-9bd5a259eb00.png"
              alt="Luxury candle with smoke" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Content Section - Added text-justify class */}
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-300 leading-relaxed font-serif tracking-wide text-lg text-justify">
              <span className="text-[#C9AD7E] font-medium text-xl block mb-4">The Language of Scent:</span>
              How Fragrance Notes Shape Mood, Memory, and Emotion Scent is more than just an invisible presence; it is a language—one that speaks directly to our emotions, memories, and even our sense of identity. At Intimisii, we believe that fragrance has the power to transform space, evoke deep emotions, and create an intimate experience unlike any other. Whether through the flickering glow of a candle or the whisper of a pillow mist, scent tells a story that lingers long after the moment has passed.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LanguageOfScentArticle;
