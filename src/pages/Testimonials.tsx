
import { useState } from "react";
import { User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  location: string;
  product: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Intimisii candles have transformed my evening ritual. The fragrance is sophisticated and long-lasting—unlike anything I've experienced before.",
    name: "Elise Morgan",
    location: "New York, NY",
    product: "Adiva Amorè Signature Collection",
  },
  {
    id: 2,
    quote: "The calming scent and beautiful packaging instantly elevated my home spa experience. Truly luxurious!",
    name: "Ravi Desai",
    location: "San Francisco, CA",
    product: "Adiva Noir Signature Collection",
  },
  {
    id: 3,
    quote: "From the first light to the last flicker, the aroma was mesmerizing. It's now my go-to gift for friends!",
    name: "Sophia Lin",
    location: "Toronto, Canada",
    product: "Adiva Amorè Signature Collection",
  },
  {
    id: 4,
    quote: "I wasn't expecting a candle to feel so indulgent. My entire apartment smells divine—and it lasts for hours!",
    name: "Jamal Peterson",
    location: "Chicago, IL",
    product: "Adiva Signature Bougié Massage Spa Candle",
  },
  {
    id: 5,
    quote: "Elegant, clean, and eco-conscious. The warm glow and subtle scent help me unwind after long workdays.",
    name: "Amara Singh",
    location: "Austin, TX",
    product: "Adiva Noir Signature Collection",
  },
];

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0]);

  return (
    <div className="min-h-screen bg-darkbg flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif text-gold text-center mt-16 mb-16">
            TESTIMONIALS
          </h1>

          <div className="max-w-2xl mx-auto mb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-white text-lg md:text-xl mb-8 font-serif italic">
                  "{activeTestimonial.quote}"
                </p>
                <h3 className="text-gold text-xl md:text-2xl font-serif mb-1">
                  {activeTestimonial.name}
                </h3>
                <p className="text-white text-sm mb-1">{activeTestimonial.location}</p>
                <p className="text-white/70 text-sm">Product: {activeTestimonial.product}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-6 md:gap-8">
            {testimonials.map((testimonial) => (
              <button
                key={testimonial.id}
                onClick={() => setActiveTestimonial(testimonial)}
                className={`relative rounded-full border-2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                  activeTestimonial.id === testimonial.id
                    ? "border-gold bg-[#3A1B1F]/50"
                    : "border-white/30 bg-black/20 hover:border-gold/60"
                }`}
              >
                <User className="text-white/80 w-6 h-6" />
              </button>
            ))}
          </div>
        </div>
      </main>
      <div className="mt-auto">
        <hr className="border-white/10 mx-12" />
        <Footer />
      </div>
    </div>
  );
}
