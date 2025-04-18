
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
        return "bg-black/80 text-gold border border-gold";
      case "eco":
        return "bg-black/80 text-green-500 border border-green-700";
      default:
        return "bg-black/80 text-white border border-stone-700";
    }
  };

  const imageSection = (
    <div className="relative aspect-auto bg-stone-950 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 left-4">
        {product.badges.slice(0, 1).map((badge, index) => (
          <span 
            key={index} 
            className={`px-4 py-2 text-sm font-medium ${getBadgeClass(badge.variant)}`}
          >
            {badge.label}
          </span>
        ))}
      </div>
    </div>
  );

  const contentSection = (
    <div className="bg-black p-8 flex flex-col justify-between">
      <div>
        <h3 className="font-serif text-4xl mb-4 text-[#D5B36A]">{product.name}</h3>
        <p className="text-2xl mb-8 text-[#D5B36A]">${product.price}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button className="flex items-center justify-center px-6 py-3 bg-[#3A1B1F] text-white border border-stone-700 rounded-sm hover:bg-[#4A2B2F] transition-colors">
            Add to Cart
          </button>
          <button className="px-6 py-3 bg-transparent text-white border border-[#D5B36A] rounded-sm hover:bg-[#D5B36A]/10 transition-colors">
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
