
import { Product, Badge } from "../types";

interface ProductCardProps {
  product: Product;
  imageOnRight?: boolean;
}

const ProductCard = ({ product, imageOnRight = false }: ProductCardProps) => {
  const getBadgeClass = (variant: string) => {
    switch (variant) {
      case "eco":
        return "bg-transparent text-green-500 border border-green-700 hover:bg-green-900/20";
      case "luxury":
        return "bg-transparent text-gold border border-gold hover:bg-gold/10";
      default:
        return "bg-transparent text-white border border-stone-700 hover:bg-stone-800/30";
    }
  };

  const contentSection = (
    <div className="bg-black border border-gold/30 p-12 flex flex-col justify-between">
      <div>
        <h3 className="font-serif text-3xl mb-4">
          <span className="text-gold">{product.name.split(' ')[0]} {product.name.split(' ')[1]}</span> {product.name.split(' ').slice(2).join(' ')}
        </h3>
        <p className="text-2xl mb-8">${product.price}</p>
        
        <p className="text-gray-300 mb-8">{product.description}</p>
        <p className="text-gray-400 mb-12">{product.details}</p>
        
        <div className="flex flex-wrap gap-3 mb-12">
          {product.badges.slice(0, 5).map((badge, index) => (
            <span 
              key={index} 
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${getBadgeClass(badge.variant)}`}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>
      
      <button className="w-full bg-transparent hover:bg-gold/20 transition-all duration-300 border border-gold text-white font-medium py-4 hover:border-gold/80">
        Add to Cart
      </button>
    </div>
  );

  const imageSection = (
    <div className="aspect-auto bg-stone-950 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
      />
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
