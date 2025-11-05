import { useEffect, useState } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 overflow-hidden pt-20 md:pt-32">
      {/* Wordmark container */}
      <div className="relative">
        {/* Top rule */}
        <div 
          className={`w-full h-[2px] bg-hero-accent mb-3 md:mb-4 origin-center ${
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
            className="font-anton text-hero-accent uppercase leading-[0.85] tracking-[-0.03em] mb-4 md:mb-6"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 10rem)',
            }}
          >
            FINN
          </h1>

          {/* VANGRONSVELD - dominant line */}
          <h1 
            className="font-anton text-hero-accent uppercase leading-[0.85] tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(3rem, 16vw, 16rem)',
            }}
          >
            VANGRONSVELD
          </h1>
        </div>

        {/* Bottom rule */}
        <div 
          className={`w-full h-[2px] bg-hero-accent mt-3 md:mt-4 origin-center ${
            isLoaded ? 'animate-rule-draw' : 'scale-x-0'
          }`}
          style={{ animationDelay: '0.4s' }}
        />

        {/* Micro labels below rules */}
        <div 
          className={`flex justify-between gap-4 mt-4 opacity-0 ${isLoaded ? 'animate-hero-fade-up' : ''}`}
          style={{ animationDelay: '0.6s' }}
        >
          <span className="text-[10px] md:text-xs text-hero-accent/60 uppercase tracking-wider">
            IT STUDENT
          </span>
          <span className="text-[10px] md:text-xs text-hero-accent/60 uppercase tracking-wider">
            DJ + PRODUCER
          </span>
          <span className="text-[10px] md:text-xs text-hero-accent/60 uppercase tracking-wider">
            STREAMER
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
