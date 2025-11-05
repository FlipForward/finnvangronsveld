import Navigation from "@/components/Navigation";

const Studio = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation />
      <div className="pt-32 px-6 md:px-12 lg:px-16">
        <h1 className="text-4xl md:text-6xl font-anton text-hero-accent mb-8">STUDIO</h1>
        <p className="text-muted-soft">About the studio coming soon...</p>
      </div>
    </div>
  );
};

export default Studio;
