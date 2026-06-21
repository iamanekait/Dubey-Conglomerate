import { 
  Award, 
  Settings2, 
  BarChart, 
  Network, 
  CheckSquare,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyUs() {
  const differentiators = [
    {
      title: 'Industry Expertise',
      description: 'Led by seasoned partners with cumulative decades of advisory experience across core manufacturing, logistics, finance, and heavy metallurgy sectors in India.',
      icon: Award,
      badge: 'Expertise',
      color: 'border-[#D4AF37]/20 bg-[#D4AF37]/10',
      iconColor: 'text-[#D4AF37]'
    },
    {
      title: 'Customized Strategic Blueprints',
      description: 'We do not sell pre-configured slides. Every process flowchart, cost control SOP, and expansion contract is built specifically for your local tax and resource framework.',
      icon: Settings2,
      badge: 'Tailored',
      color: 'border-[#D4AF37]/20 bg-[#D4AF37]/10',
      iconColor: 'text-[#D4AF37]'
    },
    {
      title: 'Data-Driven Decision-Making',
      description: 'We implement extensive empirical stress-testing. Your business growth decisions are backed directly by deep market demographic variables and microeconomic analysis.',
      icon: BarChart,
      badge: 'Empirical',
      color: 'border-[#D4AF37]/20 bg-[#D4AF37]/10',
      iconColor: 'text-[#D4AF37]'
    },
    {
      title: 'Long-Term Partnership Approach',
      description: 'We act as your dedicated auxiliary cabinet. We support you through continuous cycles and provide ongoing auditing, preventing post-strategic operational drift.',
      icon: Network,
      badge: 'Alignment',
      color: 'border-[#D4AF37]/20 bg-[#D4AF37]/10',
      iconColor: 'text-[#D4AF37]'
    },
    {
      title: 'Results-Oriented Consulting',
      description: 'We connect our fees with objective client growth. We focus on real-world outcomes — concrete cost reduction, verified EBITDA growth, and robust risk shielding.',
      icon: CheckSquare,
      badge: 'Accountable',
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
              THE DUBEY ADVANTAGE
            </span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Setting the Sovereign Standard in Business Counsel
          </h2>
          <p className="text-sm text-white/60 leading-relaxed font-light">
            We operate out of Durgapur’s primary business core, providing a class of strategic foresight and 
            operational risk shielding that standard firm agencies fail to construct.
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
            className="p-8 backdrop-blur-md bg-[#D4AF37]/5 text-white flex flex-col justify-between border border-[#D4AF37]/15 rounded-3xl shadow-xl relative overflow-hidden md:col-span-2 lg:col-span-1"
          >
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#D4AF37]/5 rounded-full filter blur-xl" />
            
            <div className="space-y-4 font-display">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#D4AF37] font-bold block">
                MANAGEMENT PHILOSOPHY
              </span>
              <h3 className="text-xl sm:text-2xl font-bold leading-tight text-[#D4AF37]">
                Corporate advisory built strictly around empirical performance parameters.
              </h3>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-light mt-2">
                At Dubey Conglomerate, we understand that high-quality recommendations are worthless without 
                tactical administrative discipline. We don't just draft reports; we guide you through step-by-step 
                implementation to secure actual economic milestones.
              </p>
            </div>

            <div className="pt-8 border-t border-white/10 mt-8 flex justify-between items-center text-[10px] uppercase font-mono text-white/50">
              <span>EST. BENACHITY, DURGAPUR</span>
              <span className="text-[#D4AF37] font-bold">★ ISO 9001 STATUS</span>
            </div>
          </motion.div>

          {/* Differentiators Grid Cells */}
          {differentiators.map((diff) => {
            const IconComponent = diff.icon;
            return (
              <motion.div
                key={diff.title}
                variants={cardVariants}
                className="backdrop-blur-md bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 hover:scale-[1.02] transition-all duration-300 shadow-xl flex flex-col justify-between"
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
                  <span>AUDITED VALUE</span>
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
