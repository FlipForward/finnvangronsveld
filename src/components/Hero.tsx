import { useEffect, useState } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* Top right blurb */}
      <div className="absolute top-32 right-6 md:right-12 lg:right-16 max-w-[28ch] text-right">
        <p className="text-sm md:text-base text-muted-soft leading-relaxed">
          Al meer dan 20 jaar helpen wij merken te definiëren wat hen bijzonder maakt en brengen dit tot uiting in digitale merkbelevingen.
        </p>
      </div>

      {/* Wordmark container */}
      <div className="relative">
        {/* Top rule */}
        <div 
          className={`w-full h-[1px] bg-hero-accent mb-8 md:mb-12 origin-center ${
            isLoaded ? 'animate-rule-draw' : 'scale-x-0'
          }`}
          style={{ animationDelay: '0.3s' }}
        />

        {/* Wordmark */}
        <div 
          className={`opacity-0 ${isLoaded ? 'animate-hero-fade-up' : ''}`}
          style={{ animationDelay: '0.1s' }}
        >
          {/* FINN - smaller line */}
          <h1 
            className="font-anton text-hero-accent uppercase leading-[0.85] tracking-[-0.02em] mb-2"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
            }}
          >
            FINN
          </h1>

          {/* VANGRONSVELD - dominant line */}
          <h1 
            className="font-anton text-hero-accent uppercase leading-[0.85] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(2.5rem, 14vw, 13rem)',
            }}
          >
            VANGRONSVELD
          </h1>
        </div>

        {/* Bottom rule */}
        <div 
          className={`w-full h-[1px] bg-hero-accent mt-8 md:mt-12 origin-center ${
            isLoaded ? 'animate-rule-draw' : 'scale-x-0'
          }`}
          style={{ animationDelay: '0.4s' }}
        />

        {/* Micro labels below rules */}
        <div 
          className={`flex justify-between mt-4 opacity-0 ${isLoaded ? 'animate-hero-fade-up' : ''}`}
          style={{ animationDelay: '0.6s' }}
        >
          <span className="text-[10px] md:text-xs text-hero-accent/60 uppercase tracking-wider">
            WIJ ZIJN DE JONGENS
          </span>
          <span className="text-[10px] md:text-xs text-hero-accent/60 uppercase tracking-wider">
            WIJ MAKEN MERKEN
          </span>
          <span className="text-[10px] md:text-xs text-hero-accent/60 uppercase tracking-wider hidden md:inline">
            WIJ HOUDEN VAN DIGITAAL
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
