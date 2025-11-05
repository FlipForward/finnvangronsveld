import { useEffect, useState } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after loading screen completes (2800ms)
    const timer = setTimeout(() => setIsLoaded(true), 2900);
    return () => clearTimeout(timer);
  }, []);

  const finn = "FINN";
  const vangronsveld = "VANGRONSVELD";

  return (
    <section 
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 overflow-hidden pt-32 md:pt-40"
    >
      {/* Wordmark container */}
      <div className="relative">
        {/* Top rule */}
        <div 
          className={`w-full h-[2px] bg-hero-accent mb-6 md:mb-8 origin-center ${
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
            className="font-anton text-hero-accent uppercase leading-[0.85] tracking-[-0.03em] mb-6 md:mb-8"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 10rem)',
            }}
          >
            {finn}
          </h1>

          {/* VANGRONSVELD - dominant line */}
          <h1 
            className="font-anton text-hero-accent uppercase leading-[0.85] tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(3rem, 16vw, 16rem)',
            }}
          >
            {vangronsveld}
          </h1>
        </div>

        {/* Bottom rule */}
        <div 
          className={`w-full h-[2px] bg-hero-accent mt-6 md:mt-8 origin-center ${
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

      {/* Down arrow - appears after 3 seconds */}
      <div 
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 ${
          isLoaded ? 'animate-hero-fade-up' : ''
        }`}
        style={{ animationDelay: '3s' }}
      >
        <div className="flex flex-col items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-hero-accent/40 animate-bounce"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
