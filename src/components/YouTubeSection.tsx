
import React from "react";

const YouTubeSection = () => {
  return (
    <div className="container mx-auto py-16 px-4 md:py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12 font-semibold">
          Experience <span className="italic font-light">Intimisii</span>
        </h2>
        <div className="aspect-w-16 aspect-h-9 w-full">
          {/* Video has been moved to the Hero component */}
          <div className="w-full h-full flex items-center justify-center bg-opacity-20 bg-white rounded-lg p-8">
            <p className="text-center text-xl italic">
              Discover the Intimisii experience through our products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeSection;
