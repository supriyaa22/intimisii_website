
import { Product as ProductType } from "../types";

interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  return (
    <div className="bg-darkbg border border-stone-800 p-6 flex flex-col">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover mb-4"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {product.badges.map((badge, index) => (
            <span
              key={index}
              className={`product-badge ${
                badge.variant === "eco"
                  ? "eco-badge"
                  : badge.variant === "luxury"
                  ? "luxury-badge"
                  : "feature-badge"
              }`}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>
      <h3 className="text-xl font-serif mb-2">{product.name}</h3>
      <p className="text-gold font-medium mb-2">${product.price}</p>
      <p className="text-stone-400 text-sm mb-4">{product.description}</p>
      <button className="cart-button mt-auto">Add to Cart</button>
    </div>
  );
};

export default Product;
