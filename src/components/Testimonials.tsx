import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Building2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Autoplay loop
  useEffect(() => {
    if (isLoading) return;
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(timer);
  }, [isLoading]);

  // Premium load timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-transparent text-white scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
            CLIENT ENDORSEMENTS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white animate-fade-in">
            Trusted by Leaders of High-Value Enterprises
          </h2>
          <p className="text-sm text-white/60 font-light">
            Read how we transformed operational workflows, structured corporate growth, and mitigated risk 
            for key partners throughout West Bengal and beyond.
          </p>
        </motion.div>

        {/* Slideshow Display Chassis */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-xl p-8 sm:p-12 overflow-hidden"
        >
          
          {/* Decorative Giant Quote Accent */}
          <div className="absolute top-4 left-6 opacity-[0.03] select-none text-white pointer-events-none">
            <Quote className="w-48 h-48" />
          </div>

          {isLoading ? (
            /* High-fidelity shimmering skeleton state */
            <div className="relative z-10 flex flex-col justify-between min-h-[16rem] animate-pulse space-y-6">
              <div className="space-y-4">
                {/* Pulsing Star Rating Row */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-white/10 rounded-full" />
                  ))}
                </div>

                {/* Shimmering Text Rows */}
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 rounded-md w-full" />
                  <div className="h-4 bg-white/10 rounded-md w-[92%]" />
                  <div className="h-4 bg-white/10 rounded-md w-[85%]" />
                </div>
              </div>

              {/* Shimmering Profile Row & Tags */}
              <div className="pt-6 mt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/10" />
                  <div className="space-y-2">
                    <div className="h-3.5 bg-white/10 rounded w-24" />
                    <div className="h-3 bg-white/5 rounded w-16" />
                  </div>
                </div>

                {/* Corporate metadata tag skeleton */}
                <div className="h-7 bg-white/10 rounded-lg w-28" />
              </div>
            </div>
          ) : (
            /* Main Loaded Content Block with delicate transitions */
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col justify-between min-h-[16rem]"
              >
                
                {/* Review Stars Block */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>

                  {/* Review Text Body */}
                  <p className="text-sm sm:text-base leading-relaxed text-white/85 font-light italic">
                    "{TESTIMONIALS[activeIndex].review}"
                  </p>
                </div>

                {/* Author Profile Block */}
                <div className="pt-6 mt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <Building2 className="w-4.5 h-4.5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">
                        {TESTIMONIALS[activeIndex].name}
                      </h4>
                      <span className="text-xs text-white/50 font-light block">
                        {TESTIMONIALS[activeIndex].role}
                      </span>
                    </div>
                  </div>

                  {/* Company Banner Tag */}
                  <span className="text-[11px] font-mono font-medium uppercase text-[#D4AF37] bg-[#D4AF37]/10 py-1.5 px-3 border border-[#D4AF37]/25 rounded-lg">
                    {TESTIMONIALS[activeIndex].company}
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          )}

          {/* Nav Buttons Overlay */}
          <div className="absolute right-4 top-4 flex space-x-1.5 z-20">
            <button
              onClick={prevTestimonial}
              disabled={isLoading}
              className="p-2 backdrop-blur-md bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#050B18] disabled:opacity-50 disabled:pointer-events-none rounded-xl transition-all cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextTestimonial}
              disabled={isLoading}
              className="p-2 backdrop-blur-md bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#050B18] disabled:opacity-50 disabled:pointer-events-none rounded-xl transition-all cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>

        {/* Carousel Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => !isLoading && setActiveIndex(index)}
              disabled={isLoading}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeIndex === index ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-white/20'
              } ${isLoading ? 'opacity-40 cursor-not-allowed' : ''}`}
              aria-label={`Go to testimonial slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
