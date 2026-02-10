import { useState, useEffect } from "react";

interface EnterScreenProps {
  onEnter: () => void;
}

// Groups: [0] = L-shape (left + top), [1] = middle bar, [2] = bottom rect, [3] = circle
const partGroups = [
  { delay: 300, from: "translate(-800, -800)", parts: [
    <rect key="1" x="999.41" y="999.68" width="1498.58" height="7995.66" />,
    <rect key="2" x="999.41" y="999.68" width="8000.54" height="1493.69" />,
  ]},
  { delay: 750, from: "translate(800, 0)", parts: [
    <rect key="3" x="3493.78" y="3496.5" width="5506.17" height="1501.02" />,
  ]},
  { delay: 1150, from: "translate(0, 800)", parts: [
    <rect key="4" x="3493.78" y="5993.31" width="1506.72" height="3002.03" />,
  ]},
  { delay: 1550, from: "scale(0)", parts: [
    <circle key="5" cx="7506.25" cy="7494.33" r="1501.02" />,
  ]},
];

const EnterScreen = ({ onEnter }: EnterScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [visibleGroups, setVisibleGroups] = useState<number[]>([]);

  useEffect(() => {
    partGroups.forEach((group, i) => {
      setTimeout(() => {
        setVisibleGroups((prev) => [...prev, i]);
      }, group.delay);
    });

    const lastDelay = partGroups[partGroups.length - 1].delay;

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, lastDelay + 1000);

    const completeTimer = setTimeout(() => {
      onEnter();
    }, lastDelay + 1500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onEnter]);

  return (
    <div
      className={`fixed inset-0 z-[101] bg-background flex items-center justify-center transition-all duration-700 ${
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      <svg
        viewBox="0 0 10000 10000"
        className="w-24 h-24 md:w-32 md:h-32"
        style={{ fill: "hsl(var(--hero-accent))", overflow: "visible" }}
      >
        {partGroups.map((group, i) => {
          const visible = visibleGroups.includes(i);
          return (
            <g
              key={i}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translate(0,0) scale(1)" : group.from,
                transformOrigin: i === 3 ? "7506px 7494px" : "5000px 5000px",
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {group.parts}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default EnterScreen;
