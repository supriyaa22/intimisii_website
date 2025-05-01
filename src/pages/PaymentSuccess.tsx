
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();

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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
