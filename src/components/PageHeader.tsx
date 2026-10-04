import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface Breadcrumb {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  badge?: string;
  title: string;
  highlightedTitle?: string;
  description: string;
  breadcrumbs: Breadcrumb[];
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

export default function PageHeader({
  badge,
  title,
  highlightedTitle,
  description,
  breadcrumbs,
  actionButton,
}: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 bg-corp-navy-950 border-b border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-corp-gold-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 text-xs font-mono tracking-wider text-white/50 mb-6"
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.label}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-white/30" />}
                {crumb.path && !isLast ? (
                  <Link 
                    to={crumb.path} 
                    className="hover:text-[#D4AF37] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-[#D4AF37] font-semibold' : ''}>
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </motion.nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            {badge && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
              >
                <Sparkles className="w-3.5 h-3.5 text-corp-gold-400" />
                <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-corp-gold-300 font-semibold">
                  {badge}
                </span>
              </motion.div>
            )}

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]"
            >
              {title}{' '}
              {highlightedTitle && (
                <span className="block sm:inline bg-gradient-to-r from-corp-gold-300 via-corp-gold-400 to-corp-gold-500 bg-clip-text text-transparent">
                  {highlightedTitle}
                </span>
              )}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-2xl"
            >
              {description}
            </motion.p>
          </div>

          {actionButton && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex-shrink-0"
            >
              <button
                onClick={actionButton.onClick}
                className="bg-gradient-to-r from-corp-gold-500 to-corp-gold-600 hover:from-corp-gold-400 hover:to-corp-gold-500 text-corp-navy-950 font-bold px-6 py-3.5 rounded text-xs uppercase tracking-widest shadow-xl shadow-corp-gold-500/10 hover:shadow-corp-gold-500/20 transition-all duration-300 cursor-pointer"
              >
                {actionButton.label}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
