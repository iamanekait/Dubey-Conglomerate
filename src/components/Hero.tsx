import { ArrowRight, BarChart3, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { METRICS } from '../data';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAssessment: () => void;
}

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copystack */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-corp-navy-900 border border-corp-gold-500/20 px-3.5 py-1.5 rounded-full"
            >
              <Sparkles className="w-3.5 h-3.5 text-corp-gold-400" />
              <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.15em] text-corp-gold-300">
                Advisory Leadership • Benachity, Durgapur
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white">
                Strategic Consulting for
                <span className="block mt-2 bg-gradient-to-r from-corp-gold-300 via-corp-gold-400 to-corp-gold-500 bg-clip-text text-transparent">
                  Sustainable Business Growth
                </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-corp-navy-200 font-light max-w-2xl leading-relaxed">
                Dubey Conglomerate delivers enterprise-grade corporate strategy, process optimization, 
                and working capital counseling. Based in West Bengal’s industrial heartland, we empower local 
                and global operators to scale with absolute strategic confidence.
              </p>
            </motion.div>

            {/* CTA Option Clusters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
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

            {/* Strategic Value Pillars Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-corp-navy-800 max-w-lg"
            >
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-corp-gold-400 flex-shrink-0" />
                <span className="text-[10px] uppercase font-mono tracking-wider text-corp-navy-300">ISO Standards</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-corp-gold-400 flex-shrink-0" />
                <span className="text-[10px] uppercase font-mono tracking-wider text-corp-navy-300">Data Advised</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-corp-gold-400 flex-shrink-0" />
                <span className="text-[10px] uppercase font-mono tracking-wider text-corp-navy-300">98% Success</span>
              </div>
            </motion.div>
          </div>

          {/* Right Interactive Premium Container Frame */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 sm:p-8 rounded-2xl relative shadow-2xl overflow-hidden glass-panel-glow"
            >
              {/* Highlight Corner Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-corp-gold-500" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-corp-gold-500" />

              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400">OPERATIONAL INTEL</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/50">DURGAPUR HQ Desk</span>
                </div>

                <div className="space-y-4">
                  <h3 className="font-display text-lg font-bold text-corp-gold-300">
                    Why Local Businesses Choose Dubey Conglomerate
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    We combine empirical advisory patterns with local tactical execution. Our consultants are familiar 
                    with the ground economics of Benachity, Asansol, Raniganj and the wider Durgapur industrial zone.
                  </p>
                </div>

                {/* Micro Calculator / Inline CTA widget */}
                <div className="p-4 backdrop-blur-md bg-white/5 rounded-xl border border-white/10 space-y-3">
                  <span className="text-[10px] font-mono uppercase text-corp-gold-400 tracking-wider font-bold">
                    Quick Assessment Portal
                  </span>
                  <p className="text-xs text-white/70">
                    Uncover systemic flaws in your cash flow and organizational tree. Spend 2 minutes running our digital scan.
                  </p>
                  <button
                    onClick={onOpenAssessment}
                    className="w-full py-2.5 bg-corp-gold-500 text-corp-navy-950 rounded-lg hover:scale-105 active:scale-95 text-[10px] font-mono uppercase tracking-widest font-bold transition-all cursor-pointer"
                  >
                    Launch Calibration Scanner
                  </button>
                </div>

                <div className="pt-2">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-white/40 text-center">
                    Authorized and Insured advisory bureau
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Counter Widget Section (As required: Client success metrics/counters) */}
        <div id="metrics-block" className="mt-20 pt-10 border-t border-white/10">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
              FINANCIAL TELEMETRY & SCALE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Dubey Conglomerate By the Numbers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METRICS.map((metric) => (
              <div
                key={metric.id}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
