import { ShieldCheck, Activity, Briefcase, TrendingUp, Compass, Eye, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { CORE_VALUES } from '../data';

const iconMap: Record<string, any> = {
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
                OUR CORPORATE LEGACY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Pioneering Strategic Clarity Across Indian Enterprises
              </h2>
            </div>
            
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
              Founded on the belief that enduring business growth requires both structural precision and 
              local alignment, Dubey Conglomerate has grown into a leading business advisory firm in Eastern India. 
              Based in Benachity, Durgapur, our team bridges the gap between complex global consulting framework 
              systems and the pragmatic realities of regional logistics, commerce, and industrial management.
            </p>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
              We serve a highly diverse corporate network — from steel foundry units in Asansol to growing retail 
              franchises in Kolkata and tech-enabled startups. We reject cookie-cutter suggestions; instead, 
              we work alongside administrative committees and managing partners to audit processes, unlock EBITDA margins, 
              and build reliable treasury policies.
            </p>

            {/* Client Commitment Callout */}
            <div className="p-5 border-l-4 border-[#D4AF37] backdrop-blur-md bg-white/5 rounded-r-2xl border-y border-r border-white/10 space-y-2">
              <h3 className="font-display font-bold text-white text-sm">Our Undeviating Promise</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                "We measure our consulting legacy inside our client’s balance sheet. We commit fully to integrity, 
                data transparency, and process architectures that remain firm through changing economic cycles."
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
                To equip Indian and Global enterprise systems with bulletproof business strategies, optimized cost structures, 
                and rigorous management frameworks that accelerate growth, create jobs, and secure capital.
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
                To become India’s most trusted business advisory board, known globally for bridging high-precision 
                financial engineering with solid ground-level operational success.
              </p>
            </div>

            {/* Purpose & Value Proposition Card spanning 2 cols on tablet */}
            <div className="sm:col-span-2 p-6 backdrop-blur-md bg-[#D4AF37]/5 rounded-3xl border border-[#D4AF37]/15 space-y-4 relative overflow-hidden font-display">
              <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center shadow-sm border border-[#D4AF37]/25">
                <Heart className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-bold text-lg text-[#D4AF37]">A Focus on Lasting Partnerships</h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                We believe consulting is much more than delivering slide slop or static templates. Dubey Conglomerate 
                stands side-by-side with your management committees. We check execution parameters week-over-week, 
                auditing local and global milestones to ensure strategic suggestions yield tangible commercial result.
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
