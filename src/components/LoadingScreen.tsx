import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Wait 2 seconds before starting fade out
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2000);

    // Complete loading after fade out animation (2s + 0.8s fade)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
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
