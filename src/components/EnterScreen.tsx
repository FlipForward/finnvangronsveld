import { useState, useEffect } from "react";

interface EnterScreenProps {
  onEnter: () => void;
}

const logoParts = [
  // 1: Left vertical bar
  <rect key="1" x="999.41" y="999.68" width="1498.58" height="7995.66" />,
  // 2: Top horizontal bar
  <rect key="2" x="999.41" y="999.68" width="8000.54" height="1493.69" />,
  // 3: Middle horizontal bar
  <rect key="3" x="3493.78" y="3496.5" width="5506.17" height="1501.02" />,
  // 4: Bottom-left small rect
  <rect key="4" x="3493.78" y="5993.31" width="1506.72" height="3002.03" />,
  // 5: Circle bottom-right
  <circle key="5" cx="7506.25" cy="7494.33" r="1501.02" />,
];

const EnterScreen = ({ onEnter }: EnterScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [visibleParts, setVisibleParts] = useState<number[]>([]);

  useEffect(() => {
    // Stagger each part appearing
    logoParts.forEach((_, i) => {
      setTimeout(() => {
        setVisibleParts((prev) => [...prev, i]);
      }, 400 + i * 350);
    });

    // Start exit after all parts visible + pause
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 400 + logoParts.length * 350 + 800);

    const completeTimer = setTimeout(() => {
      onEnter();
    }, 400 + logoParts.length * 350 + 1300);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onEnter]);

  return (
    <div
      className={`fixed inset-0 z-[101] bg-background flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <svg
        viewBox="0 0 10000 10000"
        className="w-24 h-24 md:w-32 md:h-32"
        style={{ fill: "hsl(var(--hero-accent))" }}
      >
        {logoParts.map((part, i) => (
          <g
            key={i}
            style={{
              opacity: visibleParts.includes(i) ? 1 : 0,
              transition: "opacity 0.5s ease-out",
            }}
          >
            {part}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default EnterScreen;
