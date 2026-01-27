import { useEffect, useState, useRef, useCallback } from "react";

interface MagneticTarget {
  element: HTMLElement;
  rect: DOMRect;
  centerX: number;
  centerY: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const magneticTargetsRef = useRef<MagneticTarget[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  const MAGNETIC_DISTANCE = 100; // Distance in pixels to start magnetic effect
  const MAGNETIC_STRENGTH = 0.35; // How strong the pull is (0-1)

  // Update magnetic targets periodically
  const updateMagneticTargets = useCallback(() => {
    const elements = document.querySelectorAll('button, [role="button"], [data-magnetic]');
    magneticTargetsRef.current = Array.from(elements).map((el) => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      return {
        element: el as HTMLElement,
        rect,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
      };
    });
  }, []);

  // Calculate magnetic offset
  const calculateMagneticOffset = useCallback((mouseX: number, mouseY: number) => {
    let closestDistance = Infinity;
    let offsetX = 0;
    let offsetY = 0;
    let foundMagnetic = false;

    for (const target of magneticTargetsRef.current) {
      const dx = target.centerX - mouseX;
      const dy = target.centerY - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < MAGNETIC_DISTANCE && distance < closestDistance) {
        closestDistance = distance;
        const strength = (1 - distance / MAGNETIC_DISTANCE) * MAGNETIC_STRENGTH;
        offsetX = dx * strength;
        offsetY = dy * strength;
        foundMagnetic = true;
      }
    }

    setIsMagnetic(foundMagnetic);
    setMagneticOffset({ x: offsetX, y: offsetY });
  }, []);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      calculateMagneticOffset(e.clientX, e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    const handleScroll = () => {
      updateMagneticTargets();
      calculateMagneticOffset(mousePositionRef.current.x, mousePositionRef.current.y);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("scroll", handleScroll, true);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    // Initial update and periodic refresh
    updateMagneticTargets();
    const interval = setInterval(updateMagneticTargets, 500);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScroll, true);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      clearInterval(interval);
    };
  }, [updateMagneticTargets, calculateMagneticOffset]);

  // Smooth trail effect with magnetic influence
  useEffect(() => {
    const animateTrail = () => {
      const targetX = position.x + magneticOffset.x;
      const targetY = position.y + magneticOffset.y;
      
      setTrailPosition((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.15,
        y: prev.y + (targetY - prev.y) * 0.15,
      }));
    };

    const interval = setInterval(animateTrail, 16);
    return () => clearInterval(interval);
  }, [position, magneticOffset]);

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

  const cursorX = position.x + magneticOffset.x;
  const cursorY = position.y + magneticOffset.y;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`fixed pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: cursorX,
          top: cursorY,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering || isMagnetic ? 1.5 : 1})`,
        }}
      >
        <div
          className={`rounded-full bg-hero-accent transition-all duration-200 ${
            isHovering || isMagnetic ? "w-3 h-3" : "w-2 h-2"
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
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering || isMagnetic ? 1.5 : 1})`,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isHovering || isMagnetic
              ? "w-12 h-12 border-hero-accent/60 bg-hero-accent/10"
              : "w-8 h-8 border-hero-accent/40"
          }`}
        />
      </div>

      {/* Glow effect on hover or magnetic */}
      {(isHovering || isMagnetic) && (
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
