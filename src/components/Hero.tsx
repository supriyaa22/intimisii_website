
const Hero = () => {
  return (
    <div className="w-full h-[700px] bg-[#1A1F2C] relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto h-full flex flex-col items-center justify-center">
          {/* Placeholder for future video */}
          <div className="w-full max-w-4xl h-80 flex items-center justify-center border-2 border-dashed border-white/30 rounded-md">
            <div className="text-center text-white/70">
              <p className="text-xl font-serif italic">Video coming soon</p>
              <p className="mt-2 text-sm">This is a placeholder for the video that will be uploaded later</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
