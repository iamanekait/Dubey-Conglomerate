import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Compass, 
  Palette, 
  Cpu, 
  Database, 
  Sparkles, 
  BarChart4, 
  ShieldCheck, 
  Building2, 
  Award, 
  Mail,
  ChevronRight,
  TrendingUp,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import Hero from '../components/Hero';
import ScrollFadeSection from '../components/ScrollFadeSection';
import SEO from '../components/SEO';

interface HomePageProps {
  onOpenBooking: (serviceName?: string, notes?: string) => void;
  onOpenAssessment: () => void;
}

export default function HomePage({ onOpenBooking, onOpenAssessment }: HomePageProps) {
  useEffect(() => {
    document.title = 'Dubey Conglomerate | Experience Transformation Partner';
  }, []);

  const portals = [
    {
      title: 'Capabilities',
      path: '/capabilities',
      badge: 'Solutions Core',
      icon: Compass,
      desc: 'Define, Design, Build, Launch, and Scale across 10 specialized enterprise portfolios.',
      action: 'Explore Capabilities'
    },
    {
      title: 'Perspective',
      path: '/perspective',
      badge: 'Methodology',
      icon: Layers,
      desc: 'Our proprietary 5-stage transformation lifecycle engineered for compounding enterprise value.',
      action: 'View Transformation Stages'
    },
    {
      title: 'Who We Are',
      path: '/who-we-are',
      badge: 'Heritage & Vision',
      icon: ShieldCheck,
      desc: 'Executive narrative, leadership principles, and our unwavering commitment to client value.',
      action: 'Read Corporate Narrative'
    },
    {
      title: 'Insights & Scanner',
      path: '/insights',
      badge: 'Diagnostic Tools',
      icon: BarChart4,
      desc: 'Calibrate operational friction, identify margin leakages, and benchmark digital performance.',
      action: 'Launch Diagnostic Scan'
    },
    {
      title: 'Why Dubey Conglomerate',
      path: '/why-dc',
      badge: 'Strategic Advantage',
      icon: Award,
      desc: 'The power of our unified 5-pillar synergy: Strategy, Creativity, Tech, Data, and AI combined.',
      action: 'Discover Differentiators'
    },
    {
      title: 'Alliances & Endorsements',
      path: '/alliances',
      badge: 'Client Track Record',
      icon: Building2,
      desc: 'Verified endorsements and measurable business impact across high-value industrial enterprises.',
      action: 'View Client Stories'
    },
    {
      title: 'Contact Central Desk',
      path: '/contact',
      badge: 'Encrypted Intake',
      icon: Mail,
      desc: 'Direct channels to our senior advisory board, official coordinates, and encrypted brief submission.',
      action: 'Initiate Confidential Brief'
    },
  ];

  const lifecycleStages = [
    { name: 'Define', desc: 'Business strategy, innovation, and transformation roadmap.' },
    { name: 'Design', desc: 'Customer experience, service design, and digital products.' },
    { name: 'Build', desc: 'Applications, enterprise platforms, cloud infrastructure, and AI solutions.' },
    { name: 'Launch', desc: 'Marketing, commerce, customer engagement, and go-to-market execution.' },
    { name: 'Scale', desc: 'Analytics, optimization, organizational change, and continuous innovation.' },
  ];

  return (
    <div className="space-y-0">
      <SEO
        title="Dubey Conglomerate | Experience Transformation Partner"
        description="Dubey Conglomerate combines strategy, design, AI, data, and engineering to reimagine enterprise operations and deliver measurable business outcomes."
        canonicalPath="/"
        keywords="Dubey Conglomerate, Experience Transformation Partner, Business Strategy, AI Solutions, Cloud Platforms, Enterprise Engineering, Aniket Dubey"
      />

      {/* Hero Section with Parallax Background & Key Stats */}
      <Hero 
        onOpenBooking={() => onOpenBooking()} 
        onOpenAssessment={onOpenAssessment} 
      />

      {/* Corporate Overview & Approach Section */}
      <ScrollFadeSection className="py-20 lg:py-24 bg-corp-navy-950 border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-corp-gold-500/5 blur-[140px] rounded-full pointer-events-none -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
              OUR UNIFIED APPROACH
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Strategy, Creativity, Tech, Data & AI
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
              We operate at the intersection of strategic consulting, customer-centric creative design, modern digital engineering, predictive data telemetry, and enterprise generative AI.
            </p>
          </div>

          {/* 5-Stage Transformation Lifecycle Preview */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-10 mb-16 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                  END-TO-END CAPABILITIES
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  The Transformation Lifecycle
                </h3>
              </div>
              <Link
                to="/perspective"
                className="inline-flex items-center space-x-2 text-xs font-mono text-[#D4AF37] hover:underline uppercase tracking-wider font-semibold"
              >
                <span>Explore Full Lifecycle</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-8">
              {lifecycleStages.map((stage, idx) => (
                <div 
                  key={stage.name}
                  className="bg-corp-navy-900/60 border border-white/5 p-5 rounded-xl flex flex-col justify-between hover:border-[#D4AF37]/30 transition-all group"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#D4AF37] font-bold">
                      0{idx + 1}
                    </span>
                    <h4 className="font-display text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {stage.name}
                    </h4>
                    <p className="text-xs text-white/60 font-light leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dimension Directory Cards */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                  DEDICATED PORTALS
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  Explore by Focus Area
                </h3>
              </div>
              <span className="text-xs font-mono text-white/40 hidden sm:block">
                Select a tab to view its dedicated page
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portals.map((portal) => {
                const Icon = portal.icon;
                return (
                  <Link
                    key={portal.path}
                    to={portal.path}
                    className="group relative bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-[#D4AF37]/5"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 group-hover:text-[#D4AF37] transition-colors">
                          {portal.badge}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="font-display text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                          <span>{portal.title}</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#D4AF37]" />
                        </h4>
                        <p className="text-xs text-white/60 font-light leading-relaxed">
                          {portal.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-white/5 flex items-center text-xs font-mono text-[#D4AF37] font-semibold space-x-1">
                      <span>{portal.action}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Action Consultation Banner */}
          <div className="mt-16 bg-gradient-to-r from-corp-navy-900 via-corp-navy-850 to-corp-navy-900 border border-[#D4AF37]/30 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                EXECUTIVE APPOINTMENT
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Ready to Reimagine Your Organization?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-xl font-light">
                Schedule a confidential working session directly with our senior advisory board or request a strategic audit for your enterprise.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-shrink-0">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto bg-gradient-to-r from-corp-gold-500 to-corp-gold-600 hover:from-corp-gold-400 hover:to-corp-gold-500 text-corp-navy-950 font-bold px-6 py-3.5 rounded text-xs uppercase tracking-widest shadow-xl shadow-corp-gold-500/10 transition-all cursor-pointer"
              >
                Schedule Consultation
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto text-center border border-white/20 hover:border-white/40 text-white font-bold px-6 py-3.5 rounded text-xs uppercase tracking-widest transition-all hover:bg-white/5"
              >
                Central Desk
              </Link>
            </div>
          </div>

        </div>
      </ScrollFadeSection>
    </div>
  );
}
