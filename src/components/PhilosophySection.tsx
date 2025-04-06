
import { Link } from "react-router-dom";

const PhilosophySection = () => {
  return (
    <section className="bg-darkbg py-20">
      <div className="container mx-auto px-4">
        <div className="border-t border-stone-800 pt-16"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-wider text-gray-400">OUR PHILOSOPHY</p>
            <h2 className="text-5xl font-serif">
              A Symphony of{" "}
              <span className="text-gold">Elegance & Refinement</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">
              At Intimisii, we believe in creating more than just candles—we curate sensory
              journeys that transform spaces and elevate moments. Each product embodies
              our commitment to Luxury Curation, sustainable practices,
              and uncompromising quality.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our collections are an invitation to experience luxury in its most authentic
              form a harmonious blend of sophisticated fragrances, elegant design, and
              mindful indulgence that whispers rather than shouts, leaving an indelible
              impression on the senses.
            </p>
            <div>
              <Link 
                to="/our-story"
                className="inline-block px-8 py-3 border border-stone-700 hover:border-gold text-white hover:text-gold transition duration-200"
              >
                Discover Our Story
              </Link>
            </div>
          </div>
          <div className="border border-gold p-1">
            <img 
              src="/lovable-uploads/a15e7bef-a47b-401a-a895-2ea5a371ac46.png" 
              alt="Luxury Candle" 
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="border-b border-stone-800 pb-16 mt-16"></div>
      </div>
    </section>
  );
};

export default PhilosophySection;
