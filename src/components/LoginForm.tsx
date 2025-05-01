
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
      
      // Use Supabase Auth signIn method
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password.trim()
      });

      if (authError) {
        console.error("Authentication error:", authError);
        
        // Handle specific error cases
        if (authError.message.includes("Email not confirmed")) {
          setError("Please check your email and confirm your account before logging in.");
        } else if (authError.message.includes("Invalid login credentials")) {
          setError("Invalid email or password");
        } else {
          setError(`Error: ${authError.message}`);
        }
        
        setIsLoading(false);
        return;
      }

      // If we get here, authentication was successful
      console.log("Login successful:", data);

      // Get user profile details from the users table
      const { data: userData, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email.trim().toLowerCase())
        .maybeSingle();

      if (profileError) {
        console.error("Error fetching user profile:", profileError);
      }

      // Store user session in localStorage
      localStorage.setItem("user", JSON.stringify({
        id: data.user?.id,
        email: data.user?.email,
        firstName: userData?.first_name || "",
        lastName: userData?.last_name || ""
      }));
      
      toast({
        title: "✅ Successfully logged in.",
        className: "bg-green-500/80 text-white",
      });
      
      onClose();
      window.dispatchEvent(new Event("userLogin"));
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to resend confirmation email
  const handleResendConfirmation = async () => {
    if (!email.trim()) {
      setError("Please enter your email address first");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim().toLowerCase(),
      });
      
      if (error) {
        console.error("Error resending confirmation:", error);
        setError(`Failed to resend: ${error.message}`);
      } else {
        toast({
          title: "✅ Confirmation email sent",
          description: "Please check your inbox for the confirmation link",
          className: "bg-green-500/80 text-white",
        });
      }
    } catch (err) {
      console.error("Resend error:", err);
      setError("Failed to resend confirmation email");
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
            {error.includes("confirm your account") && (
              <button 
                onClick={handleResendConfirmation}
                className="ml-2 underline hover:text-red-700"
                disabled={isLoading}
              >
                Resend confirmation
              </button>
            )}
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
