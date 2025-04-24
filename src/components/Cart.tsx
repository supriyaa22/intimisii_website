
import { Lock, Minus, Plus, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { useCart } from "../contexts/CartContext";

export function Cart() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, total, savings } = useCart();
  const FREE_SHIPPING_THRESHOLD = 300;
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md bg-[#f5eee9] border-l-0">
        <SheetHeader className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-xl font-serif">SHOPPING BAG</SheetTitle>
            <button onClick={closeCart} className="p-1">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              Shop for ${FREE_SHIPPING_THRESHOLD - total > 0 ? (FREE_SHIPPING_THRESHOLD - total).toFixed(2) : '0'} to get FREE SHIPPING.
            </p>
            <Progress value={progress} className="h-2 bg-gray-200" />
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {items.map((item) => (
            <div key={item.product.id} className="mb-6">
              <div className="flex gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-24 w-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-serif text-lg">{item.product.name}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 border rounded-sm"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 border rounded-sm"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-sm underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="mt-2">${item.product.price}</p>
                </div>
              </div>
              <Separator className="my-6 bg-gray-300" />
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="mt-auto pt-6 border-t">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>You Saved:</span>
                <span>${savings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-[#3A1B1F] text-white py-4 flex items-center justify-center gap-2">
              <Lock className="h-4 w-4" />
              CONFIRM ORDER ${total.toFixed(2)}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
