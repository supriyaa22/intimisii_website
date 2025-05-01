
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Shop from "./pages/Shop";
import FAQs from "./pages/FAQs";
import Testimonials from "./pages/Testimonials";
import ArticleDetail from "./pages/ArticleDetail";
import SensorySanctuaryArticle from "./pages/SensorySanctuaryArticle";
import LanguageOfScentArticle from "./pages/LanguageOfScentArticle";
import SustainableLuxuryArticle from "./pages/SustainableLuxuryArticle";
import IntimisiiMassageSpaCandlesArticle from "./pages/IntimisiiMassageSpaCandlesArticle";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import { CartProvider } from "./contexts/CartContext";
import { Cart } from "./components/Cart";
import { useEffect } from "react";
import { supabase } from "./integrations/supabase/client";

function App() {
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
    });

    // Load user from localStorage if exists
    const checkLocalStorage = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          console.log("User loaded from localStorage:", userData.email);
        } catch (err) {
          console.error("Error parsing user data from localStorage:", err);
          localStorage.removeItem("user"); // Remove invalid data
        }
      }
    };
    
    checkLocalStorage();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog/:slug" element={<ArticleDetail />} />
          <Route path="/blog/creating-a-sensory-sanctuary" element={<SensorySanctuaryArticle />} />
          <Route path="/blog/the-language-of-scent" element={<LanguageOfScentArticle />} />
          <Route path="/blog/sustainable-luxury-the-future-of-home-fragrance" element={<SustainableLuxuryArticle />} />
          <Route path="/blog/intimisii-massage-spa-candles-fragrance-and-skincare" element={<IntimisiiMassageSpaCandlesArticle />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancelled" element={<PaymentCancelled />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Cart />
        <Toaster />
      </Router>
    </CartProvider>
  );
}

export default App;
