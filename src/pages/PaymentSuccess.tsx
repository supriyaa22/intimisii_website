
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShoppingBag, CheckCircle2, ExternalLink } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const orderTotal = searchParams.get('order_total');
  const { items, clearCart } = useCart();
  const { toast } = useToast();
  const [orderProcessed, setOrderProcessed] = useState(false);

  useEffect(() => {
    // Only process the order once and only if we have a valid session ID
    if (sessionId && !orderProcessed && items.length > 0) {
      const saveOrderToDatabase = async () => {
        try {
          setOrderProcessed(true); // Mark as processed immediately to prevent duplicate calls
          
          // Get current user
          const { data: { user } } = await supabase.auth.getUser();
          
          if (!user) {
            console.log("User not authenticated, order will not be saved to account");
            clearCart();
            return;
          }
          
          // Use the total passed from the URL, or calculate from cart items if not available
          const total = orderTotal 
            ? parseFloat(orderTotal)
            : items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          
          // Check if an order with this session ID already exists
          const { data: existingOrder } = await supabase
            .from('orders')
            .select('id')
            .eq('stripe_session_id', sessionId)
            .single();
            
          if (existingOrder) {
            console.log('Order already exists for this session:', existingOrder.id);
            
            // Show success toast
            toast({
              title: "Order Successful",
              description: "Thank you for your purchase! Your order has been successfully processed.",
              variant: "default",
            });
            
            clearCart();
            return;
          }
          
          // Create order record
          const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert([
              { 
                user_id: user.id,
                total_amount: total,
                stripe_session_id: sessionId
              }
            ])
            .select()
            .single();
            
          if (orderError) {
            throw orderError;
          }
          
          // Create order items records
          const orderItems = items.map(item => ({
            order_id: orderData.id,
            product_name: item.product.name,
            quantity: item.quantity,
            price: item.product.price
          }));
          
          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);
            
          if (itemsError) {
            throw itemsError;
          }
          
          console.log('Order saved successfully:', orderData.id);
          
          // Show success toast
          toast({
            title: "Order Successful",
            description: "Thank you for your purchase! Your order has been successfully processed and saved to your account.",
            variant: "default",
          });
          
        } catch (error) {
          console.error('Error saving order:', error);
          toast({
            title: "Order Processed",
            description: "Your payment was successful, but we couldn't save your order details. Please contact support.",
            variant: "destructive",
          });
        } finally {
          clearCart();
        }
      };
      
      saveOrderToDatabase();
    }
  }, [sessionId, clearCart, toast, items, orderProcessed, orderTotal]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20 flex items-center justify-center bg-[#f5eee9]">
        <div className="max-w-md mx-auto p-8 bg-white rounded-md shadow-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="font-serif text-3xl mb-4">Payment Successful</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase! Your order has been successfully processed.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/shop')}
              className="w-full bg-[#3A1B1F] text-white py-3 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              CONTINUE SHOPPING
            </button>
            {sessionId && (
              <div className="text-sm text-gray-500 mt-4">
                Order ID: {sessionId.substring(0, 12)}...
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
