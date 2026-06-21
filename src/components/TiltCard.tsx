import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
    setIsHovered(true);
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
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.6 }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      className={`relative group ${className}`}
      {...props}
    >
      {/* Premium Spotlight Glare Overlay to simulate shiny physical texture */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 0.15 : 0,
          background: `radial-gradient(circle 180px at ${glarePos.x}% ${glarePos.y}%, rgba(212, 175, 55, 0.35), transparent)`,
        }}
      />
      
      {/* 3D depth translator */}
      <div style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }} className="h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}
