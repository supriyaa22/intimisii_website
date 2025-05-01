
import { Lock, Minus, Plus, ShoppingBag, X, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { useCart } from "../contexts/CartContext";

export function Cart() {
  const { 
    isOpen, 
    closeCart, 
    items, 
    removeItem, 
    updateQuantity, 
    total, 
    savings, 
    freeShippingEligible, 
    freeShippingMessage,
    totalItems,
    proceedToCheckout,
    isProcessingPayment
  } = useCart();
  
  // Calculate progress for the free shipping indicator
  const FREE_SHIPPING_THRESHOLD = 2; // Number of items for free shipping
  const progress = Math.min((totalItems / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md bg-[#f5eee9] border-l-0 flex flex-col">
        <SheetHeader className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-xl font-serif text-black">SHOPPING BAG</SheetTitle>
            <button onClick={closeCart} className="p-1">
              <X className="h-5 w-5 text-black" />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-black">
              {freeShippingMessage}
            </p>
            <Progress value={progress} className="h-2 bg-gray-200" />
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="font-serif text-xl text-black">YOUR CART IS EMPTY</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mr-4 pr-4">
              {items.map((item) => (
                <div key={item.product.id} className="mb-6">
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-24 w-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-black">{item.product.name}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 border rounded-sm"
                        >
                          <Minus className="h-3 w-3 text-black" />
                        </button>
                        <span className="text-sm text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 border rounded-sm"
                        >
                          <Plus className="h-3 w-3 text-black" />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-sm underline ml-2 text-black"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="mt-2 text-black">${item.product.price}</p>
                    </div>
                  </div>
                  <Separator className="my-6 bg-gray-300" />
                </div>
              ))}
            </ScrollArea>

            <div className="mt-auto pt-6 border-t">
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-black">You Saved:</span>
                  <span className="text-black">${savings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-black">Total:</span>
                  <span className="text-black">${total.toFixed(2)}</span>
                </div>
              </div>
              <button 
                className="w-full bg-[#3A1B1F] text-white py-4 flex items-center justify-center gap-2 disabled:opacity-70"
                onClick={proceedToCheckout}
                disabled={isProcessingPayment || items.length === 0}
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    CONFIRM ORDER ${total.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
