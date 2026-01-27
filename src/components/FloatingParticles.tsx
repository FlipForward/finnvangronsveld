import { useEffect, useState, useRef, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const particleCount = 120; // Increased from 50
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      newParticles.push({
        id: i,
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
      });
    }

    setParticles(newParticles);
  }, []);

  const updateParticles = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    setParticles(prevParticles => 
      prevParticles.map(particle => {
        // Convert percentage to pixels
        const particleX = (particle.baseX / 100) * rect.width;
        const particleY = (particle.baseY / 100) * rect.height;

        // Calculate distance from mouse
        const dx = mouseX - particleX;
        const dy = mouseY - particleY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Repulsion radius and strength
        const repulsionRadius = 150;
        const repulsionStrength = 80;

        let offsetX = 0;
        let offsetY = 0;

        if (distance < repulsionRadius && distance > 0) {
          // Calculate repulsion force (stronger when closer)
          const force = (1 - distance / repulsionRadius) * repulsionStrength;
          
          // Normalize direction and apply force
          offsetX = -(dx / distance) * force;
          offsetY = -(dy / distance) * force;
        }

        // Convert offset back to percentage
        const newX = particle.baseX + (offsetX / rect.width) * 100;
        const newY = particle.baseY + (offsetY / rect.height) * 100;

        return {
          ...particle,
          x: newX,
          y: newY,
        };
      })
    );

    animationFrameRef.current = requestAnimationFrame(updateParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(updateParticles);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateParticles]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-hero-accent transition-all duration-150 ease-out"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `float-particle ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-10px, -50px) scale(0.9);
          }
          75% {
            transform: translate(15px, -20px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingParticles;
