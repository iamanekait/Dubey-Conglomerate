import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrolled = (window.scrollY / scrollHeight) * 100;
        setScrollProgress(scrolled);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once to initialize
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3.5px] bg-white/[0.04] z-[150] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-amber-500 via-[#D4AF37] to-amber-300 shadow-[0_1px_8px_rgba(212,175,55,0.6)] rounded-r-full"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: '0%' }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.1 }}
      />
    </div>
  );
}
