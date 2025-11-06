import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "./ui/slider";

interface VolumeSliderProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const VolumeSlider = ({ volume, onVolumeChange }: VolumeSliderProps) => {
  return (
    <div className="flex items-center gap-2">
      {volume === 0 ? (
        <VolumeX size={16} className="text-hero-accent/70" />
      ) : (
        <Volume2 size={16} className="text-hero-accent/70" />
      )}
      <Slider
        value={[volume * 100]}
        onValueChange={(values) => onVolumeChange(values[0] / 100)}
        max={100}
        step={1}
        className="w-20"
      />
    </div>
  );
};
