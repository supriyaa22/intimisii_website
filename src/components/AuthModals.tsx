
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthModalsProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModals: React.FC<AuthModalsProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const switchView = (newView: "login" | "signup") => {
    setView(newView);
    // Clear form fields when switching views
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Query the auth_users table to find the user
      const { data, error } = await supabase
        .from("auth_users")
        .select("*")
        .eq("email", email)
        .single();
      
      if (error || !data) {
        toast({
          title: "❌ Username not found or password incorrect.",
          variant: "destructive",
        });
        return;
      }
      
      // Simple password check (in a real app, you'd use proper password hashing)
      if (data.password === password) {
        // Store user session in localStorage
        localStorage.setItem("user", JSON.stringify({
          id: data.id,
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name
        }));
        
        toast({
          title: "✅ Successfully logged in.",
          className: "bg-green-500/80 text-white",
        });
        
        onClose();
        window.dispatchEvent(new Event("userLogin"));
      } else {
        toast({
          title: "❌ Username not found or password incorrect.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "❌ An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!email || !password || !firstName || !lastName) {
      toast({
        title: "❌ Please fill in all fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      // Check if user with this email already exists
      const { data: existingUser } = await supabase
        .from("auth_users")
        .select("email")
        .eq("email", email)
        .single();
      
      if (existingUser) {
        toast({
          title: "❌ Email already in use.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Insert new user
      const { error } = await supabase
        .from("auth_users")
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            email,
            password // In a real app, you'd hash this password
          }
        ]);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "✅ Account created. Please login.",
        className: "bg-green-500/80 text-white",
      });
      
      // Switch to login view
      switchView("login");
    } catch (error) {
      toast({
        title: "❌ An error occurred during signup.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

                <form onSubmit={handleLogin} className="w-full space-y-4">
                  <div className="w-full">
                    <Input 
                      type="email" 
                      placeholder="E-mail" 
                      className="bg-[#f5f5f1] border-none text-[#3A1B1F] h-12"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="w-full relative">
                    <Input 
                      type="password" 
                      placeholder="Password" 
                      className="bg-[#f5f5f1] border-none text-[#3A1B1F] h-12"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <button 
                      type="button"
                      className="text-[#3A1B1F] text-sm absolute right-3 top-1/2 transform -translate-y-1/2 hover:underline"
                    >
                      Forgot your password?
                    </button>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#3A1B1F] text-white py-3 text-sm uppercase tracking-wider hover:bg-[#3A1B1F]/90 transition-colors disabled:opacity-70"
                    disabled={isLoading}
                  >
                    {isLoading ? "LOGGING IN..." : "LOGIN"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <span className="text-[#3A1B1F]">Don't have an account? </span>
                  <button 
                    className="text-[#3A1B1F] font-medium hover:underline" 
                    onClick={() => switchView("signup")}
                    disabled={isLoading}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <h2 className="text-[#3A1B1F] text-2xl font-serif mb-4 tracking-wide uppercase">SIGN UP</h2>
                <p className="text-[#3A1B1F] mb-8 text-center">Please fill in the information below:</p>

                <form onSubmit={handleSignup} className="w-full space-y-4">
                  <div className="w-full">
                    <Input 
                      type="text" 
                      placeholder="First Name" 
                      className="bg-[#f5f5f1] border-none text-[#3A1B1F] h-12"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="w-full">
                    <Input 
                      type="text" 
                      placeholder="Last Name" 
                      className="bg-[#f5f5f1] border-none text-[#3A1B1F] h-12"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="w-full">
                    <Input 
                      type="email" 
                      placeholder="E-mail" 
                      className="bg-[#f5f5f1] border-none text-[#3A1B1F] h-12"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="w-full">
                    <Input 
                      type="password" 
                      placeholder="Password" 
                      className="bg-[#f5f5f1] border-none text-[#3A1B1F] h-12"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#3A1B1F] text-white py-3 text-sm uppercase tracking-wider hover:bg-[#3A1B1F]/90 transition-colors disabled:opacity-70"
                    disabled={isLoading}
                  >
                    {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <span className="text-[#3A1B1F]">Already have an account? </span>
                  <button 
                    className="text-[#3A1B1F] font-medium hover:underline" 
                    onClick={() => switchView("login")}
                    disabled={isLoading}
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
