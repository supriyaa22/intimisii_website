
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShoppingBag, XCircle } from 'lucide-react';

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20 flex items-center justify-center bg-[#f5eee9]">
        <div className="max-w-md mx-auto p-8 bg-white rounded-md shadow-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <XCircle className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="font-serif text-3xl mb-4">Payment Cancelled</h1>
          <p className="text-gray-600 mb-8">
            Your payment was cancelled. Your cart items have been saved if you'd like to try again.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/shop')}
              className="w-full bg-gray-200 text-gray-800 py-3 flex items-center justify-center gap-2 mb-4"
            >
              <ShoppingBag className="h-4 w-4" />
              RETURN TO SHOP
            </button>
            <button
              onClick={() => {
                const cart = document.querySelector('[data-testid="cart-trigger"]');
                if (cart) {
                  (cart as HTMLButtonElement).click();
                } else {
                  // Fallback if we can't find the cart button
                  window.history.back();
                }
              }}
              className="w-full bg-[#3A1B1F] text-white py-3 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              RETURN TO CART
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentCancelled;
