import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <Hero />
      <AboutSection />
    </div>
  );
};

export default Index;
