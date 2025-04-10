
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Product, BadgeVariant } from "../types";
import { Separator } from "./ui/separator";

const CollectionSection = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Adiva Amorè Signature Collection",
      price: 199,
      image: "/lovable-uploads/89b82b09-3945-4098-9959-a6d6273bcc14.png",
      description: "Intimisii's opulent parfum candle, meticulously crafted by our perfumer whose expertise was cultivated in Grasse, France.",
      details: "Intricately composed using coconut wax and an exquisite fusion of fragrance and essential oils. Free from parabens, paraffin, phthalates, sulfates, synthetic dyes, and formaldehyde.",
      badges: [
        { label: "Eco Conscious", variant: "eco" as BadgeVariant },
        { label: "Cruelty Free", variant: "feature" as BadgeVariant },
        { label: "Luxurious", variant: "luxury" as BadgeVariant },
        { label: "Long - Lasting", variant: "feature" as BadgeVariant },
        { label: "Eco - Friendly", variant: "eco" as BadgeVariant },
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
        { label: "Eco Conscious", variant: "eco" as BadgeVariant },
        { label: "Cruelty Free", variant: "feature" as BadgeVariant },
        { label: "Sophisticated", variant: "luxury" as BadgeVariant },
        { label: "Rich", variant: "luxury" as BadgeVariant },
        { label: "Eco - Friendly", variant: "eco" as BadgeVariant },
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
        { label: "Sensual", variant: "feature" as BadgeVariant },
        { label: "Therapeutic", variant: "feature" as BadgeVariant },
        { label: "Luxurious", variant: "luxury" as BadgeVariant },
        { label: "Aromatic", variant: "feature" as BadgeVariant },
        { label: "Eco - Friendly", variant: "eco" as BadgeVariant },
        { label: "Massage Candle", variant: "feature" as BadgeVariant },
      ]
    }
  ];

  return (
    <section className="bg-darkbg py-20">
      <div className="container mx-auto px-4">
        {/* Header section */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wider text-gray-400">OUR COLLECTION</p>
          <h2 className="text-5xl font-serif mt-2">
            Artisanal <span className="text-gold">Fragrances</span>
          </h2>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            Each Intimisii candle is meticulously handcrafted using the finest sustainable ingredients, 
            creating an exquisite sensory experience that transcends the ordinary.
          </p>
        </div>

        {/* Product Display */}
        <div className="space-y-16">
          {products.map((product, index) => (
            <div key={product.id}>
              <ProductCard product={product} />
              {index < products.length - 1 && (
                <div className="w-full my-16">
                  <Separator className="bg-gold/20" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
