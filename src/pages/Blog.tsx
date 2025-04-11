
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

// Custom Button Component for Blog Articles
const ArticleButton = ({ to, children }: { to: string, children: React.ReactNode }) => {
  return (
    <Link 
      to={to}
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
  slug: string;
  isReversed?: boolean;
}

const LuxuryBlogPost = ({ image, title, titleHighlight, description, slug, isReversed = false }: BlogPostProps) => {
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
        
        <ArticleButton to={`/blog/${slug}`}>Read Article</ArticleButton>
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
              slug="the-art-of-candle-burning"
              isReversed={false}
            />
            
            <LuxuryBlogPost 
              image="/lovable-uploads/66492098-243a-49ee-8c83-036c1984bdd7.png" 
              title="Creating a Sensory Sanctuary: Transform Your Space into a Haven of Tranquility" 
              description="Learn how to curate a personal oasis through strategic fragrance placement, ambient lighting, and mindful design choices."
              titleHighlight="a Sensory Sanctuary"
              slug="creating-a-sensory-sanctuary"
              isReversed={true}
            />
            
            {/* UPDATED IMAGE for The Language of Scent */}
            <LuxuryBlogPost 
              image="/lovable-uploads/cdd9f755-8a6d-49d4-b604-9bd5a259eb00.png" 
              title="The Language of Scent" 
              description="Explore how different fragrances communicate emotions and memories, creating a personal olfactory language unique to you."
              titleHighlight="Language of Scent"
              slug="the-language-of-scent"
              isReversed={false}
            />
            
            {/* New blog post: Sustainable Luxury - Updated image */}
            <LuxuryBlogPost 
              image="/lovable-uploads/0c8d28ee-46dc-4f6b-90bd-93b597cbaeeb.png" 
              title="Sustainable Luxury: The Future of Home Fragrance" 
              description="Discover the secrets to properly burning your luxury candles to maximise their lifespan and fragrance diffusion."
              titleHighlight="Sustainable Luxury:"
              slug="sustainable-luxury-the-future-of-home-fragrance"
              isReversed={true}
            />
            
            {/* New blog post: Intimisii Massage Spa Candles - UPDATED IMAGE */}
            <LuxuryBlogPost 
              image="/lovable-uploads/7aec83ae-3627-427e-a8dc-1f5afed29490.png" 
              title="Intimisii Massage Spa Candles: A Luxurious Fusion of Fragrance and Skincare" 
              description="Discover the secrets to properly burning your luxury candles to maximise their lifespan and fragrance diffusion."
              titleHighlight="Intimisii Massage Spa Candles:"
              slug="intimisii-massage-spa-candles-fragrance-and-skincare"
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
