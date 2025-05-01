
import React, { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { ArrowLeft, ShoppingBag, MapPin, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData | null;
  onLogout: () => void;
}

type TabType = 'orders' | 'address' | 'logout';

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('orders');

  const handleTabClick = (tab: TabType) => {
    if (tab === 'logout') {
      onLogout();
      onClose();
    } else {
      setActiveTab(tab);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-none max-w-4xl mx-auto bg-transparent">
        <div className="bg-[#151515] text-white min-h-[500px]">
          {/* Header */}
          <div className="bg-[#151515] p-4 border-b border-[#333333]">
            <button 
              onClick={onClose} 
              className="text-white hover:text-[#C9AD7E] transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
          
          {/* Main content */}
          <div className="p-8">
            <h2 className="text-2xl uppercase mb-4 text-center font-serif tracking-wider">YOUR ACCOUNT</h2>
            <p className="text-center text-sm mb-8">View all your orders and manage your account information.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Navigation sidebar */}
              <div className="md:col-span-1">
                <div 
                  className={`flex items-center gap-3 p-4 cursor-pointer mb-2 ${activeTab === 'orders' ? 'bg-[#1E1E1E]' : 'bg-[#242424] hover:bg-[#1E1E1E]'}`}
                  onClick={() => handleTabClick('orders')}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Orders</span>
                </div>
                <div 
                  className={`flex items-center gap-3 p-4 cursor-pointer mb-2 ${activeTab === 'address' ? 'bg-[#1E1E1E]' : 'bg-[#242424] hover:bg-[#1E1E1E]'}`}
                  onClick={() => handleTabClick('address')}
                >
                  <MapPin className="h-5 w-5" />
                  <span>Address</span>
                </div>
                <div 
                  className={`flex items-center gap-3 p-4 cursor-pointer mb-2 bg-[#242424] hover:bg-[#1E1E1E]`}
                  onClick={() => handleTabClick('logout')}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </div>
              </div>
              
              {/* Content area */}
              <div className="md:col-span-3 bg-[#1A1A1A] p-4 min-h-[300px]">
                {/* User info */}
                <div className="mb-4 p-4 bg-[#242424]">
                  <p className="text-sm">
                    Hello <span className="font-bold">{user.firstName}</span> {user.lastName}, {user.email}
                  </p>
                </div>
                
                {activeTab === 'orders' && (
                  <div>
                    <div className="mb-4 p-4 bg-[#242424]">
                      <p className="text-sm">Order History:</p>
                    </div>
                    
                    <h3 className="text-gold uppercase text-sm font-semibold mt-6 mb-4">ORDERS</h3>
                    <div className="border-t border-[#333333] py-4">
                      <p className="text-center py-6 text-sm">You haven't placed any orders yet.</p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'address' && (
                  <div>
                    <h3 className="text-gold uppercase text-sm font-semibold mt-6 mb-4">ADDRESS</h3>
                    <div className="border-t border-[#333333] py-4">
                      <p className="text-center py-6 text-sm">No saved addresses.</p>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex justify-center">
                  <Link 
                    to="/shop" 
                    onClick={onClose}
                    className="bg-[#3A1B1F] hover:bg-[#4A2B2F] text-white py-3 px-8 uppercase text-sm tracking-wider transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountModal;
