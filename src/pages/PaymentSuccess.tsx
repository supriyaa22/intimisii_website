
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';

// Local storage key to track processed session IDs
const PROCESSED_SESSIONS_KEY = 'intimisii_processed_sessions';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const orderTotal = searchParams.get('order_total');
  const { items, clearCart } = useCart();
  const { toast } = useToast();
  const [orderProcessed, setOrderProcessed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Only process the order once per component lifecycle
  const processedRef = React.useRef(false);
  
  useEffect(() => {
    // Only proceed if we have a valid session ID
    if (!sessionId) {
      console.log("No session ID found, redirecting to shop");
      navigate('/shop');
      return;
    }
    
    // Check if this session has already been processed in local storage
    const processedSessions = JSON.parse(localStorage.getItem(PROCESSED_SESSIONS_KEY) || '[]');
    if (processedSessions.includes(sessionId)) {
      console.log(`Session ${sessionId} already processed according to local storage`);
      setOrderProcessed(true);
      return;
    }
    
    // Only process if we haven't processed in this component lifecycle
    if (processedRef.current) {
      console.log(`Session ${sessionId} already processed in this lifecycle`);
      return;
    }
    
    // Mark as processed immediately to prevent duplicate runs
    processedRef.current = true;
    
    const saveOrderToDatabase = async () => {
      try {
        setIsProcessing(true);
        
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
        
        console.log('Checking for existing order with session ID:', sessionId);
        
        // First check if this session ID already exists to prevent duplicates
        const { data, error } = await supabase
          .from('orders')
          .select('id')
          .eq('stripe_session_id', sessionId);
          
        if (error) {
          console.error('Error checking for existing order:', error);
          throw error;
        }
        
        // If order already exists, just show success and return
        if (data && data.length > 0) {
          console.log('Order already exists for this session:', data[0].id);
          setOrderProcessed(true);
          
          // Add this session to processed sessions in local storage
          localStorage.setItem(
            PROCESSED_SESSIONS_KEY, 
            JSON.stringify([...processedSessions, sessionId])
          );
          
          clearCart();
          return;
        }
        
        console.log('No existing order found, creating new order with total:', total);
        
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
        
        if (orderItems.length > 0) {
          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);
            
          if (itemsError) {
            throw itemsError;
          }
        }
        
        console.log('Order saved successfully:', orderData.id);
        setOrderProcessed(true);
        
        // Add this session to processed sessions in local storage
        localStorage.setItem(
          PROCESSED_SESSIONS_KEY, 
          JSON.stringify([...processedSessions, sessionId])
        );
        
        // Show toast only once after successful save
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
        setIsProcessing(false);
      }
    };
    
    saveOrderToDatabase();
    
    // No dependencies to prevent re-running
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
