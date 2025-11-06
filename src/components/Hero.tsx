import { useEffect, useState } from "react";
import { useTypingSound } from "@/hooks/useTypingSound";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWhamSound } from "@/hooks/useWhamSound";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayedFinn, setDisplayedFinn] = useState("");
  const [displayedVangronsveld, setDisplayedVangronsveld] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { playTypingSound } = useTypingSound();
  const { t } = useLanguage();
  const { playWhamSound, stopWhamSound } = useWhamSound();

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
      {/* Expanding cyan glow from arrow */}
      <div 
        className="pointer-events-none fixed inset-0 transition-opacity"
        style={{
          opacity: isHovering ? 1 : 0,
          transitionDuration: isHovering ? '8000ms' : '300ms',
          background: isHovering 
            ? 'radial-gradient(circle at 50% 85vh, rgba(0, 255, 255, 0.9) 0%, rgba(0, 255, 255, 0.7) 20%, rgba(0, 255, 255, 0.5) 40%, rgba(0, 255, 255, 0) 70%)'
            : 'radial-gradient(circle at 50% 85vh, rgba(0, 255, 255, 0) 0%, rgba(0, 255, 255, 0) 100%)',
          backgroundSize: isHovering ? '400vmax 400vmax' : '0 0',
          backgroundPosition: 'center 85vh',
          transitionProperty: 'opacity, background-size',
        }}
      />

      {/* Wordmark container */}
      <div className="relative" style={{
        transition: 'color 5000ms ease-out',
        color: isHovering ? '#000000' : undefined,
      }}>
        {/* Top rule */}
        <div 
          className={`w-full h-[2px] mb-6 md:mb-8 origin-center transition-transform duration-500 transition-colors duration-[15000ms] ease-out ${
            typingComplete ? 'scale-x-100' : 'scale-x-0'
          }`}
          style={{
            backgroundColor: isHovering ? '#000000' : 'hsl(var(--hero-accent))',
          }}
        />

        {/* Wordmark */}
        <div>
          {/* FINN - smaller line */}
          <h1 
            className="font-anton uppercase leading-[0.85] tracking-[-0.03em] mb-6 md:mb-8 transition-colors duration-[15000ms] ease-out"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 10rem)',
              color: isHovering ? '#000000' : 'hsl(var(--hero-accent))',
            }}
          >
            {displayedFinn}
            {isLoaded && displayedFinn.length < finn.length && (
              <span className="animate-pulse">|</span>
            )}
          </h1>

          {/* VANGRONSVELD - dominant line */}
          <h1 
            className="font-anton uppercase leading-[0.85] tracking-[-0.03em] transition-colors duration-[15000ms] ease-out"
            style={{
              fontSize: 'clamp(3rem, 16vw, 16rem)',
              color: isHovering ? '#000000' : 'hsl(var(--hero-accent))',
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
          className={`w-full h-[2px] mt-6 md:mt-8 origin-center transition-transform duration-500 transition-colors duration-[15000ms] ease-out ${
            typingComplete ? 'scale-x-100' : 'scale-x-0'
          }`}
          style={{
            backgroundColor: isHovering ? '#000000' : 'hsl(var(--hero-accent))',
          }}
        />

        {/* Micro labels below rules */}
        <div 
          className={`flex justify-between gap-4 mt-4 transition-opacity duration-500 ${
            typingComplete ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-[10px] md:text-xs text-hero-accent/60 uppercase tracking-wider">
            {t('hero.label1')}
          </span>
          <span className="text-[10px] md:text-xs text-hero-accent/60 uppercase tracking-wider">
            {t('hero.label2')}
          </span>
          <span className="text-[10px] md:text-xs text-hero-accent/60 uppercase tracking-wider">
            {t('hero.label3')}
          </span>
        </div>
      </div>

      {/* Down arrow - appears after typing is complete */}
      <button
        onClick={() => {
          const aboutSection = document.querySelector('#about-section');
          aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        onMouseEnter={() => {
          setIsHovering(true);
          playWhamSound();
        }}
        onMouseLeave={() => {
          setIsHovering(false);
          stopWhamSound();
        }}
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-300 hover:scale-110 cursor-pointer z-10 ${
          typingComplete ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Scroll to about section"
      >
        <div className="relative flex flex-col items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative z-10 transition-colors duration-300 animate-bounce"
            style={{
              color: isHovering ? '#000000' : 'hsl(var(--hero-accent))',
              animation: isHovering ? 'none' : undefined,
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
    </section>
  );
};

export default Hero;
