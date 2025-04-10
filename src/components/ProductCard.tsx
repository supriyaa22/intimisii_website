
import { Product, Badge } from "../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
      {/* Product Image */}
      <div className="aspect-auto bg-stone-950 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product Details */}
      <div className="bg-black border border-gold/30 p-12 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-3xl mb-2">
            <span className="text-gold">{product.name.split(' ')[0]} {product.name.split(' ')[1]}</span> {product.name.split(' ').slice(2).join(' ')}
          </h3>
          <p className="text-2xl mb-6">${product.price}</p>
          
          <p className="text-gray-300 mb-6">{product.description}</p>
          <p className="text-gray-400 mb-12">{product.details}</p>
          
          <div className="flex flex-wrap gap-2 mb-10">
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
        
        <button className="w-full bg-transparent hover:bg-stone-800/50 transition duration-300 border border-gold/60 py-4 text-white font-medium">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
