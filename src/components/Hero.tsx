import { useEffect, useState } from "react";
import { useTypingSound } from "@/hooks/useTypingSound";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayedFinn, setDisplayedFinn] = useState("");
  const [displayedVangronsveld, setDisplayedVangronsveld] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const { playTypingSound } = useTypingSound();

  const finn = "FINN";
  const vangronsveld = "VANGRONSVELD";

  useEffect(() => {
    // Trigger animation immediately if returning, or after loading screen on first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    const timer = setTimeout(() => setIsLoaded(true), hasVisited ? 0 : 2900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    let finnIndex = 0;
    let vansgronsIndex = 0;

    // Type FINN first
    const finnInterval = setInterval(() => {
      if (finnIndex < finn.length) {
        setDisplayedFinn(finn.slice(0, finnIndex + 1));
        playTypingSound();
        finnIndex++;
      } else {
        clearInterval(finnInterval);
        
        // Then type VANGRONSVELD
        const vansgronsInterval = setInterval(() => {
          if (vansgronsIndex < vangronsveld.length) {
            setDisplayedVangronsveld(vangronsveld.slice(0, vansgronsIndex + 1));
            playTypingSound();
            vansgronsIndex++;
          } else {
            clearInterval(vansgronsInterval);
            setTypingComplete(true);
          }
        }, 40);
      }
    }, 50);

    return () => clearInterval(finnInterval);
  }, [isLoaded, finn, vangronsveld, playTypingSound]);

  return (
    <section 
      className={`relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 overflow-hidden pt-32 md:pt-40 transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Wordmark container */}
      <div className="relative">
        {/* Top rule */}
        <div 
          className={`w-full h-[2px] bg-hero-accent mb-6 md:mb-8 origin-center transition-transform duration-500 ${
            typingComplete ? 'scale-x-100' : 'scale-x-0'
          }`}
        />

        {/* Wordmark */}
        <div>
          {/* FINN - smaller line */}
          <h1 
            className="font-anton text-hero-accent uppercase leading-[0.85] tracking-[-0.03em] mb-6 md:mb-8"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 10rem)',
            }}
          >
            {displayedFinn}
            {isLoaded && displayedFinn.length < finn.length && (
              <span className="animate-pulse">|</span>
            )}
          </h1>

          {/* VANGRONSVELD - dominant line */}
          <h1 
            className="font-anton text-hero-accent uppercase leading-[0.85] tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(3rem, 16vw, 16rem)',
            }}
          >
            {displayedVangronsveld}
            {displayedFinn.length === finn.length && displayedVangronsveld.length < vangronsveld.length && (
              <span className="animate-pulse">|</span>
            )}
          </h1>
        </div>

        {/* Bottom rule */}
        <div 
          className={`w-full h-[2px] bg-hero-accent mt-6 md:mt-8 origin-center transition-transform duration-500 ${
            typingComplete ? 'scale-x-100' : 'scale-x-0'
          }`}
        />

        {/* Micro labels below rules */}
        <div 
          className={`flex justify-between gap-4 mt-4 transition-opacity duration-500 ${
            typingComplete ? 'opacity-100' : 'opacity-0'
          }`}
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

      {/* Down arrow - appears after typing is complete */}
      <div 
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
          typingComplete ? 'opacity-100' : 'opacity-0'
        }`}
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
