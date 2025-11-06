import { useState } from "react";

interface EnterScreenProps {
  onEnter: () => void;
}

const EnterScreen = ({ onEnter }: EnterScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 500);
  };

  return (
    <div
      className={`fixed inset-0 z-[101] bg-background flex flex-col items-center justify-center gap-8 transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src="/icon.png"
        alt="Logo"
        className="w-24 h-24 md:w-32 md:h-32"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(85%) sepia(35%) saturate(2719%) hue-rotate(136deg) brightness(94%) contrast(101%)",
        }}
      />
      <button
        onClick={handleEnter}
        className="px-8 py-4 text-hero-accent border-2 border-hero-accent hover:bg-hero-accent hover:text-background transition-all duration-300 text-lg font-medium uppercase tracking-wider"
      >
        Click to Enter
      </button>
    </div>
  );
};

export default EnterScreen;
