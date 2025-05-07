
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Product } from "../types";
import { Card, CardContent } from "../components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";

// Shop product data
const products: Product[] = [
  {
    id: 1,
    name: "Adiva Amorè Signature Collection",
    price: 199,
    image: "/lovable-uploads/e6637287-0c92-47e2-92ac-a8895830910c.png",
    description: "This fragrance composition is thoughtfully crafted, beginning with the uplifting blend of gardenia and lemon peel, transitioning into the complex floral heart of tuberose, jasmine, and green florals.",
    details: "Intimisii's opulent parfum candle, meticulously crafted by our perfumer whose expertise was cultivated in Grasse, France.",
    badges: [
      { label: "Signature Collection", variant: "luxury" },
      { label: "Eco Conscious", variant: "eco" }
    ],
    stripeProductId: "prod_SEYvzHVuPxR6Dx"
  },
  {
    id: 2,
    name: "Adiva Noir Signature Collection",
    price: 199,
    image: "/lovable-uploads/7be80d11-f178-4c0e-b49f-c833e2c896d4.png",
    description: "This fragrance unfolds with the bright and uplifting essence of citrus, leading into a heart that harmoniously balances the sweetness of black and red currants with the delicate floral aroma of jasmine.",
    details: "A testament to the artistry of fragrance, offering an olfactory masterpiece characterized by unrivaled diffusion of scent.",
    badges: [
      { label: "Signature Collection", variant: "luxury" },
      { label: "Eco Conscious", variant: "eco" }
    ],
    stripeProductId: "prod_SEYwYW2Damrmqo"
  },
  {
    id: 3,
    name: "Adiva Signature Bougié Massage Spa Candle",
    price: 79,
    image: "/lovable-uploads/9ed8ca21-42bc-4f88-a4ca-a508510db68a.png",
    description: "Intimisii's Massage Spa Candles offer a harmonious blend of luxury and functionality, transforming any space into a serene sanctuary while providing exceptional skin benefits.",
    details: "A passionate ode to the art of indulgence, crafting a sensory journey of pure, unadulterated luxury.",
    badges: [
      { label: "Massage Candle", variant: "feature" },
      { label: "Eco Conscious", variant: "eco" }
    ],
    stripeProductId: ""
  }
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { addItem } = useCart();

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const filteredProducts = activeCategory === "all" 
    ? products 
    : activeCategory === "signature" 
      ? products.filter(p => p.badges.some(b => b.label === "Signature Collection"))
      : products.filter(p => p.badges.some(b => b.label === "Massage Candle"));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
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
                <Card key={product.id} className="bg-black border border-stone-800 overflow-hidden flex flex-col">
                  <div className="relative">
                    <div className="h-[400px] overflow-hidden"> {/* Increased height for taller product images */}
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain" /* Changed to contain to show full image without cropping */
                      />
                    </div>
                    
                    {/* Product badge - only showing badges, removed duplicate product name */}
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
                  
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-xl mb-2 text-white">{product.name}</h3>
                    <p className="text-gold text-xl mb-4">${product.price}</p>
                    <p className="text-white/80 mb-6 text-sm text-justify flex-grow">{product.description}</p>
                    
                    {/* Single button layout - removed View Details button */}
                    <button 
                      onClick={() => addItem(product)}
                      className="flex items-center justify-center px-4 py-3 bg-[#3A1B1F] text-white border border-stone-700 rounded-sm hover:bg-[#4A2B2F] transition-colors w-full"
                    >
                      <ShoppingBag size={16} className="mr-2" />
                      Add to Cart
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
