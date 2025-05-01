
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "./ui/dialog";
import { ArrowLeft } from "lucide-react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

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
              aria-label="Close"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            
            <DialogTitle className="text-center text-[#3A1B1F] text-2xl font-serif mb-4 tracking-wide uppercase">
              {view === "login" ? "LOGIN" : "SIGN UP"}
            </DialogTitle>
            <DialogDescription className="text-center text-[#3A1B1F] mb-8">
              {view === "login" 
                ? "Enter your email and password to login:" 
                : "Please fill in the information below:"
              }
            </DialogDescription>

            {view === "login" ? (
              <LoginForm 
                onClose={onClose}
                switchView={() => switchView("signup")}
              />
            ) : (
              <SignupForm 
                switchView={() => switchView("login")} 
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModals;
