import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  key?: React.Key | string | number;
}

export default function TiltCard({ children, className = "", ...props }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Only enable 3D tilt tracking if device actually supports fine pointer hover (desktops/laptops with mouse/trackpad)
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(hover: hover) and (pointer: fine)');
      setCanHover(media.matches);
      const listener = (e: MediaQueryListEvent) => setCanHover(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || prefersReduced) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const pctX = (mouseX / width) * 100;
    const pctY = (mouseY / height) * 100;

    // Keep it subtle: max 8 degrees of tilt is perfect for premium and legible cards
    const rX = ((mouseY / height) - 0.5) * -8; 
    const rY = ((mouseX / width) - 0.5) * 8;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({ x: pctX, y: pctY });
  };

  const handleMouseEnter = () => {
    if (canHover && !prefersReduced) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: canHover && !prefersReduced ? rotateX : 0,
        rotateY: canHover && !prefersReduced ? rotateY : 0,
        transformPerspective: 1000,
      }}
      whileHover={canHover && !prefersReduced ? {
        scale: 1.02,
        borderColor: 'rgba(212, 175, 55, 0.4)',
        boxShadow: '0 20px 40px -15px rgba(212, 175, 55, 0.35)',
      } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.6 }}
      style={{
        transformStyle: canHover ? 'preserve-3d' : 'flat',
      }}
      className={`relative group ${className}`}
      {...props}
    >
      {/* Spotlight Glare Overlay to simulate shiny physical texture on fine pointers */}
      {canHover && !prefersReduced && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 0.15 : 0,
            background: `radial-gradient(circle 180px at ${glarePos.x}% ${glarePos.y}%, rgba(212, 175, 55, 0.35), transparent)`,
          }}
        />
      )}
      
      {children}
    </motion.div>
  );
}
