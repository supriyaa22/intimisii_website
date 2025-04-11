
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogPost from "../components/BlogPost";

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h3 className="text-[#C9AD7E] font-medium uppercase tracking-widest mb-4">JOURNAL</h3>
            
            <h2 className="text-4xl md:text-6xl font-playfair text-white mb-8">
              Sensory <span className="text-[#C9AD7E]">Chronicles</span>
            </h2>
            
            <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg font-montserrat leading-relaxed">
              Immerse yourself in our collection of articles exploring the art of fragrance, mindful living
              and the intimate relationship between scent and emotion.
            </p>
          </div>
          
          {/* Blog Posts */}
          <div className="space-y-24">
            <BlogPost 
              image="/lovable-uploads/fa60a00d-028f-4505-9cc2-84c9301a93fd.png" 
              title="The Art Of Candle Burning" 
              description="Discover the secrets to properly burning your luxury candles to maximise their lifespan and fragrance diffusion."
              titleHighlight="Candle Burning"
              isReversed={false}
            />
            
            <BlogPost 
              image="/lovable-uploads/cbf9ff85-cacb-4d10-91dd-fb6027b8af7a.png" 
              title="Creating a Sensory Sanctuary: Transform Your Space into a Haven of Tranquility" 
              description="Learn how to curate a personal oasis through strategic fragrance placement, ambient lighting, and mindful design choices."
              titleHighlight="a Sensory Sanctuary"
              isReversed={true}
            />
            
            <BlogPost 
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
