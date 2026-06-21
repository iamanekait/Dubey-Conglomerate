import { useState, useEffect } from 'react';
import { 
  Compass, 
  Search, 
  Cpu, 
  Globe, 
  Zap, 
  DollarSign, 
  ChevronRight, 
  Info, 
  CheckCircle2, 
  X, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { Service } from '../types';
import TiltCard from './TiltCard';

interface ServicesProps {
  onOpenBooking: (serviceName?: string) => void;
}

const iconMap: Record<string, any> = {
  Compass: Compass,
  SearchCode: Search,
  Cpu: Cpu,
  GlobeIcon: Globe,
  Zap: Zap,
  DollarSign: DollarSign,
};

export default function ServicesSection({ onOpenBooking }: ServicesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'strategy' | 'operations' | 'finance'>('all');
  const [activeDetailService, setActiveDetailService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Microloader timer whenever user changes category tabs or executes searches
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  // Group services roughly to categorical tags
  const getCategory = (id: string): 'strategy' | 'operations' | 'finance' => {
    switch (id) {
      case 'strategy':
      case 'growth-expansion':
        return 'strategy';
      case 'market-research':
      case 'startup-advisory':
        return 'finance'; // startup is grouped in finance/strategy
      case 'optimization':
        return 'operations';
      case 'financial-operational':
        return 'finance';
      default:
        return 'strategy';
    }
  };

  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.detailedDescription.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && getCategory(service.id) === selectedCategory;
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-transparent text-white scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
              ADVISORY SPECIALTIES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Corporate Advisories Tailored for Market Domination
            </h2>
            <p className="text-sm text-white/60 font-light">
              We engineer custom procedures across six major high-value advisory operations, built to maximize 
              long-term liquidity and capture regional market shares.
            </p>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] focus:outline-none rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40"
              aria-label="Search consulting categories"
            />
          </div>
        </motion.div>

        {/* Categories Tab Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-4 items-center gap-1.5 sm:gap-2 mb-8 mx-auto backdrop-blur-md bg-white/5 p-1.5 rounded-2xl border border-white/10 w-full max-w-4xl"
        >
          {[
            { id: 'all', label: 'All Portfolios' },
            { id: 'strategy', label: 'Strategy & Growth' },
            { id: 'operations', label: 'Operations & Process' },
            { id: 'finance', label: 'Finance & Incubation' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`text-center px-1.5 sm:px-4 py-2.5 rounded-xl text-[9px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#D4AF37] text-[#050B18] font-extrabold shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Dynamic Service Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading-skeletons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {[...Array(6)].map((_, index) => (
                <div
                  key={`service-skeleton-${index}`}
                  className="backdrop-blur-md bg-white/5 rounded-3xl border border-white/10 p-6 sm:p-8 animate-pulse flex flex-col justify-between h-[360px]"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-white/10 rounded-xl" />
                      <div className="h-3 bg-white/10 rounded w-16" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-5 bg-white/10 rounded w-2/3" />
                      <div className="h-3.5 bg-white/10 rounded w-full" />
                      <div className="h-3.5 bg-white/10 rounded w-[88%]" />
                    </div>
                    <div className="pt-2 space-y-2.5">
                      <div className="h-2.5 bg-[#D4AF37]/15 rounded w-28" />
                      <div className="h-3 bg-white/5 rounded w-1/2" />
                      <div className="h-3 bg-white/5 rounded w-[60%]" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="h-3.5 bg-white/10 rounded w-28" />
                    <div className="h-3.5 bg-white/10 rounded w-12" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : filteredServices.length > 0 ? (
            <motion.div 
              key="services-list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredServices.map((service, index) => {
                const CustomIcon = iconMap[service.icon] || Compass;
                return (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    layoutId={`service-${service.id}`}
                  >
                    <TiltCard
                      className="backdrop-blur-md bg-white/5 rounded-3xl border border-white/10 p-6 sm:p-8 hover:bg-[#D4AF37]/5 transition-colors duration-300 relative overflow-hidden shadow-xl h-full flex flex-col justify-between"
                    >
                      {/* Subtle top decoration band */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="space-y-5">
                        {/* Header: Dynamic Icon */}
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 group-hover:bg-[#D4AF37] transition-all duration-300">
                            <CustomIcon className="w-5 h-5 text-[#D4AF37] group-hover:text-[#050B18] transition-colors" />
                          </div>
                          <span className="text-[10px] font-mono tracking-wider text-white/40 font-bold uppercase">
                            Syllabus {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Copystack */}
                        <div className="space-y-2">
                          <h3 className="font-display font-bold text-lg text-white group-hover:text-[#D4AF37] transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-xs text-white/60 leading-relaxed font-light line-clamp-3">
                            {service.shortDescription}
                          </p>
                        </div>

                        {/* Benefits Preview */}
                        <div className="pt-2">
                          <span className="text-[10px] font-mono uppercase text-[#D4AF37] block mb-2 font-bold tracking-wider">
                            KEY PROGRAM OUTCOMES:
                          </span>
                          <ul className="space-y-1.5">
                            {service.benefits.slice(0, 2).map((benefit) => (
                              <li key={benefit} className="flex items-start space-x-2 text-xs text-white/80">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-1">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Actions Bar */}
                      <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                        <button
                          onClick={() => setActiveDetailService(service)}
                          className="text-xs font-semibold text-white/80 hover:text-[#D4AF37] flex items-center space-x-1.5 cursor-pointer bg-transparent border-none outline-none"
                        >
                          <Info className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Analyze Program Scope</span>
                        </button>

                        <button
                          onClick={() => onOpenBooking(service.title)}
                          className="text-xs font-semibold flex items-center space-x-1 text-[#D4AF37] hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none"
                        >
                          <span>Inquire</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 backdrop-blur-md bg-white/5 rounded-3xl border border-white/10"
            >
              <span className="text-sm text-white/60 font-light block mb-2">
                No advisory programs match your current search coordinates.
              </span>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="text-xs font-bold text-[#D4AF37] underline cursor-pointer"
              >
                Reset Search Parameters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Specialty Syllabus Details Overlay Modal */}
      {activeDetailService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="backdrop-blur-xl bg-[#09101f]/95 rounded-3xl border border-white/20 w-full max-w-2xl overflow-hidden shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Header branding backdrop banner */}
            <div className="bg-white/5 px-6 py-8 text-white relative border-b border-white/10">
              <button
                onClick={() => setActiveDetailService(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/15 hover:bg-white/20 text-white transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold block mb-1">
                EXAMINATION SYLLABUS DOCK
              </span>
              <h4 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                {activeDetailService.title}
              </h4>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-bold block">
                  PROGRAM SYNOPSIS
                </span>
                <p className="text-sm text-white/80 leading-relaxed font-light">
                  {activeDetailService.detailedDescription}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-bold block">
                  DELIVERABLE OUTCOMES (KPI CHECKLIST):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeDetailService.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start space-x-2.5 p-3 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-white/90 leading-relaxed font-light">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 backdrop-blur-md bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl text-center">
                <span className="text-xs text-white/80 block mb-2">
                  Our advisors typically require <strong>3 to 5 business days</strong> to draft, evaluate, and calibrate 
                  your operational context prior to onboarding.
                </span>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="bg-white/5 border-t border-white/10 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-[10px] text-white/40 font-mono">
                DUBEY CONGLOMERATE • AUDIT MODULE
              </span>
              <div className="flex space-x-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveDetailService(null)}
                  className="flex-1 sm:flex-none py-2 px-4 rounded-full text-xs font-bold text-white border border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Close Scope
                </button>
                <button
                  onClick={() => {
                    const svcName = activeDetailService.title;
                    setActiveDetailService(null);
                    onOpenBooking(svcName);
                  }}
                  className="flex-1 sm:flex-none py-2 px-5 rounded-full bg-[#D4AF37] hover:scale-105 active:scale-95 text-[#050B18] font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  Book Program
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
