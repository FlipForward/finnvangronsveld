import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-8xl font-anton text-hero-accent">404</h1>
          <p className="mb-4 text-xl text-muted-soft">Pagina niet gevonden</p>
          <a href="/" className="text-accent underline underline-offset-4 hover:text-accent/80 transition-colors">
            Terug naar home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
