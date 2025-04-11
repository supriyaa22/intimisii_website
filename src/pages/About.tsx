
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif">
                Our <span className="text-gold">Philosophy</span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                At Intimisii, we believe in creating more than just candles—
                we craft sensory journeys that transform spaces and elevate moments. Each
                product embodies our commitment to artisanal craftsmanship,
                sustainable practices, and uncompromising quality.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our founder's vision was to create a brand that epitomizes luxury while
                respecting our planet. This ethos continues to guide every decision we make,
                from sourcing ingredients to designing our packaging.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We take pride in our attention to detail and dedication to excellence,
                ensuring that every Intimisii candle delivers an exceptional experience
                that engages all senses and creates lasting memories.
              </p>
            </div>
            <div className="border border-gold p-1">
              <img 
                src="/lovable-uploads/5be74887-b23f-48f9-bcfe-5c31b888c3eb.png" 
                alt="Intimisii luxury candle" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
