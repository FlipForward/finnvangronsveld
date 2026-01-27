import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
      
      // Update dot position immediately
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]");
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  // Smooth ring animation
  useEffect(() => {
    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  const scale = isClicking ? 0.8 : isHovering ? 1.5 : 1;

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transition: "transform 0.1s ease-out, opacity 0.2s ease-out",
        }}
      >
        <div
          className="rounded-full bg-hero-accent"
          style={{
            width: isHovering ? 12 : 8,
            height: isHovering ? 12 : 8,
            transition: "width 0.2s ease-out, height 0.2s ease-out",
          }}
        />
      </div>

      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transition: "transform 0.15s ease-out, opacity 0.2s ease-out",
        }}
      >
        <div
          className="rounded-full border border-hero-accent/50"
          style={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            backgroundColor: isHovering ? "rgba(var(--hero-accent-rgb), 0.1)" : "transparent",
            transition: "width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out",
          }}
        />
      </div>

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
