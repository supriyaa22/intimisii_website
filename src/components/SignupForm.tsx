
import React, { useState } from "react";
import { Input } from "./ui/input";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "./ui/alert";

interface SignupFormProps {
  switchView: (view: "login") => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ switchView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate form fields
    if (!validateSignupForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First, create the auth user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: password.trim(),
        options: {
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim()
          }
        }
      });
      
      if (authError) {
        console.error("Authentication error:", authError);
        
        if (authError.message.includes("already registered")) {
          setError("Email already in use");
        } else {
          setError(`Error creating account: ${authError.message}`);
        }
        
        setIsLoading(false);
        return;
      }
      
      // Now insert the user profile into the users table
      const { error: insertError } = await supabase
        .from("users")
        .insert([
          {
            id: authData.user?.id,
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            email: email.trim().toLowerCase(),
            password: password.trim() // In a real app, you'd hash this password
          }
        ]);
      
      if (insertError) {
        console.error("Error inserting user profile:", insertError);
        
        // If there's an error creating the profile, attempt to clean up the auth user
        if (authData.user) {
          await supabase.auth.admin.deleteUser(authData.user.id);
        }
        
        if (insertError.code === '23505') { // Unique violation
          setError("Email already in use");
        } else {
          setError(`Error creating account: ${insertError.message}`);
        }
        
        setIsLoading(false);
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
  );
};

export default SignupForm;
