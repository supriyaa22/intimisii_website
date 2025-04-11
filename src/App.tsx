
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import "./App.css";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
