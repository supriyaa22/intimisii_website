import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Product } from "../types";
import { Card, CardContent } from "../components/ui/card";
import { ShoppingBag } from "lucide-react";
import { CartProvider } from "../contexts/CartContext";
import { Cart } from "../components/Cart";

// Shop product data
const products: Product[] = [
  {
    id: 1,
    name: "Adiva Amorè Signature Collection",
    price: 199,
    image: "/lovable-uploads/1de72dba-2442-49d2-b545-de17ac8094c6.png",
    description: "This fragrance composition is thoughtfully crafted, beginning with the uplifting blend of gardenia and lemon peel, transitioning into the complex floral heart of tuberose, jasmine, and green florals.",
    details: "Intimisii's opulent parfum candle, meticulously crafted by our perfumer whose expertise was cultivated in Grasse, France.",
    badges: [
      { label: "Signature Collection", variant: "luxury" },
      { label: "Eco Conscious", variant: "eco" }
    ]
  },
  {
    id: 2,
    name: "Adiva Noir Signature Collection",
    price: 199,
    image: "/lovable-uploads/060ed3eb-e7e8-4ee7-95a9-28eb00269043.png",
    description: "This fragrance unfolds with the bright and uplifting essence of citrus, leading into a heart that harmoniously balances the sweetness of black and red currants with the delicate floral aroma of jasmine.",
    details: "A testament to the artistry of fragrance, offering an olfactory masterpiece characterized by unrivaled diffusion of scent.",
    badges: [
      { label: "Signature Collection", variant: "luxury" },
      { label: "Eco Conscious", variant: "eco" }
    ]
  },
  {
    id: 3,
    name: "Adiva Signature Bougié Massage Spa Candle",
    price: 79,
    image: "/lovable-uploads/cff2b946-86c8-4495-8d0f-1b24df9821aa.png",
    description: "Intimisii's Massage Spa Candles offer a harmonious blend of luxury and functionality, transforming any space into a serene sanctuary while providing exceptional skin benefits.",
    details: "A passionate ode to the art of indulgence, crafting a sensory journey of pure, unadulterated luxury.",
    badges: [
      { label: "ADIVA Signature Bougié Massage Spa Candle", variant: "feature" },
      { label: "Eco Conscious", variant: "eco" }
    ]
  }
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const filteredProducts = activeCategory === "all" 
    ? products 
    : activeCategory === "signature" 
      ? products.filter(p => p.badges.some(b => b.label === "Signature Collection"))
      : products.filter(p => p.badges.some(b => b.label === "ADIVA Signature Bougié Massage Spa Candle"));

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Cart />
        <main className="flex-1 pt-16">
          {/* Hero section */}
          <section className="relative py-24 overflow-hidden">
            <div className="container mx-auto px-4 text-center z-10 relative">
              <h1 className="font-serif text-5xl md:text-6xl mb-4">
                Luxurious <span className="text-gold">Candles</span>
              </h1>
              <p className="text-white/80 max-w-3xl mx-auto mb-12 text-lg">
                Discover our exquisite range of handcrafted luxury candles, each designed to create a unique sensory experience.
              </p>

              {/* Category Buttons */}
              <div className="flex flex-col md:flex-row justify-center gap-4 mt-12">
                <button 
                  onClick={() => handleCategoryChange("all")}
                  className={`px-6 py-3 rounded-sm text-sm font-medium transition-colors 
                    ${activeCategory === 'all' 
                      ? 'bg-gold text-black' 
                      : 'bg-transparent border border-gold text-gold hover:bg-gold/10'}`}
                >
                  All Products
                </button>
                <button 
                  onClick={() => handleCategoryChange("signature")}
                  className={`px-6 py-3 rounded-sm text-sm font-medium transition-colors 
                    ${activeCategory === 'signature' 
                      ? 'bg-gold text-black' 
                      : 'bg-transparent border border-gold text-gold hover:bg-gold/10'}`}
                >
                  Signature Collection
                </button>
                <button 
                  onClick={() => handleCategoryChange("massage")}
                  className={`px-6 py-3 rounded-sm text-sm font-medium transition-colors 
                    ${activeCategory === 'massage' 
                      ? 'bg-gold text-black' 
                      : 'bg-transparent border border-gold text-gold hover:bg-gold/10'}`}
                >
                  ADIVA Signature Bougié Massage Spa Candle
                </button>
              </div>
            </div>
          </section>

          {/* Product grid section */}
          <section className="py-16 bg-darkbg">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="bg-black border border-stone-800 overflow-hidden">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-80 object-cover"
                      />
                      
                      {/* Product badge */}
                      <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
                        {product.badges.map((badge, index) => (
                          <span 
                            key={index}
                            className={`px-3 py-1 text-xs rounded-full font-medium
                            ${badge.variant === 'luxury' 
                              ? 'bg-black/80 text-gold border border-gold' 
                              : badge.variant === 'eco'
                                ? 'bg-black/80 text-green-500 border border-green-700'
                                : 'bg-black/80 text-white border border-stone-700'
                            }`}
                          >
                            {badge.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-serif text-xl mb-2 text-white">{product.name}</h3>
                      <p className="text-gold text-xl mb-4">${product.price}</p>
                      <p className="text-white/80 mb-6 text-sm text-justify">{product.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center px-4 py-2 bg-[#3A1B1F] text-white border border-stone-700 rounded-sm hover:bg-[#4A2B2F] transition-colors">
                          <ShoppingBag size={16} className="mr-2" />
                          Add to Cart
                        </button>
                        <button className="px-4 py-2 bg-transparent text-white border border-[#D5B36A] rounded-sm hover:bg-[#D5B36A]/10 transition-colors">
                          View Details
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Shop;
