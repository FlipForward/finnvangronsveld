import Navigation from "@/components/Navigation";
import PhotoGallery from "@/components/PhotoGallery";

const Portfolio = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation />
      <div className="pt-32 px-6 md:px-12 lg:px-16">
        <h1 className="text-4xl md:text-6xl font-anton text-hero-accent mb-8">PORTFOLIO</h1>
        <p className="text-foreground/70 text-lg mb-12">
          Explore my creative work across IT projects, music production, and photography.
        </p>
      </div>
      <PhotoGallery />
    </div>
  );
};

export default Portfolio;
