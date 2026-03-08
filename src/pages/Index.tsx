import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoGrid from "@/components/VideoGrid";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <VideoGrid />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
