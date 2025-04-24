
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PhilosophySection from "../components/PhilosophySection";
import CollectionSection from "../components/CollectionSection";
import YouTubeSection from "../components/YouTubeSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-darkbg">
      <Navbar />
      <Hero />
      <PhilosophySection />
      <CollectionSection />
      <YouTubeSection />
      <Footer />
    </div>
  );
};

export default Home;
