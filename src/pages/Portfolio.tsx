import Navigation from "@/components/Navigation";
import PhotoGallery from "@/components/PhotoGallery";

const Portfolio = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation />
      <div className="pt-32 px-6 md:px-12 lg:px-16 pb-8">
        <h1 className="text-4xl md:text-6xl font-anton text-hero-accent mb-4">PORTFOLIO</h1>
        <p className="text-foreground/70 text-lg">
          A visual journey through my photography work — moments captured, stories told.
        </p>
      </div>
      <PhotoGallery />
    </div>
  );
};

export default Portfolio;
