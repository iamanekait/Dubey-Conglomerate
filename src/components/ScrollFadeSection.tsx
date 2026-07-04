import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ScrollFadeSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export default function ScrollFadeSection({ 
  children, 
  id, 
  className = '', 
  delay = 0 
}: ScrollFadeSectionProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ 
        duration: 0.9, 
        delay,
        ease: [0.16, 1, 0.3, 1] // Custom premium cubic-bezier for high-fidelity ease-out
      }}
    >
      {children}
    </motion.div>
  );
}
