
import React from 'react';

const YouTubeSection = () => {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-darkbg">
      <div className="container mx-auto px-4 md:px-8 flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              src="https://www.youtube.com/embed/QMO9ISimNeI" 
              title="'Lady Dior' Pearl Prestige: Stringing Together Timeless Beauty"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
