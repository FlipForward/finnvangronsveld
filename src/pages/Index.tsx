import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import PhotoGallery from "@/components/PhotoGallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AudioWave from "@/components/AudioWave";

const Index = () => {
  return (
    <div className="bg-background text-foreground">
      <AudioWave />
      <Navigation />
      <div id="hero">
        <Hero />
      </div>
      <AboutSection />
      <div id="portfolio-section">
        <PhotoGallery />
      </div>
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
