
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-xl md:text-2xl font-montserrat mb-6">Our Story</h2>
          <h1 className="text-4xl md:text-6xl mb-8 font-playfair">
            <span className="text-white">ABOUT</span>{" "}
            <span className="text-[#C9A96E]">INTIMISII</span>
          </h1>
          <p className="text-xl md:text-2xl font-montserrat max-w-3xl mx-auto">
            Discover the passion and artistry behind our luxury candle collection.
          </p>
        </div>
        
        {/* Philosophy Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-playfair mb-10">
              <span className="text-white">Our</span>{" "}
              <span className="text-[#C9A96E]">Philosophy</span>
            </h2>
            
            <div className="space-y-8 font-montserrat text-lg">
              <p>
                At Intimisii, we believe in creating more than just candles 
                we craft sensory journeys that transform spaces and elevate moments. Each 
                product embodies our commitment to artisanal craftsmanship, 
                sustainable practices, and uncompromising quality.
              </p>
              
              <p>
                Our founder's vision was to create a brand that epitomizes luxury while 
                respecting our planet. This ethos continues to guide every decision we make, 
                from sourcing ingredients to designing our packaging.
              </p>
              
              <p>
                We take pride in our attention to detail and dedication to excellence, 
                ensuring that every Intimisii candle delivers an exceptional experience 
                that engages all senses and creates lasting memories.
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="border border-[#C9A96E] p-4">
              <div className="bg-black p-3">
                <img 
                  src="/lovable-uploads/d9d814d3-17a5-4ce0-9138-eac6c7524535.png" 
                  alt="Intimisii Luxury Candle" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
