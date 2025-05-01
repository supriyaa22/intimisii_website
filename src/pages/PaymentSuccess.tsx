
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShoppingBag, CheckCircle2, ExternalLink } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/use-toast';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Clear cart items after successful payment
    if (sessionId) {
      clearCart();
      toast({
        title: "Order Successful",
        description: "Thank you for your purchase! Your order has been successfully processed.",
        variant: "default",
      });
    }
  }, [sessionId, clearCart, toast]);

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
