
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

// Custom Button Component for Blog Articles
const ArticleButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Link 
      to="/" 
      className="inline-block px-8 py-3 border border-[#FFDEE2] text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm"
    >
      {children}
    </Link>
  );
};

// BlogPost with updated styling
interface BlogPostProps {
  image: string;
  title: string;
  titleHighlight: string;
  description: string;
  isReversed?: boolean;
}

const LuxuryBlogPost = ({ image, title, titleHighlight, description, isReversed = false }: BlogPostProps) => {
  const titleParts = title.split(titleHighlight);
  
  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}>
      <div className="w-full md:w-1/2">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-auto rounded-sm shadow-lg object-cover" 
        />
      </div>
      
      <div className="w-full md:w-1/2 flex flex-col items-start">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
          {titleParts[0]}
          <span className="text-[#C9AD7E]">{titleHighlight}</span>
          {titleParts[1]}
        </h3>
        
        <p className="text-gray-400 mb-8 font-serif leading-relaxed tracking-wide">
          {description}
        </p>
        
        <ArticleButton>Read Article</ArticleButton>
      </div>
    </div>
  );
};

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f] bg-opacity-90 bg-[url('/lovable-uploads/3f7fadb9-649e-4d7f-b636-4bae9d7d34f9.png')] bg-blend-overlay">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-32">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-24">
            <p className="text-[#C9AD7E] font-medium uppercase tracking-[0.25em] mb-6 text-sm">JOURNAL</p>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-12">
              Sensory <span className="text-[#C9AD7E]">Chronicles</span>
            </h2>
            
            <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg font-serif leading-relaxed tracking-wide">
              Immerse yourself in our collection of articles exploring the art of fragrance, mindful living
              and the intimate relationship between scent and emotion.
            </p>
          </div>
          
          {/* Blog Posts */}
          <div className="space-y-32">
            <LuxuryBlogPost 
              image="/lovable-uploads/41b4dcd0-4a0d-4d31-b3e3-feb5395ecae6.png" 
              title="The Art Of Candle Burning" 
              description="Discover the secrets to properly burning your luxury candles to maximise their lifespan and fragrance diffusion."
              titleHighlight="Candle Burning"
              isReversed={false}
            />
            
            <LuxuryBlogPost 
              image="/lovable-uploads/66492098-243a-49ee-8c83-036c1984bdd7.png" 
              title="Creating a Sensory Sanctuary: Transform Your Space into a Haven of Tranquility" 
              description="Learn how to curate a personal oasis through strategic fragrance placement, ambient lighting, and mindful design choices."
              titleHighlight="a Sensory Sanctuary"
              isReversed={true}
            />
            
            <LuxuryBlogPost 
              image="/lovable-uploads/8b1d83ba-917e-41c2-9bee-71943c189068.png" 
              title="The History and Evolution of Luxury Fragrances" 
              description="Explore the rich heritage of perfumery from ancient civilizations to modern artisanal creations that define contemporary luxury."
              titleHighlight="Luxury Fragrances"
              isReversed={false}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
