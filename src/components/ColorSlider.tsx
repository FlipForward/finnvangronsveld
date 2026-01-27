import { useColor } from "@/contexts/ColorContext";

const ColorSlider = () => {
  const { hue, setHue } = useColor();

  return (
    <div className="flex items-center gap-2">
      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={(e) => setHue(parseInt(e.target.value, 10))}
        className="w-20 h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, 
            hsl(0, 100%, 50%), 
            hsl(60, 100%, 50%), 
            hsl(120, 100%, 50%), 
            hsl(180, 100%, 50%), 
            hsl(240, 100%, 50%), 
            hsl(300, 100%, 50%), 
            hsl(360, 100%, 50%)
          )`,
        }}
        title="Change accent color"
      />
      <div 
        className="w-4 h-4 rounded-full border border-white/30"
        style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
      />
    </div>
  );
};

export default ColorSlider;
