import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ColorContextType {
  hue: number;
  setHue: (hue: number) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [hue, setHue] = useState(() => {
    const saved = localStorage.getItem('accentHue');
    return saved ? parseInt(saved, 10) : 180; // Default cyan (180)
  });

  useEffect(() => {
    localStorage.setItem('accentHue', hue.toString());
    
    // Update CSS variables
    const root = document.documentElement;
    root.style.setProperty('--hero-accent', `${hue} 100% 50%`);
    root.style.setProperty('--hero-accent-rgb', hslToRgbString(hue, 100, 50));
  }, [hue]);

  return (
    <ColorContext.Provider value={{ hue, setHue }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
};

// Helper to convert HSL to RGB string for gradients
function hslToRgbString(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return `${f(0)}, ${f(8)}, ${f(4)}`;
}
