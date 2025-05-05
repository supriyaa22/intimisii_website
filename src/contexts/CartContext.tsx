
import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleCart: () => void;
  closeCart: () => void;
  total: number;
  savings: number;
  totalItems: number;
  freeShippingEligible: boolean;
  freeShippingMessage: string;
  proceedToCheckout: () => Promise<void>;
  isProcessingPayment: boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { toast } = useToast();

  const addItem = (product: Product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { product, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: number) => {
    setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    setItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const toggleCart = () => setIsOpen(prev => !prev);
  const closeCart = () => setIsOpen(false);
  
  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const savings = items.reduce((sum, item) => sum + 50, 0); // Example savings calculation
  
  // Calculate total items for free shipping logic based on unique products (not quantity)
  const totalItems = items.length;
  const FREE_SHIPPING_THRESHOLD = 2; // Number of unique products needed for free shipping
  const freeShippingEligible = totalItems >= FREE_SHIPPING_THRESHOLD;
  
  // Dynamic free shipping message based on unique products
  let freeShippingMessage = "";
  if (freeShippingEligible) {
    freeShippingMessage = "You have unlocked FREE SHIPPING!";
  } else {
    const itemsNeeded = FREE_SHIPPING_THRESHOLD - totalItems;
    freeShippingMessage = `Add ${itemsNeeded} more product${itemsNeeded > 1 ? 's' : ''} to get FREE SHIPPING.`;
  }

  // Function to proceed to checkout with Stripe
  const proceedToCheckout = async () => {
    try {
      // Prevent multiple checkout attempts
      if (isProcessingPayment || items.length === 0) {
        return;
      }
      
      setIsProcessingPayment(true);
      
      // Get user email if logged in
      const { data: { user } } = await supabase.auth.getUser();
      const email = user?.email;

      // Calculate total to ensure accuracy
      const calculatedTotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      console.log(`Proceeding to checkout with ${items.length} items and total: ${calculatedTotal.toFixed(2)}`);
      
      // Call our Supabase edge function to create a Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          items, 
          total: calculatedTotal,
          email 
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Redirect to Stripe checkout
      if (data.url) {
        // Store the total in localStorage as a backup
        localStorage.setItem('last_order_total', calculatedTotal.toString());
        
        // Redirect to the Stripe checkout page
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      toast({
        title: "Checkout Error",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      addItem,
      removeItem,
      updateQuantity,
      toggleCart,
      closeCart,
      total,
      savings,
      totalItems,
      freeShippingEligible,
      freeShippingMessage,
      proceedToCheckout,
      isProcessingPayment,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
