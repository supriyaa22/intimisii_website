
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "./ui/dialog";
import { Input } from "./ui/input";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "./ui/alert";

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
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const switchView = (newView: "login" | "signup") => {
    setView(newView);
    // Clear form fields when switching views
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setError(null);
  };

  const validateSignupForm = () => {
    if (!firstName.trim()) {
      setError("First name is required");
      return false;
    }
    
    if (!lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      console.log("Attempting login with email:", email.trim());
      
      // Query the users table to find the user
      const { data, error: queryError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email.trim())
        .maybeSingle();
      
      console.log("Query result:", { data, queryError });
      
      if (queryError) {
        console.error("Database query error:", queryError);
        setError("❌ An error occurred during login");
        setIsLoading(false);
        return;
      }
      
      // Check if user exists
      if (!data) {
        console.log("No user found with email:", email.trim());
        setError("❌ Invalid email or password");
        setIsLoading(false);
        return;
      }
      
      console.log("Found user:", { 
        id: data.id,
        email: data.email,
        passwordMatch: data.password === password
      });
      
      // Compare passwords (in a real app, you'd use proper password hashing)
      if (data.password === password) {
        console.log("Password match, login successful");
        
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
        console.log("Password mismatch");
        setError("❌ Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate form fields
    if (!validateSignupForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if user with this email already exists
      const { data: existingUser, error: checkError } = await supabase
        .from("users")
        .select("email")
        .eq("email", email)
        .single();
      
      if (checkError) {
        if (checkError.code !== 'PGRST116') { // PGRST116 is "No rows returned" error
          console.error("Error checking for existing user:", checkError);
          setError(`Database error: ${checkError.message}`);
          setIsLoading(false);
          return;
        }
        // If we get here, it means no user with this email exists, which is what we want
      } else if (existingUser) {
        // User with this email already exists
        setError("Email already in use");
        setIsLoading(false);
        return;
      }
      
      // Insert new user
      const { error: insertError } = await supabase
        .from("users")
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            email,
            password // In a real app, you'd hash this password
          }
        ]);
      
      if (insertError) {
        console.error("Error inserting user:", insertError);
        
        if (insertError.code === '23505') { // Unique violation
          setError("Email already in use");
        } else if (insertError.message.includes("new row violates row-level security policy")) {
          setError("Permission denied: Unable to create account");
          console.error("RLS Policy violation:", insertError);
        } else {
          setError(`Error creating account: ${insertError.message}`);
        }
        
        return;
      }
      
      toast({
        title: "✅ Account created. Please login.",
        className: "bg-green-500/80 text-white",
      });
      
      // Switch to login view
      switchView("login");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(`An unexpected error occurred: ${err.message}`);
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

            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-100 border-red-400">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {view === "login" ? (
              <div className="flex flex-col items-center">
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
