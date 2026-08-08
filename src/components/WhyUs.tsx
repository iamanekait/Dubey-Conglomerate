import { 
  Compass, 
  Palette, 
  Cpu, 
  Database, 
  Sparkles,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyUs() {
  const differentiators = [
    {
      title: 'Unified 5-Pillar Synergy',
      description: 'We eliminate organizational silos by seamlessly orchestrating Strategy, Creativity, Tech, Data, and AI into one continuous growth engine.',
      icon: Compass,
      badge: 'Strategy',
      color: 'border-[#D4AF37]/20 bg-[#D4AF37]/10',
      iconColor: 'text-[#D4AF37]'
    },
    {
      title: 'Human-Centered Creative Design',
      description: 'We design brand experiences, intuitive interfaces, and customer journeys that evoke emotion, build trust, and drive engagement.',
      icon: Palette,
      badge: 'Creativity',
      color: 'border-[#D4AF37]/20 bg-[#D4AF37]/10',
      iconColor: 'text-[#D4AF37]'
    },
    {
      title: 'Full-Stack Digital Engineering',
      description: 'We build modern cloud architectures, high-performance product studios, and resilient enterprise software built to scale effortlessly.',
      icon: Cpu,
      badge: 'Technology',
      color: 'border-[#D4AF37]/20 bg-[#D4AF37]/10',
      iconColor: 'text-[#D4AF37]'
    },
    {
      title: 'Predictive Data Telemetry',
      description: 'We turn fragmented customer data into actionable insights through real-time dashboards, CDPs, and predictive behavioral models.',
      icon: Database,
      badge: 'Data Intelligence',
      color: 'border-[#D4AF37]/20 bg-[#D4AF37]/10',
      iconColor: 'text-[#D4AF37]'
    },
    {
      title: 'Enterprise AI & Autonomous Workflows',
      description: 'We deploy generative AI models, custom copilots, and intelligent agentic automation to multiply team productivity and eliminate manual friction.',
      icon: Sparkles,
      badge: 'Generative AI',
      color: 'border-[#D4AF37]/20 bg-[#D4AF37]/10',
      iconColor: 'text-[#D4AF37]'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="why-us" className="py-20 sm:py-28 bg-transparent text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Why Choose Us Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center space-x-1.5 backdrop-blur-md bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#D4AF37] font-bold">
              THE EXPERIENCE TRANSFORMATION ADVANTAGE
            </span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Reimagining How Organizations Operate, Engage & Create Value
          </h2>
          <p className="text-sm text-white/60 leading-relaxed font-light">
            As an Experience Transformation Partner, we integrate Strategy, Creativity, Tech, Data, and AI to turn complex organizational challenges into measurable business outcomes.
          </p>
        </motion.div>

        {/* Bento Grid Concept Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          
          {/* Big Featured Brand Manifesto Box */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ 
              scale: 1.025,
              borderColor: 'rgba(212, 175, 55, 0.4)',
              boxShadow: '0 20px 40px -15px rgba(212, 175, 55, 0.35)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="p-8 backdrop-blur-md bg-[#D4AF37]/5 text-white flex flex-col justify-between border border-[#D4AF37]/15 rounded-3xl shadow-xl relative overflow-hidden md:col-span-2 lg:col-span-1"
          >
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#D4AF37]/5 rounded-full filter blur-xl" />
            
            <div className="space-y-4 font-display">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#D4AF37] font-bold block">
                INTEGRATED CONSULTING PHILOSOPHY
              </span>
              <h3 className="text-xl sm:text-2xl font-bold leading-tight text-[#D4AF37]">
                Reinventing how modern enterprises design, engineer, and scale.
              </h3>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-light mt-2">
                By uniting top-tier business strategists, creative designers, software architects, data scientists, and AI engineers, Dubey Conglomerate builds holistic digital transformation engines.
              </p>
            </div>

            <div className="pt-8 border-t border-white/10 mt-8 flex justify-between items-center text-[10px] uppercase font-mono text-white/50">
              <span>DUBEY CONGLOMERATE</span>
              <span className="text-[#D4AF37] font-bold">★ GLOBAL STANDARDS</span>
            </div>
          </motion.div>

          {/* Differentiators Grid Cells */}
          {differentiators.map((diff) => {
            const IconComponent = diff.icon;
            return (
              <motion.div
                key={diff.title}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.025,
                  borderColor: 'rgba(212, 175, 55, 0.4)',
                  boxShadow: '0 20px 40px -15px rgba(212, 175, 55, 0.35)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="backdrop-blur-md bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10 hover:bg-[#D4AF37]/5 transition-colors duration-300 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Badge & Icon Area */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase bg-white/5 border border-white/10 py-1 px-2.5 rounded-lg font-bold text-white/70">
                      {diff.badge}
                    </span>
                    <div className={`p-2 rounded-xl border ${diff.color}`}>
                      <IconComponent className={`w-5 h-5 ${diff.iconColor}`} />
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-base text-white">
                    {diff.title}
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    {diff.description}
                  </p>
                </div>
                
                {/* Visual Accent footer inside card */}
                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>TRANSFORMATION VALUE</span>
                  <span className="text-[#D4AF37] font-bold">100% SECURE</span>
                </div>
              </motion.div>
            );
          })}

        </motion.div>

      </div>
    </section>
  );
}
