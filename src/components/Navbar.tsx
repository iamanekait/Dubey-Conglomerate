import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import faviconDark from '../assets/images/favicon_dark_1781929946198.jpg';
import LazyImage from './LazyImage';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAssessment: () => void;
}

export default function Navbar({ onOpenBooking, onOpenAssessment }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change & handle body scroll lock
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Capabilities', path: '/capabilities' },
    { label: 'Perspective', path: '/perspective' },
    { label: 'Who We Are', path: '/who-we-are' },
    { label: 'Insights', path: '/insights' },
    { label: 'Why DC', path: '/why-dc' },
    { label: 'Alliances', path: '/alliances' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-xl bg-corp-navy-950/90 shadow-2xl border-b border-white/10 py-3'
            : 'backdrop-blur-md bg-corp-navy-950/60 border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo and Navigation Group */}
            <div className="flex items-center space-x-8 xl:space-x-12">
              {/* Brand Logo & Monogram */}
              <Link
                to="/"
                className="flex items-center space-x-3 group"
                aria-label="Dubey Conglomerate Home"
              >
                <div className="relative w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200 overflow-hidden">
                  <LazyImage src={faviconDark} alt="DC Monogram" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#D4AF37] border border-[#050B18] rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-lg leading-tight tracking-wider text-white group-hover:text-[#D4AF37] transition-colors duration-200">
                    DUBEY
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                    CONGLOMERATE
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Link Block */}
              <div className="hidden lg:flex items-center space-x-3 xl:space-x-5">
                {menuItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={`text-[11px] xl:text-xs uppercase tracking-wider py-1 relative transition-colors duration-200 ${
                        active
                          ? 'text-[#D4AF37] font-bold'
                          : 'text-white/70 hover:text-white font-medium'
                      }`}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                      {active && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA Interaction Block */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={onOpenBooking}
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/95 hover:scale-105 text-black font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-lg transition-all duration-200 cursor-pointer"
              >
                Book Consulting
              </button>
            </div>

            {/* Mobile Burger Trigger */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={onOpenBooking}
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow"
              >
                Book
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Block */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[56px] sm:top-[64px] z-50 bg-[#0d1627]/98 backdrop-blur-2xl border-b border-white/10 lg:hidden flex flex-col px-6 py-6 space-y-6 overflow-y-auto pb-[calc(4rem+env(safe-area-inset-bottom,0px))]"
          >
            <div className="flex flex-col space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono font-bold border-b border-white/10 pb-2">
                PORTAL DIRECTORY
              </span>
              {menuItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-base sm:text-lg font-display min-h-[44px] py-2.5 px-3.5 rounded-xl transition-all duration-150 flex items-center justify-between ${
                      active
                        ? 'text-[#D4AF37] bg-white/10 font-bold border-l-2 border-[#D4AF37]'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-white/30" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col space-y-4 pt-6 border-t border-white/10">
              <Link
                to="/insights"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-full border border-white/20 text-[#D4AF37] hover:bg-white/5 font-semibold text-xs uppercase tracking-wider transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Instant Diagnostic Scan</span>
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
              >
                Schedule Private Consultation
              </button>
              <div className="flex items-center justify-center space-x-2 text-xs text-white/50 pt-2 font-mono">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Primary Desk: Benachity, Durgapur</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
