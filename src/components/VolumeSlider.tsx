import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "./ui/slider";
import { useState } from "react";

interface VolumeSliderProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const VolumeSlider = ({ volume, onVolumeChange }: VolumeSliderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="p-2 rounded-full hover:bg-hero-accent/10 transition-colors"
        aria-label="Volume control"
      >
        {volume === 0 ? (
          <VolumeX size={18} className="text-foreground/70" />
        ) : (
          <Volume2 size={18} className="text-foreground/70" />
        )}
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-black/95 backdrop-blur-sm border border-hero-accent/30 rounded-lg p-4 w-40 z-50">
          <Slider
            value={[volume * 100]}
            onValueChange={(values) => onVolumeChange(values[0] / 100)}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};
