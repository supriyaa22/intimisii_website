
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../components/ui/breadcrumb";

// Breadcrumb component for the Sensory Sanctuary article
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
            Creating a Sensory Sanctuary
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const SensorySanctuaryArticle = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f] bg-opacity-90 bg-[url('/lovable-uploads/3f7fadb9-649e-4d7f-b636-4bae9d7d34f9.png')] bg-blend-overlay">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-32">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <ArticleBreadcrumb />
          
          {/* Article Title */}
          <h1 className="text-center mb-8">
            <span className="block text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-2">
              Creating a Sensory Sanctuary:
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-serif text-[#C9AD7E]">
              Transform Your Space into a Haven of Tranquility
            </span>
          </h1>
          
          {/* Hero Image with Gold Border */}
          <div className="mb-16 mx-auto p-1 border border-[#C9AD7E]/70 max-w-3xl">
            <img 
              src="/lovable-uploads/66492098-243a-49ee-8c83-036c1984bdd7.png"
              alt="Luxurious bathtub in a marble room" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Content Section */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif text-[#C9AD7E] mb-6 tracking-wide">
              Fragrance Profiles & Usage Instructions
            </h2>
            
            <p className="text-gray-300 leading-relaxed font-serif tracking-wide text-lg mb-12">
              Choose from scents like Dulcis Orange Blossom, a refreshing citrus blend; White Lily Blossoms 
              & Velvet, a sensual floral; or Tahitian Flower, an exotic tropical fusion. Light the candle and 
              allow a pool of warm oil to form. Once melted, carefully pour it onto the skin and gently 
              massage it in for a soothing experience.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SensorySanctuaryArticle;
