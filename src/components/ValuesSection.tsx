
import React from "react";

const ValuesSection: React.FC = () => {
  return (
    <section className="w-full bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sustainable Sourcing */}
          <div className="border border-gold p-8 flex flex-col items-center justify-center text-center h-full">
            <h3 className="text-gold text-2xl md:text-3xl font-serif mb-6">
              Sustainable Sourcing
            </h3>
            <p className="text-white leading-relaxed">
              We meticulously select each ingredient, ensuring it meets our rigorous standards 
              for sustainability and ethical production.
            </p>
          </div>

          {/* Artisanal Craftsmanship */}
          <div className="border border-gold p-8 flex flex-col items-center justify-center text-center h-full">
            <h3 className="text-gold text-2xl md:text-3xl font-serif mb-6">
              Artisinal Craftsmanship
            </h3>
            <p className="text-white leading-relaxed">
              Every candle is handcrafted by skilled artisans who bring years of 
              experience and passion to their craft.
            </p>
          </div>

          {/* Luxury Experience */}
          <div className="border border-gold p-8 flex flex-col items-center justify-center text-center h-full">
            <h3 className="text-gold text-2xl md:text-3xl font-serif mb-6">
              Luxury Experience
            </h3>
            <p className="text-white leading-relaxed">
              We create more than products—we design comprehensive sensory experiences 
              that transform spaces and moments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
