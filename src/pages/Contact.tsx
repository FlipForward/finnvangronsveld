import Navigation from "@/components/Navigation";

const Contact = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation />
      <div className="pt-32 px-6 md:px-12 lg:px-16">
        <h1 className="text-4xl md:text-6xl font-anton text-hero-accent mb-8">CONTACT</h1>
        <p className="text-muted-soft">Get in touch...</p>
      </div>
    </div>
  );
};

export default Contact;
