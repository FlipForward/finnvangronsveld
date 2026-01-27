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
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  
  const trailPositionRef = useRef({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const magneticTargetsRef = useRef<MagneticTarget[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  const MAGNETIC_DISTANCE = 100;
  const MAGNETIC_STRENGTH = 0.35;

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

  // Smooth trail animation using requestAnimationFrame
  useEffect(() => {
    const animate = () => {
      const targetX = mousePositionRef.current.x + magneticOffset.x;
      const targetY = mousePositionRef.current.y + magneticOffset.y;
      
      trailPositionRef.current = {
        x: trailPositionRef.current.x + (targetX - trailPositionRef.current.x) * 0.12,
        y: trailPositionRef.current.y + (targetY - trailPositionRef.current.y) * 0.12,
      };
      
      setTrailPosition({ ...trailPositionRef.current });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [magneticOffset]);

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

  useEffect(() => {
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]");
      setIsHovering(!!interactive);
    };

    window.addEventListener("mouseover", handleElementHover);
    return () => window.removeEventListener("mouseover", handleElementHover);
  }, []);

  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  const cursorX = position.x + magneticOffset.x;
  const cursorY = position.y + magneticOffset.y;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`fixed pointer-events-none z-[9999] mix-blend-difference ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: cursorX,
          top: cursorY,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering || isMagnetic ? 1.5 : 1})`,
          transition: "transform 0.1s ease-out, opacity 0.15s ease-out",
        }}
      >
        <div
          className={`rounded-full bg-hero-accent ${
            isHovering || isMagnetic ? "w-3 h-3" : "w-2 h-2"
          }`}
          style={{ transition: "width 0.2s ease-out, height 0.2s ease-out" }}
        />
      </div>

      {/* Trailing ring */}
      <div
        className={`fixed pointer-events-none z-[9998] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: trailPosition.x,
          top: trailPosition.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering || isMagnetic ? 1.5 : 1})`,
          transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        }}
      >
        <div
          className={`rounded-full border ${
            isHovering || isMagnetic
              ? "w-12 h-12 border-hero-accent/60 bg-hero-accent/10"
              : "w-8 h-8 border-hero-accent/40"
          }`}
          style={{ transition: "width 0.2s ease-out, height 0.2s ease-out, border-color 0.2s ease-out, background-color 0.2s ease-out" }}
        />
      </div>

      {/* Glow effect on hover or magnetic */}
      {(isHovering || isMagnetic) && (
        <div
          className="fixed pointer-events-none z-[9997] opacity-30"
          style={{
            left: trailPosition.x,
            top: trailPosition.y,
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.3s ease-out",
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
