import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Smooth trail effect
  useEffect(() => {
    const animateTrail = () => {
      setTrailPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
    };

    const interval = setInterval(animateTrail, 16);
    return () => clearInterval(interval);
  }, [position]);

  // Detect hover on interactive elements
  useEffect(() => {
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]");
      setIsHovering(!!interactive);
    };

    window.addEventListener("mouseover", handleElementHover);
    return () => window.removeEventListener("mouseover", handleElementHover);
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`fixed pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 1.5 : 1})`,
        }}
      >
        <div
          className={`rounded-full bg-hero-accent transition-all duration-200 ${
            isHovering ? "w-3 h-3" : "w-2 h-2"
          }`}
        />
      </div>

      {/* Trailing ring */}
      <div
        className={`fixed pointer-events-none z-[9998] transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: trailPosition.x,
          top: trailPosition.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 1.5 : 1})`,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isHovering
              ? "w-12 h-12 border-hero-accent/60 bg-hero-accent/10"
              : "w-8 h-8 border-hero-accent/40"
          }`}
        />
      </div>

      {/* Glow effect on hover */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9997] opacity-30 transition-opacity duration-300"
          style={{
            left: trailPosition.x,
            top: trailPosition.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-20 h-20 rounded-full bg-hero-accent blur-xl animate-pulse" />
        </div>
      )}

      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
