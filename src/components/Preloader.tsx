import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Cpu, Database, Compass, Award } from 'lucide-react';
import faviconDark from '../assets/images/favicon_dark_1781929946198.jpg';

interface PreloaderProps {
  onComplete: () => void;
}

const SHIFTING_MESSAGES = [
  { text: "Securing military-grade sandbox environment...", icon: ShieldCheck },
  { text: "Simulating process engineering heuristics...", icon: Cpu },
  { text: "Gathering Durgapur industrial zone analytics...", icon: Database },
  { text: "Synthesizing strategy expansion matrices...", icon: Compass },
  { text: "Calibrating asset risk vectors...", icon: Award },
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [show, setShow] = useState(true);

  // Counter animation simulation
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Premium progressive speeding up/slowing down sequence
      const increment = currentProgress > 80 
        ? Math.floor(Math.random() * 3) + 1 
        : Math.floor(Math.random() * 8) + 6;

      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Slightly hold the full state for aesthetic completeness
        setTimeout(() => {
          setShow(false);
          // Wait for fade exit transition to trigger parent completeness
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 300);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Rotational informational logs to keep viewer engaged
  useEffect(() => {
    if (progress >= 100) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % SHIFTING_MESSAGES.length);
    }, 1400);
    return () => clearInterval(interval);
  }, [progress]);

  const CurrentIcon = SHIFTING_MESSAGES[msgIndex].icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#050B18] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
        >
          {/* Ambient Cosmic Orbs */}
          <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-corp-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative flex flex-col items-center max-w-md w-full text-center space-y-12">
            
            {/* Medallion Logo Orb & Interactive Concentric Spinning Rings */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Spinning Ring One (Outer) */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                className="absolute inset-0 border border-dashed border-[#D4AF37]/20 rounded-full"
              />
              
              {/* Spinning Ring Two (Inner - Reverse) */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-2 border border-dotted border-white/10 rounded-full"
              />

              {/* Gold Orbit Dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="absolute inset-1 border border-transparent rounded-full"
              >
                <div className="absolute top-0 left-1/2 -ml-1 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-500 shadow-[0_0_12px_#D4AF37]" />
              </motion.div>

              {/* Centered Ornate Trademark Seal */}
              <div className="relative w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md overflow-hidden p-0.5">
                <img 
                  src={faviconDark} 
                  alt="DCC Logo" 
                  className="w-full h-full object-cover rounded-xl grayscale opacity-90 brightness-[1.1] transition-all" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
              </div>
            </div>

            {/* Tactical branding block */}
            <div className="space-y-3.5">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[10px] font-mono tracking-[0.35em] text-[#D4AF37] uppercase font-bold"
              >
                Dubey Conglomerate
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase"
              >
                ENTERPRISE SYSTEM
              </motion.h1>
            </div>

            {/* Microgauge Bar Indicator */}
            <div className="w-full max-w-[280px] space-y-4">
              <div className="relative h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="absolute h-full left-0 top-0 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] shadow-[0_0_8px_#D4AF37] rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Dual Metrics */}
              <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
                <span className="uppercase tracking-widest">INITIALIZING SECURE LINK</span>
                <span className="text-[#D4AF37] font-bold text-sm select-all">{progress}%</span>
              </div>
            </div>

            {/* Informational Diagnostics Banner */}
            <div className="h-6 flex items-center justify-center space-x-2 text-[10.5px] font-mono text-white/50 bg-white/[0.02] border border-white/5 rounded-full py-1 px-4 max-w-sm mx-auto">
              <CurrentIcon className="w-3.5 h-3.5 text-[#D4AF37]/80 animate-pulse shrink-0" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={msgIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="truncate text-center"
                >
                  {SHIFTING_MESSAGES[msgIndex].text}
                </motion.span>
              </AnimatePresence>
            </div>

          </div>

          {/* Secure watermark seal in lower screen margins */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 opacity-25">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.25em] text-white/80">
              DURGAPUR ADVISORY LEDGER
            </span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
