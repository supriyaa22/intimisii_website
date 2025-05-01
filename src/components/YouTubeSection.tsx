
import React from "react";

const YouTubeSection = () => {
  return (
    <div className="container mx-auto py-16 px-4 md:py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12 font-semibold">
          Experience <span className="italic font-light">Intimisii</span>
        </h2>
        <div className="aspect-w-16 aspect-h-9 w-full">
          <video 
            controls 
            width="100%" 
            className="w-full h-auto border-radius-12 shadow-lg"
            style={{ borderRadius: "12px" }}
          >
            <source src="/Videos/Intimisii_Teaser.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default YouTubeSection;
