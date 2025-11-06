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
        className="pointer-events-none fixed"
        style={{
          bottom: 'calc(3rem + 12px)',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isHovering ? '400vmax' : '0',
          height: isHovering ? '400vmax' : '0',
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.9) 0%, rgba(0, 255, 255, 0.7) 10%, rgba(0, 255, 255, 0.5) 25%, rgba(0, 255, 255, 0.3) 40%, rgba(0, 255, 255, 0) 60%)',
          transition: isHovering ? 'width 5000ms ease-out, height 5000ms ease-out, opacity 300ms ease-out' : 'width 300ms ease-out, height 300ms ease-out, opacity 300ms ease-out',
          opacity: isHovering ? 1 : 0,
          borderRadius: '50%',
        }}
      />

      {/* Wordmark container */}
      <div className="relative">
        {/* Top rule */}
        <div 
          className={`w-full h-[2px] mb-6 md:mb-8 origin-center ${
            typingComplete ? 'scale-x-100' : 'scale-x-0'
          }`}
          style={{
            backgroundColor: isHovering ? '#000000' : 'hsl(var(--hero-accent))',
            transition: 'transform 500ms ease-out, background-color 5000ms linear',
          }}
        />

        {/* Wordmark */}
        <div>
          {/* FINN - smaller line */}
          <h1 
            className="font-anton uppercase leading-[0.85] tracking-[-0.03em] mb-6 md:mb-8"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 10rem)',
              color: isHovering ? '#000000' : 'hsl(var(--hero-accent))',
              transition: 'color 5000ms linear',
            }}
          >
            {displayedFinn}
            {isLoaded && displayedFinn.length < finn.length && (
              <span className="animate-pulse">|</span>
            )}
          </h1>

          {/* VANGRONSVELD - dominant line */}
          <h1 
            className="font-anton uppercase leading-[0.85] tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(3rem, 16vw, 16rem)',
              color: isHovering ? '#000000' : 'hsl(var(--hero-accent))',
              transition: 'color 5000ms linear',
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
          className={`w-full h-[2px] mt-6 md:mt-8 origin-center ${
            typingComplete ? 'scale-x-100' : 'scale-x-0'
          }`}
          style={{
            backgroundColor: isHovering ? '#000000' : 'hsl(var(--hero-accent))',
            transition: 'transform 500ms ease-out, background-color 5000ms linear',
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
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 hover:scale-110 cursor-pointer z-10 ${
          typingComplete ? 'opacity-100' : 'opacity-0'
        } animate-bounce`}
        style={{
          animationDuration: '3s',
          animationPlayState: isHovering ? 'paused' : 'running',
        }}
        aria-label="Scroll to about section"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10 transition-colors duration-300"
          style={{
            color: isHovering ? '#000000' : 'hsl(var(--hero-accent))',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </section>
  );
};

export default Hero;
