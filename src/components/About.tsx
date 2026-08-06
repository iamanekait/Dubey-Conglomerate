import { Compass, Palette, Cpu, Sparkles, Eye, Heart, ShieldCheck, Activity, Briefcase, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { CORE_VALUES } from '../data';

const iconMap: Record<string, any> = {
  Compass: Compass,
  Palette: Palette,
  Cpu: Cpu,
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
  Activity: Activity,
  Briefcase: Briefcase,
  TrendingUp: TrendingUp,
};

export default function About() {
  // Staggered childrens container config
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="about" className="py-20 sm:py-28 bg-transparent text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Double-Grid Story Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Narrative Branding Block */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                REINVENTING THE ENTERPRISE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Fusing Business Strategy, Human Creativity, Deep Tech, Data & AI
              </h2>
            </div>
            
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
              Traditional consulting firms separate business strategy from design and tech execution. At Dubey Conglomerate, 
              we bring together the disciplines of high-stakes corporate strategy, human-centric creative experience design, 
              full-stack cloud technology engineering, data analytics, and generative AI under one roof.
            </p>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
              Combining world-class strategic foresight with cutting-edge technology and human experience design, 
              we build integrated solutions that turn complex operational challenges into sustainable market leadership. 
              Whether modernizing core platforms or deploying autonomous AI agent workflows, we partner with executives to deliver 
              measurable economic value.
            </p>

            {/* Client Commitment Callout */}
            <div className="p-5 border-l-4 border-[#D4AF37] backdrop-blur-md bg-white/5 rounded-r-2xl border-y border-r border-white/10 space-y-2">
              <h3 className="font-display font-bold text-white text-sm">Our Undeviating Promise</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                "We do not deliver static slide decks. We partner with executive teams to design, code, build, and deploy 
                living transformations across Strategy, Creativity, Tech, Data, and AI that drive measurable bottom-line performance."
              </p>
              <span className="block text-[11px] font-semibold text-white/90 uppercase tracking-widest">
                — Managing Board, Dubey Conglomerate
              </span>
            </div>
          </motion.div>

          {/* Mission & Vision Bento Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            
            {/* Mission Card */}
            <div className="p-6 backdrop-blur-md bg-white/5 rounded-3xl shadow-xl text-white space-y-4 border border-white/10 hover:bg-[#D4AF37]/5 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full filter blur-xl" />
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                <Compass className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Our Mission</h3>
              <p className="text-xs text-white/75 leading-relaxed font-light">
                To equip progressive enterprises with world-class strategy, creative design, cloud engineering, predictive data platforms, and generative AI systems that unlock compounding value.
              </p>
            </div>

            {/* Vision Card */}
            <div className="p-6 backdrop-blur-md bg-white/5 rounded-3xl shadow-xl text-white space-y-4 border border-white/10 hover:bg-[#D4AF37]/5 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full filter blur-xl" />
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                <Eye className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Our Vision</h3>
              <p className="text-xs text-white/75 leading-relaxed font-light">
                To be the premier next-generation digital consulting partner globally, pioneering the fusion of human creativity and AI-driven enterprise transformation.
              </p>
            </div>

            {/* Purpose & Value Proposition Card spanning 2 cols on tablet */}
            <div className="sm:col-span-2 p-6 backdrop-blur-md bg-[#D4AF37]/5 rounded-3xl border border-[#D4AF37]/15 space-y-4 relative overflow-hidden font-display">
              <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center shadow-sm border border-[#D4AF37]/25">
                <Heart className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-bold text-lg text-[#D4AF37]">Integrated Transformation Architecture</h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                By synthesizing Strategy, Creativity, Tech, Data, and AI, we eliminate functional silos. Our multidisciplinary squads design intuitive experiences, engineer resilient architectures, and deploy intelligent AI agents that turn vision into reality.
              </p>
            </div>

          </motion.div>
        </div>

        {/* Core Value Pillars block */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
              THE CONGLOMERATE CONSTITUTION
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Our Core Operational Values
            </h2>
            <p className="text-sm text-white/60 mt-2 font-light">
              Every analyst, structural engineer, and senior partner inside Dubey Conglomerate operates under these strict 
              professional directives.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {CORE_VALUES.map((val) => {
              const CustomIcon = iconMap[val.icon] || ShieldCheck;
              return (
                <motion.div
                  key={val.title}
                  variants={itemVariants}
                  className="backdrop-blur-md bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 hover:scale-[1.02] shadow-xl transition-all duration-300"
                >
                  <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center mb-4 border border-white/20">
                    <CustomIcon className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-white mb-2">{val.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light">{val.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
