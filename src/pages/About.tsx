
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const About = () => {
  return (
    <div className="min-h-screen bg-darkbg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-darkbg py-32 md:py-36">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl md:text-2xl mb-6 text-white">Our Story</h3>
          <h1 className="text-5xl md:text-7xl font-serif mb-8">
            ABOUT <span className="text-gold">INTIMISII</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the passion and artistry behind our luxury candle collection.
          </p>
        </div>
      </section>
      
      {/* Philosophy Section */}
      <section className="bg-darkbg py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col">
            <h2 className="text-5xl md:text-6xl font-serif mb-12">
              Our <span className="text-gold">Philosophy</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <p className="text-gray-300 leading-relaxed text-lg">
                  At Intimisii, we believe in creating more than just candles—
                  we craft sensory journeys that transform spaces and elevate moments. Each
                  product embodies our commitment to artisanal craftsmanship,
                  sustainable practices, and uncompromising quality.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Our founder's vision was to create a brand that epitomizes luxury while
                  respecting our planet. This ethos continues to guide every decision we make,
                  from sourcing ingredients to designing our packaging.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  We take pride in our attention to detail and dedication to excellence,
                  ensuring that every Intimisii candle delivers an exceptional experience
                  that engages all senses and creates lasting memories.
                </p>
              </div>
              <div className="border border-gold p-0">
                <div className="p-4 border border-gold m-2">
                  <img 
                    src="/lovable-uploads/8b1d83ba-917e-41c2-9bee-71943c189068.png" 
                    alt="Intimisii luxury candle with multiple wicks on burgundy velvet" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
