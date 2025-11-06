import { useEffect, useState, useRef } from "react";
import ampRiser from "@/assets/amp-riser.wav";
import feedbackHit from "@/assets/feedback-hit.wav";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isExiting, setIsExiting] = useState(false);
  const ampRiserRef = useRef<HTMLAudioElement | null>(null);
  const feedbackHitRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Play amp riser on mount
    ampRiserRef.current = new Audio(ampRiser);
    feedbackHitRef.current = new Audio(feedbackHit);
    ampRiserRef.current.volume = 0.5;
    feedbackHitRef.current.volume = 0.6;
    ampRiserRef.current.play().catch(err => console.log('Amp riser play failed:', err));

    // Wait 5 seconds before starting fade out
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      // Play feedback hit when starting to fade
      if (feedbackHitRef.current) {
        feedbackHitRef.current.play().catch(err => console.log('Feedback hit play failed:', err));
      }
    }, 5000);

    // Complete loading after fade out animation (5s + 0.8s fade)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      if (ampRiserRef.current) {
        ampRiserRef.current.pause();
      }
      if (feedbackHitRef.current) {
        feedbackHitRef.current.pause();
      }
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-800 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src="/icon.png"
        alt="Loading"
        className="w-20 h-20 md:w-24 md:h-24 animate-pulse"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(85%) sepia(35%) saturate(2719%) hue-rotate(136deg) brightness(94%) contrast(101%)",
        }}
      />
    </div>
  );
};

export default LoadingScreen;
