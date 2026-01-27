import { useState, useEffect } from "react";

interface EnterScreenProps {
  onEnter: () => void;
}

const EnterScreen = ({ onEnter }: EnterScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [showText, setShowText] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const text = "click to open";

  useEffect(() => {
    // Fade in logo immediately
    setLogoVisible(true);

    // Show text with typing effect after 1 second
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1000);

    return () => clearTimeout(textTimer);
  }, []);

  useEffect(() => {
    if (!showText) return;

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [showText]);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 500);
  };

  return (
    <div
      className={`fixed inset-0 z-[101] bg-background flex flex-col items-center justify-center gap-4 transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        onClick={handleEnter}
        className="cursor-pointer flex flex-col items-center gap-4"
      >
        <img
          src="/icon.png"
          alt="Logo"
          className={`w-24 h-24 md:w-32 md:h-32 transition-all duration-1000 ${
            logoVisible ? "opacity-100 scale-100 animate-pulse" : "opacity-0 scale-95"
          }`}
          style={{
            filter:
              "brightness(0) saturate(100%) invert(85%) sepia(35%) saturate(2719%) hue-rotate(136deg) brightness(94%) contrast(101%)",
            animationDuration: "2s",
          }}
        />
        <p
          className={`text-hero-accent/70 text-sm uppercase tracking-wider transition-opacity duration-500 min-h-[20px] ${
            showText ? "opacity-100" : "opacity-0"
          }`}
        >
          {displayedText}
          {showText && displayedText.length < text.length && (
            <span className="animate-pulse">|</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default EnterScreen;
