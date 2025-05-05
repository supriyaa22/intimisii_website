
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShoppingBag, CheckCircle2, Loader2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const totalFromUrl = searchParams.get('total');
  const { clearCart } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [orderProcessed, setOrderProcessed] = useState(false);

  useEffect(() => {
    // Check if this page was already processed (to prevent duplicate processing on refresh)
    const processedSessions = JSON.parse(localStorage.getItem('processedSessions') || '[]');
    const alreadyProcessed = processedSessions.includes(sessionId);

    if (sessionId && !alreadyProcessed && !orderProcessed) {
      setIsLoading(true);
      
      // Clear the cart since payment was successful
      clearCart();
      
      // Add this session to processed sessions in localStorage
      const updatedSessions = [...processedSessions, sessionId];
      localStorage.setItem('processedSessions', JSON.stringify(updatedSessions));
      
      // Show success toast
      toast({
        title: "Payment Successful",
        description: "Thank you for your purchase! Your order has been successfully processed.",
        variant: "default",
      });
      
      // The order creation is now handled by the webhook, so we just need to mark as processed
      setOrderProcessed(true);
      setIsLoading(false);
    } else {
      // If already processed or no session ID, just clear loading state
      setIsLoading(false);
    }
  }, [sessionId, clearCart, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20 flex items-center justify-center bg-[#f5eee9]">
        <div className="max-w-md mx-auto p-8 bg-white rounded-md shadow-md text-center">
          {isLoading ? (
            <div className="text-center py-8">
              <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-[#3A1B1F]" />
              <p className="text-gray-600">Processing your order...</p>
            </div>
          ) : (
            <>
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
                    {totalFromUrl && (
                      <div className="mt-2">
                        Total: ${parseFloat(totalFromUrl).toFixed(2)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
