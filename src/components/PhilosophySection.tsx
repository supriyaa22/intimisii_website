
import { Link } from "react-router-dom";

const PhilosophySection = () => {
  return (
    <section className="bg-darkbg py-16">
      <div className="container mx-auto px-4">
        <div className="border-t border-stone-700 pt-12"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
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
            <div className="mt-8">
              <Link 
                to="/about"
                className="inline-block px-8 py-3 bg-transparent border border-stone-700 hover:border-gold text-white hover:text-gold transition duration-200"
              >
                Discover Our Story
              </Link>
            </div>
          </div>
          <div className="border border-gold">
            <img 
              src="/lovable-uploads/76ebf700-1615-4a76-9421-09977ace05f1.png" 
              alt="Square glass candle with multiple wicks" 
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="border-b border-stone-700 pb-12 mt-12"></div>
      </div>
    </section>
  );
};

export default PhilosophySection;
