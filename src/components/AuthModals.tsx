
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { ArrowLeft } from "lucide-react";

interface AuthModalsProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModals: React.FC<AuthModalsProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<"login" | "signup">("login");

  const switchView = (newView: "login" | "signup") => {
    setView(newView);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-none bg-transparent max-w-md mx-auto">
        <div className="bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className="bg-[#C9AD7E]/90 p-8 relative">
            <button 
              onClick={onClose} 
              className="absolute left-4 top-4 text-[#3A1B1F] hover:text-[#3A1B1F]/70 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {view === "login" ? (
              <div className="flex flex-col items-center">
                <h2 className="text-[#3A1B1F] text-2xl font-serif mb-4 tracking-wide uppercase">LOGIN</h2>
                <p className="text-[#3A1B1F] mb-8 text-center">Enter your email and password to login:</p>

                <div className="w-full space-y-4">
                  <div className="w-full">
                    <Input 
                      type="email" 
                      placeholder="E-mail" 
                      className="bg-[#f5f5f1] border-none text-[#3A1B1F] h-12"
                    />
                  </div>

                  <div className="w-full relative">
                    <Input 
                      type="password" 
                      placeholder="Password" 
                      className="bg-[#f5f5f1] border-none text-[#3A1B1F] h-12"
                    />
                    <button 
                      className="text-[#3A1B1F] text-sm absolute right-3 top-1/2 transform -translate-y-1/2 hover:underline"
                    >
                      Forgot your password?
                    </button>
                  </div>

                  <button 
                    className="w-full bg-[#3A1B1F] text-white py-3 text-sm uppercase tracking-wider hover:bg-[#3A1B1F]/90 transition-colors"
                  >
                    LOGIN
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <span className="text-[#3A1B1F]">Don't have an account? </span>
                  <button 
                    className="text-[#3A1B1F] font-medium hover:underline" 
                    onClick={() => switchView("signup")}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <h2 className="text-[#3A1B1F] text-2xl font-serif mb-4 tracking-wide uppercase">SIGN UP</h2>
                <p className="text-[#3A1B1F] mb-8 text-center">Please fill in the information below:</p>

                <div className="w-full space-y-4">
                  <div className="w-full">
                    <Input 
                      type="text" 
                      placeholder="First Name" 
                      className="bg-[#f5f5f1] border-none text-[#3A1B1F] h-12"
                    />
                  </div>

                  <div className="w-full">
                    <Input 
                      type="text" 
                      placeholder="Last Name" 
                      className="bg-[#f5f5f1] border-none text-[#3A1B1F] h-12"
                    />
                  </div>

                  <div className="w-full">
                    <Input 
                      type="email" 
                      placeholder="E-mail" 
                      className="bg-[#f5f5f1] border-none text-[#3A1B1F] h-12"
                    />
                  </div>

                  <div className="w-full">
                    <Input 
                      type="password" 
                      placeholder="Password" 
                      className="bg-[#f5f5f1] border-none text-[#3A1B1F] h-12"
                    />
                  </div>

                  <button 
                    className="w-full bg-[#3A1B1F] text-white py-3 text-sm uppercase tracking-wider hover:bg-[#3A1B1F]/90 transition-colors"
                  >
                    CREATE ACCOUNT
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <span className="text-[#3A1B1F]">Already have an account? </span>
                  <button 
                    className="text-[#3A1B1F] font-medium hover:underline" 
                    onClick={() => switchView("login")}
                  >
                    Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModals;
