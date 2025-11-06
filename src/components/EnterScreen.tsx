import { useState, useRef } from "react";
import feedbackHit from "@/assets/feedback-hit.wav";

interface EnterScreenProps {
  onEnter: () => void;
}

const EnterScreen = ({ onEnter }: EnterScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnter = () => {
    // Play feedback hit
    audioRef.current = new Audio(feedbackHit);
    audioRef.current.volume = 0.6;
    audioRef.current.play().catch(err => console.log('Feedback hit play failed:', err));
    
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-[101] bg-background flex flex-col items-center justify-center gap-4 transition-opacity duration-800 cursor-pointer ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleEnter}
    >
      <img
        src="/icon.png"
        alt="Logo"
        className="w-24 h-24 md:w-32 md:h-32 transition-transform hover:scale-110"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(85%) sepia(35%) saturate(2719%) hue-rotate(136deg) brightness(94%) contrast(101%)",
        }}
      />
      <p className="text-hero-accent/70 text-sm uppercase tracking-wider">
        click to open
      </p>
    </div>
  );
};

export default EnterScreen;
