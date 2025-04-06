
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const CollectionSection = () => {
  const products = [
    {
      id: 1,
      name: "Adiva Amorè Signature Collection",
      price: 199,
      image: "/lovable-uploads/d9c49793-5d4b-493f-a809-0923cc292c64.png",
      description: "Intimisii's opulent parfum candle, meticulously crafted by our perfumer whose expertise was cultivated in Grasse, France.",
      details: "Intricately composed using coconut wax and an exquisite fusion of fragrance and essential oils. Free from parabens, paraffin, phthalates, sulfates, synthetic dyes, and formaldehyde.",
      badges: [
        { label: "Eco Conscious", variant: "eco" },
        { label: "Cruelty Free", variant: "feature" },
        { label: "Luxurious", variant: "luxury" },
        { label: "Long - Lasting", variant: "feature" },
        { label: "Eco - Friendly", variant: "eco" },
      ]
    },
    {
      id: 2,
      name: "Adiva Noir Signature Collection",
      price: 199,
      image: "/lovable-uploads/b1c71061-3ba5-48d8-8558-e49aa2f4b05a.png",
      description: "A testament to the artistry of fragrance, offering an olfactory masterpiece characterized by unrivaled diffusion of scent.",
      details: "Harness the potent essences of coconut wax with intricately blended perfume fragrances and essential oils. Our sustainable packaging materials resonate with eco-conscious values.",
      badges: [
        { label: "Eco Conscious", variant: "eco" },
        { label: "Cruelty Free", variant: "feature" },
        { label: "Sophisticated", variant: "luxury" },
        { label: "Rich", variant: "luxury" },
        { label: "Eco - Friendly", variant: "eco" },
      ]
    },
    {
      id: 3,
      name: "Adiva Signature Bougié Massage Spa Candle",
      price: 79,
      image: "/lovable-uploads/498b3b88-05d5-4cf3-8142-5edb821bcfc0.png",
      description: "A passionate ode to the art of indulgence, crafting a sensory journey of pure, unadulterated luxury.",
      details: "When the luscious warm wax gently cascades onto your skin, it infuses your space with an intoxicating essence of romance and allure.",
      badges: [
        { label: "Sensual", variant: "feature" },
        { label: "Therapeutic", variant: "feature" },
        { label: "Luxurious", variant: "luxury" },
        { label: "Aromatic", variant: "feature" },
        { label: "Eco - Friendly", variant: "eco" },
        { label: "Massage Candle", variant: "feature" },
      ]
    }
  ];

  return (
    <section className="bg-darkbg py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wider text-gray-400">OUR COLLECTION</p>
          <h2 className="text-5xl font-serif mt-2">Artisanal <span className="text-gold">Fragrances</span></h2>
          <p className="text-gray-300 mt-6 max-w-3xl mx-auto">
            Each Intimisii candle is meticulously handcrafted using the finest sustainable ingredients, 
            creating an exquisite sensory experience that transcends the ordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} reverse={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
