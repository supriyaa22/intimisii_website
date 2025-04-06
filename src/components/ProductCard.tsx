
import { Link } from "react-router-dom";

interface Badge {
  label: string;
  variant: "eco" | "luxury" | "feature";
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  details: string;
  badges: Badge[];
}

interface ProductCardProps {
  product: Product;
  reverse?: boolean;
}

const ProductCard = ({ product, reverse = false }: ProductCardProps) => {
  const getBadgeClass = (variant: string) => {
    switch (variant) {
      case "eco":
        return "eco-badge";
      case "luxury":
        return "luxury-badge";
      default:
        return "feature-badge";
    }
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
      <div className="aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="border border-gold p-8 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-2xl mb-2">{product.name}</h3>
          <p className="text-xl mb-6">${product.price}</p>
          <p className="text-gray-300 mb-4">{product.description}</p>
          <p className="text-gray-400 text-sm mb-8">{product.details}</p>
          <div className="flex flex-wrap gap-2">
            {product.badges.map((badge, index) => (
              <span 
                key={index} 
                className={`product-badge ${getBadgeClass(badge.variant)}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>
        <button className="cart-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
