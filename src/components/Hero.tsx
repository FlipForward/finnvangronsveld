import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener("mousemove", handleMouseMove);
      return () => heroEl.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Calculate font weight based on distance from cursor
  const getLetterStyle = (index: number, totalChars: number, lineRef: HTMLElement | null) => {
    if (!lineRef) return {};
    
    const charElements = lineRef.querySelectorAll("span");
    if (!charElements[index]) return {};
    
    const charRect = charElements[index].getBoundingClientRect();
    const heroRect = heroRef.current?.getBoundingClientRect();
    
    if (!heroRect) return {};
    
    const charCenterX = charRect.left + charRect.width / 2 - heroRect.left;
    const charCenterY = charRect.top + charRect.height / 2 - heroRect.top;
    
    const distance = Math.sqrt(
      Math.pow(mousePos.x - charCenterX, 2) + 
      Math.pow(mousePos.y - charCenterY, 2)
    );
    
    // Proximity threshold (bigger effect radius)
    const maxDistance = 200;
    const proximity = Math.max(0, 1 - distance / maxDistance);
    
    // Font weight: 900 (normal) to 100 (thin) based on proximity - bigger difference
    const fontWeight = 900 - (proximity * 800);
    
    return {
      fontWeight: Math.round(fontWeight),
      transition: "font-weight 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
    };
  };

  const finn = "FINN";
  const vangronsveld = "VANGRONSVELD";
  const finnRef = useRef<HTMLHeadingElement>(null);
  const vangronsveldRef = useRef<HTMLHeadingElement>(null);

  return (
    <section 
      ref={heroRef}
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
            ref={finnRef}
            className="font-anton text-hero-accent uppercase leading-[0.85] tracking-[-0.03em] mb-6 md:mb-8"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 10rem)',
            }}
          >
            {finn.split("").map((char, i) => (
              <span 
                key={i} 
                style={getLetterStyle(i, finn.length, finnRef.current)}
                className="inline-block"
              >
                {char}
              </span>
            ))}
          </h1>

          {/* VANGRONSVELD - dominant line */}
          <h1 
            ref={vangronsveldRef}
            className="font-anton text-hero-accent uppercase leading-[0.85] tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(3rem, 16vw, 16rem)',
            }}
          >
            {vangronsveld.split("").map((char, i) => (
              <span 
                key={i} 
                style={getLetterStyle(i, vangronsveld.length, vangronsveldRef.current)}
                className="inline-block"
              >
                {char}
              </span>
            ))}
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
