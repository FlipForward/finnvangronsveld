import { useColor } from "@/contexts/ColorContext";

const colorPresets = [
  { name: "Cyan", hue: 180 },
  { name: "Purple", hue: 270 },
  { name: "Green", hue: 140 },
  { name: "Orange", hue: 30 },
  { name: "Pink", hue: 330 },
];

const ColorSlider = () => {
  const { hue, setHue } = useColor();

  return (
    <div className="flex items-center gap-1">
      {colorPresets.map((preset) => (
        <button
          key={preset.name}
          onClick={() => setHue(preset.hue)}
          className={`w-5 h-5 rounded-full transition-all duration-200 hover:scale-110 ${
            hue === preset.hue ? "ring-2 ring-white ring-offset-1 ring-offset-black scale-110" : ""
          }`}
          style={{ backgroundColor: `hsl(${preset.hue}, 100%, 50%)` }}
          title={preset.name}
        />
      ))}
    </div>
  );
};

export default ColorSlider;
