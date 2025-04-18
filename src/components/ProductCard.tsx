
import { Product, Badge } from "../types";

interface ProductCardProps {
  product: Product;
  imageOnRight?: boolean;
  isFeatured?: boolean;
}

const ProductCard = ({ product, imageOnRight = false, isFeatured = false }: ProductCardProps) => {
  const getBadgeClass = (variant: string) => {
    switch (variant) {
      case "luxury":
        return "bg-black/80 text-gold border border-gold hover:bg-gold/10";
      case "eco":
        return "bg-black/80 text-green-500 border border-green-700 hover:bg-green-900/20";
      default:
        return "bg-black/80 text-white border border-stone-700 hover:bg-stone-800/30";
    }
  };

  const imageSection = (
    <div className="aspect-auto bg-stone-950 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
  );

  const contentSection = (
    <div className="bg-black border border-gold/30 p-12 flex flex-col justify-between">
      <div>
        <h3 className="font-serif text-3xl mb-4 text-gold">{product.name}</h3>
        <p className="text-2xl mb-8 text-gold">${product.price}</p>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {product.badges.slice(0, 6).map((badge, index) => (
            <span 
              key={index} 
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${getBadgeClass(badge.variant)}`}
            >
              {badge.label}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button className="flex items-center justify-center px-4 py-2 bg-[#3A1B1F] text-white border border-stone-700 rounded-sm hover:bg-[#4A2B2F] transition-colors">
            Add to Cart
          </button>
          <button className="px-4 py-2 bg-transparent text-white border border-[#D5B36A] rounded-sm hover:bg-[#D5B36A]/10 transition-colors">
            View Details
          </button>
        </div>
        
        <p className="text-white/80 text-justify leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
      {imageOnRight ? (
        <>
          {contentSection}
          {imageSection}
        </>
      ) : (
        <>
          {imageSection}
          {contentSection}
        </>
      )}
    </div>
  );
};

export default ProductCard;
