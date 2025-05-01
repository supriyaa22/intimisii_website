
import React, { useState } from "react";
import { Input } from "./ui/input";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "./ui/alert";

interface LoginFormProps {
  onClose: () => void;
  switchView: (view: "signup") => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, switchView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      console.log("Attempting login with email:", email.trim());
      
      // Check for empty fields first
      if (!email.trim() || !password.trim()) {
        setError("Email and password are required");
        setIsLoading(false);
        return;
      }
      
      // Enable debug mode for this query to see full response
      const { data, error: queryError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email.trim())
        .limit(1);
      
      console.log("Query result:", { data, queryError });
      
      if (queryError) {
        console.error("Database query error:", queryError);
        setError("An error occurred during login");
        setIsLoading(false);
        return;
      }
      
      // Check if any users were found
      if (!data || data.length === 0) {
        console.log("No user found with email:", email.trim());
        setError("No account found with this email address");
        setIsLoading(false);
        return;
      }
      
      const user = data[0];
      console.log("Found user:", { 
        id: user.id,
        email: user.email,
        passwordMatch: user.password === password
      });
      
      // Compare passwords (in a real app, you'd use proper password hashing)
      if (user.password === password) {
        console.log("Password match, login successful");
        
        // Store user session in localStorage
        localStorage.setItem("user", JSON.stringify({
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name
        }));
        
        toast({
          title: "✅ Successfully logged in.",
          className: "bg-green-500/80 text-white",
        });
        
        onClose();
        window.dispatchEvent(new Event("userLogin"));
      } else {
        console.log("Password mismatch");
        setError("Email found, but password is incorrect");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {error && (
        <Alert variant="destructive" className="mb-4 bg-red-100 border-red-400">
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

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
  );
};

export default LoginForm;
