import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import VideoGrid from "@/components/VideoGrid";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <VideoGrid />
      <ReviewsSection />
      <Footer />
      <Footer />
    </div>
  );
};

export default Index;
