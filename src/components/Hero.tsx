
import React from 'react';

const Hero = () => {
  return (
    <div className="w-full h-[700px] bg-[#E7B5A1] relative overflow-hidden">
      <video
        src="/Videos/Intimisii_Teaser.mp4"
        autoPlay
        loop
        controls
        playsInline
        className="w-full h-full object-cover"
        onLoadedMetadata={(e) => {
          e.currentTarget.volume = 0.7;
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Hero;
