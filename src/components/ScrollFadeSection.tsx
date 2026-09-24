import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

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
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      className={className}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
      transition={{ 
        duration: 0.85, 
        delay,
        ease: [0.16, 1, 0.3, 1] // Custom premium cubic-bezier for smooth high-fidelity ease-out
      }}
    >
      {children}
    </motion.div>
  );
}
