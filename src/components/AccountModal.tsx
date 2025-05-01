
import React, { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { ArrowLeft, ShoppingBag, MapPin, LogOut, Plus, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface Address {
  id: string;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
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
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState<Omit<Address, 'id'>>({
    name: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    isDefault: false,
  });

  const handleTabClick = (tab: TabType) => {
    if (tab === 'logout') {
      onLogout();
      onClose();
    } else {
      setActiveTab(tab);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNewAddress = () => {
    setAddressForm({
      name: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      isDefault: addresses.length === 0, // First address is default
    });
    setEditingAddressId(null);
    setShowAddressForm(true);
  };

  const handleEditAddress = (address: Address) => {
    setAddressForm({
      name: address.name,
      streetAddress: address.streetAddress,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
    });
    setEditingAddressId(address.id);
    setShowAddressForm(true);
  };

  const saveAddress = () => {
    if (editingAddressId) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddressId ? { ...addressForm, id: editingAddressId } : addr
      ));
    } else {
      // Add new address
      const newAddress = {
        ...addressForm,
        id: crypto.randomUUID(),
      };
      setAddresses([...addresses, newAddress]);
    }
    setShowAddressForm(false);
    setEditingAddressId(null);
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
                  className={`flex items-center gap-3 p-4 cursor-pointer mb-2 bg-[#F7EFE8] text-[#333333] ${activeTab === 'orders' ? 'font-medium' : 'hover:bg-[#F7EFE8]/90'}`}
                  onClick={() => handleTabClick('orders')}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Orders</span>
                </div>
                <div 
                  className={`flex items-center gap-3 p-4 cursor-pointer mb-2 bg-[#F7EFE8] text-[#333333] ${activeTab === 'address' ? 'font-medium' : 'hover:bg-[#F7EFE8]/90'}`}
                  onClick={() => handleTabClick('address')}
                >
                  <MapPin className="h-5 w-5" />
                  <span>Address</span>
                </div>
                <div 
                  className={`flex items-center gap-3 p-4 cursor-pointer mb-2 bg-[#F7EFE8] text-[#333333] hover:bg-[#F7EFE8]/90`}
                  onClick={() => handleTabClick('logout')}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </div>
              </div>
              
              {/* Content area */}
              <div className="md:col-span-3 bg-[#1A1A1A] p-4 min-h-[300px]">
                {/* User info */}
                <div className="mb-4 p-4 bg-[#F7EFE8] text-[#333333] rounded-sm">
                  <p className="text-sm">
                    Hello <span className="font-bold">{user.firstName}</span> {user.lastName}, {user.email}
                  </p>
                </div>
                
                {activeTab === 'orders' && (
                  <div>
                    <div className="mb-4 p-4 bg-[#F7EFE8] text-[#333333] rounded-sm">
                      <p className="text-sm">Order History:</p>
                    </div>
                    
                    <h3 className="text-gold uppercase text-sm font-semibold mt-6 mb-4">ORDERS</h3>
                    <div className="border-t border-[#333333] py-4">
                      <p className="text-center py-6 text-sm">You haven't placed any orders yet.</p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'address' && !showAddressForm && (
                  <div>
                    <div className="mb-4 p-4 bg-[#F7EFE8] text-[#333333] rounded-sm flex justify-between items-center">
                      <p className="text-sm">Shipping Addresses:</p>
                      <Button 
                        onClick={handleAddNewAddress}
                        className="bg-[#3A1B1F] hover:bg-[#4A2B2F] text-white text-xs py-1 px-3 flex items-center gap-1"
                      >
                        <Plus className="h-3 w-3" /> Add New Address
                      </Button>
                    </div>
                    
                    <h3 className="text-gold uppercase text-sm font-semibold mt-6 mb-4">SAVED ADDRESSES</h3>
                    <div className="border-t border-[#333333] py-4">
                      {addresses.length === 0 ? (
                        <div className="text-center py-6">
                          <p className="text-sm mb-4">You haven't saved any addresses yet.</p>
                          <Button 
                            onClick={handleAddNewAddress}
                            className="bg-[#3A1B1F] hover:bg-[#4A2B2F] text-white py-2 px-6 text-sm"
                          >
                            Add Address
                          </Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-4">
                          {addresses.map(address => (
                            <div key={address.id} className="bg-[#242424] p-4 border border-[#333333] rounded-sm">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{address.name}</h4>
                                <Button
                                  onClick={() => handleEditAddress(address)} 
                                  variant="ghost"
                                  size="sm"
                                  className="text-white hover:bg-[#333333] p-1 h-auto"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm text-gray-300">{address.streetAddress}</p>
                              <p className="text-sm text-gray-300">{address.city}, {address.state} {address.zipCode}</p>
                              <p className="text-sm text-gray-300">{address.country}</p>
                              {address.isDefault && (
                                <span className="text-xs bg-[#3A1B1F] text-white px-2 py-1 inline-block mt-2 rounded">
                                  Default Address
                                </span>
                              )}
                            </div>
                          ))}
                          <div className="text-center mt-2">
                            <Button 
                              onClick={handleAddNewAddress}
                              className="bg-transparent border border-[#333333] hover:bg-[#242424] text-white py-2 px-6 text-sm"
                            >
                              Add Another Address
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {activeTab === 'address' && showAddressForm && (
                  <div className="bg-[#1A1A1A] p-4">
                    <h3 className="text-gold uppercase text-sm font-semibold mb-4">
                      {editingAddressId ? 'EDIT ADDRESS' : 'ADD NEW ADDRESS'}
                    </h3>
                    <div className="border-t border-[#333333] pt-6">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 gap-2">
                          <label className="text-sm text-gray-300">Address Name (e.g., Home, Work)</label>
                          <Input 
                            name="name"
                            value={addressForm.name}
                            onChange={handleAddressChange}
                            className="bg-[#242424] border-[#333333] text-white"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 gap-2">
                          <label className="text-sm text-gray-300">Street Address</label>
                          <Textarea 
                            name="streetAddress"
                            value={addressForm.streetAddress}
                            onChange={handleAddressChange}
                            className="bg-[#242424] border-[#333333] text-white min-h-[80px]"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid grid-cols-1 gap-2">
                            <label className="text-sm text-gray-300">City</label>
                            <Input 
                              name="city"
                              value={addressForm.city}
                              onChange={handleAddressChange}
                              className="bg-[#242424] border-[#333333] text-white"
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            <label className="text-sm text-gray-300">State</label>
                            <Input 
                              name="state"
                              value={addressForm.state}
                              onChange={handleAddressChange}
                              className="bg-[#242424] border-[#333333] text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid grid-cols-1 gap-2">
                            <label className="text-sm text-gray-300">Zip Code</label>
                            <Input 
                              name="zipCode"
                              value={addressForm.zipCode}
                              onChange={handleAddressChange}
                              className="bg-[#242424] border-[#333333] text-white"
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            <label className="text-sm text-gray-300">Country</label>
                            <Input 
                              name="country"
                              value={addressForm.country}
                              onChange={handleAddressChange}
                              className="bg-[#242424] border-[#333333] text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-between mt-4">
                          <Button 
                            onClick={() => setShowAddressForm(false)}
                            className="bg-transparent hover:bg-[#242424] border border-[#333333] text-white"
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={saveAddress}
                            className="bg-[#3A1B1F] hover:bg-[#4A2B2F] text-white"
                          >
                            Save Address
                          </Button>
                        </div>
                      </div>
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
