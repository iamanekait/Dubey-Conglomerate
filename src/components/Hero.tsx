import { ArrowRight, BarChart3, ShieldCheck, Trophy, Sparkles, Compass, Palette, Cpu, Database } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { METRICS } from '../data';

const heroBg = 'https://owky9a9x58ejfh0u.public.blob.vercel-storage.com/DC%20Intro.mp4';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAssessment?: () => void;
}

// Staggered Reveal Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
      duration: 0.8
    }
  }
};

export default function Hero({ onOpenBooking, onOpenAssessment }: HeroProps) {
  const { scrollY } = useScroll();
  
  // High-fidelity vertical offsets for layered parallax depths
  const gridY = useTransform(scrollY, [0, 800], [0, 80]);
  const orb1Y = useTransform(scrollY, [0, 800], [0, -140]);
  const orb2Y = useTransform(scrollY, [0, 800], [0, 160]);
  const glowOpacity = useTransform(scrollY, [0, 800], [1, 0.35]);

  const handleScrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 lg:pt-32 pb-16 flex flex-col justify-center bg-corp-navy-950 text-white overflow-hidden"
    >
      {/* Immersive Background Media (Supporting video & image) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {heroBg.includes('.mp4') ? (
          <video
            src={heroBg}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-60"
          />
        ) : (
          <img
            src={heroBg}
            alt="Premium corporate consulting backdrop"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35"
          />
        )}
        {/* Soft atmospheric gradients and vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-corp-navy-950/80 via-corp-navy-950/60 to-corp-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,11,24,0.3)_0%,#050b18_85%)]" />
      </div>

      {/* Decorative Grid Mesh Background with subtle parallax */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
      >
        <div className="absolute inset-x-0 top-[-100px] bottom-[-200px] bg-[linear-gradient(to_right,#dfc282_1px,transparent_1px),linear-gradient(to_bottom,#dfc282_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-gradient-to-t from-corp-navy-950 via-transparent to-corp-navy-950" />
      </motion.div>

      {/* Decorative Blurred Glow Orbs with multi-layered differential parallax and smooth fade control */}
      <motion.div 
        style={{ y: orb1Y, opacity: glowOpacity }}
        className="absolute top-1/6 left-1/4 w-[450px] h-[450px] bg-corp-gold-600/10 rounded-full filter blur-[120px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: orb2Y, opacity: glowOpacity }}
        className="absolute bottom-1/6 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none" 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
          
          {/* Main Hero Copystack */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 flex flex-col items-center w-full"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-corp-navy-900 border border-corp-gold-500/20 px-3.5 py-1.5 rounded-full"
            >
              <Sparkles className="w-3.5 h-3.5 text-corp-gold-400" />
              <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.15em] text-corp-gold-300">
                Strategy • Creativity • Tech • Data • AI
              </span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-4 flex flex-col items-center"
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white">
                Fusing Strategy, Creativity,
                <span className="block mt-2 bg-gradient-to-r from-corp-gold-300 via-corp-gold-400 to-corp-gold-500 bg-clip-text text-transparent">
                  Tech, Data & Enterprise AI
                </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-corp-navy-200 font-light max-w-2xl leading-relaxed">
                Dubey Conglomerate combines high-stakes corporate strategy, human-centered creative design, 
                full-stack cloud technology, data telemetry, and generative AI to reinvent business models for the future.
              </p>
            </motion.div>

            {/* CTA Option Clusters */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2 w-full max-w-md sm:max-w-none"
            >
              <button
                onClick={onOpenBooking}
                className="group relative flex items-center justify-center space-x-2 bg-gradient-to-r from-corp-gold-500 to-corp-gold-600 hover:from-corp-gold-400 hover:to-corp-gold-500 text-corp-navy-950 font-bold px-7 py-4 rounded text-xs uppercase tracking-widest shadow-xl shadow-corp-gold-500/10 hover:shadow-corp-gold-500/20 transition-all duration-300 cursor-pointer"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleScrollToSection('#services')}
                className="flex items-center justify-center space-x-2 bg-transparent border-2 border-white/20 hover:border-[#D4AF37] hover:bg-white/5 text-white font-bold px-7 py-4 rounded-full text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg"
              >
                <span>Explore Services</span>
              </button>
            </motion.div>

            {/* 5 Core Pillars Badge */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-6 border-t border-corp-navy-800 w-full max-w-xl"
            >
              <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Compass className="w-3.5 h-3.5 text-corp-gold-400 flex-shrink-0" />
                <span className="text-[10px] uppercase font-mono tracking-wider text-corp-navy-200">1. Strategy</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Palette className="w-3.5 h-3.5 text-corp-gold-400 flex-shrink-0" />
                <span className="text-[10px] uppercase font-mono tracking-wider text-corp-navy-200">2. Creativity</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Cpu className="w-3.5 h-3.5 text-corp-gold-400 flex-shrink-0" />
                <span className="text-[10px] uppercase font-mono tracking-wider text-corp-navy-200">3. Tech</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Database className="w-3.5 h-3.5 text-corp-gold-400 flex-shrink-0" />
                <span className="text-[10px] uppercase font-mono tracking-wider text-corp-navy-200">4. Data</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-corp-gold-400 flex-shrink-0" />
                <span className="text-[10px] uppercase font-mono tracking-wider text-corp-navy-200">5. AI</span>
              </div>
            </motion.div>
          </motion.div>
          </div>

        {/* Counter Widget Section (As required: Client success metrics/counters) */}
        <motion.div 
          id="metrics-block"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 pt-10 border-t border-white/10"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
              FINANCIAL TELEMETRY & SCALE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Dubey Conglomerate By the Numbers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METRICS.map((metric, idx) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:bg-[#D4AF37]/5 transition-colors duration-300 shadow-xl group"
              >
                <div>
                  <span className="text-3.5xl font-bold text-[#D4AF37] block mb-1">
                    {metric.prefix}
                    {metric.value}
                    {metric.suffix}
                  </span>
                  <span className="text-xs font-display font-semibold text-white block mb-2 uppercase tracking-wide">
                    {metric.label}
                  </span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed mt-2 border-t border-white/15 pt-3 font-light">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
