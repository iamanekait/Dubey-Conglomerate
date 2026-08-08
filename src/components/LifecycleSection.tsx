import { useState } from 'react';
import { 
  Compass, 
  Palette, 
  Cpu, 
  Rocket, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LIFECYCLE_PHASES } from '../data';

const iconMap: Record<string, any> = {
  Compass,
  Palette,
  Cpu,
  Rocket,
  TrendingUp
};

export default function LifecycleSection() {
  const [activeStep, setActiveStep] = useState(0);

  const currentPhase = LIFECYCLE_PHASES[activeStep];
  const IconComponent = iconMap[currentPhase.icon] || Compass;

  return (
    <section id="lifecycle" className="py-20 lg:py-28 bg-corp-navy-950 relative overflow-hidden border-t border-corp-navy-900">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-corp-gold-500/5 blur-[140px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-corp-gold-500/10 border border-corp-gold-500/20 px-3.5 py-1.5 rounded-full"
          >
            <Sparkles className="w-3.5 h-3.5 text-corp-gold-400" />
            <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.18em] text-corp-gold-300">
              End-to-End Transformation Model
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          >
            Define. Design. Build. Launch. Scale.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-white/60 font-light leading-relaxed"
          >
            Our core capabilities span Define, Design, Build, Launch, and Scale — combining strategy, design, AI, data, and engineering to deliver measurable business outcomes at every phase.
          </motion.p>
        </div>

        {/* Desktop / Tablet Timeline Stepper */}
        <div className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {LIFECYCLE_PHASES.map((phase, idx) => {
              const PhaseIcon = iconMap[phase.icon] || Compass;
              const isActive = activeStep === idx;

              return (
                <button
                  key={phase.step}
                  onClick={() => setActiveStep(idx)}
                  className={`relative p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-b from-[#D4AF37]/15 to-[#D4AF37]/5 border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/5'
                      : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/[0.07]'
                  }`}
                >
                  {/* Top indicator bar */}
                  <div 
                    className={`absolute top-0 left-4 right-4 h-0.5 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-[#D4AF37]' : 'bg-transparent group-hover:bg-white/20'
                    }`} 
                  />

                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono font-bold tracking-wider ${
                      isActive ? 'text-[#D4AF37]' : 'text-white/40'
                    }`}>
                      STAGE {phase.step}
                    </span>
                    <div className={`p-2 rounded-xl transition-all ${
                      isActive ? 'bg-[#D4AF37] text-corp-navy-950' : 'bg-white/5 text-white/60 group-hover:text-white'
                    }`}>
                      <PhaseIcon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className={`font-display font-bold text-lg mb-1 transition-colors ${
                    isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                  }`}>
                    {phase.title}
                  </h3>
                  
                  <p className="text-[11px] text-white/50 line-clamp-2 leading-snug font-light">
                    {phase.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Display Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-corp-navy-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D4AF37]/10 blur-3xl rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Stage Branding & Core Statement */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-3">
                  <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                      STAGE {currentPhase.step} ADVISORY & EXECUTION
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                      {currentPhase.title}
                    </h3>
                  </div>
                </div>

                {/* Highlight Definition Box */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1">
                    Core Focus
                  </span>
                  <p className="text-base sm:text-lg font-medium text-white font-display">
                    {currentPhase.summary}
                  </p>
                </div>

                <p className="text-sm text-white/70 leading-relaxed font-light">
                  {currentPhase.description}
                </p>

                {/* Key Deliverables Bullet Points */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-semibold block">
                    Key Execution Deliverables
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentPhase.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-center space-x-2.5 bg-white/[0.03] border border-white/5 px-3.5 py-2.5 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                        <span className="text-xs text-white/80 font-light">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Stage Stepper Overview */}
              <div className="lg:col-span-5 bg-corp-navy-950/70 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                    TRANSFORMATION PIPELINE
                  </span>
                  <span className="text-xs font-mono text-white/40">
                    STAGE {activeStep + 1} OF 5
                  </span>
                </div>

                <div className="space-y-3">
                  {LIFECYCLE_PHASES.map((p, idx) => {
                    const isDone = idx < activeStep;
                    const isCurrent = idx === activeStep;

                    return (
                      <div 
                        key={p.step}
                        onClick={() => setActiveStep(idx)}
                        className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-white'
                            : isDone
                            ? 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                            : 'bg-transparent border-white/5 text-white/30 hover:text-white/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                            isCurrent
                              ? 'bg-[#D4AF37] text-corp-navy-950'
                              : isDone
                              ? 'bg-white/20 text-white'
                              : 'bg-white/5 text-white/30'
                          }`}>
                            {p.step}
                          </div>
                          <div className="min-w-0">
                            <span className="block text-xs font-bold font-display truncate">
                              {p.title}
                            </span>
                            <span className="block text-[10px] text-white/50 truncate font-light">
                              {p.summary}
                            </span>
                          </div>
                        </div>

                        {isCurrent && (
                          <ArrowRight className="w-4 h-4 text-[#D4AF37] flex-shrink-0 ml-2" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Next Step Quick Navigation */}
                <div className="pt-2 flex justify-between items-center text-xs font-mono">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                      activeStep === 0
                        ? 'opacity-30 cursor-not-allowed border-white/10 text-white/30'
                        : 'border-white/10 text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    ← Previous Stage
                  </button>

                  <button
                    disabled={activeStep === LIFECYCLE_PHASES.length - 1}
                    onClick={() => setActiveStep((prev) => Math.min(LIFECYCLE_PHASES.length - 1, prev + 1))}
                    className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                      activeStep === LIFECYCLE_PHASES.length - 1
                        ? 'opacity-30 cursor-not-allowed border-white/10 text-white/30'
                        : 'border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10'
                    }`}
                  >
                    Next Stage →
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
