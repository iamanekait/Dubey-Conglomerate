import { useState, useEffect } from 'react';
import { Menu, X, Phone, FileText, ChevronRight, Briefcase } from 'lucide-react';
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

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About Us', href: '#about' },
    { label: 'Diagnostic Assessment', href: '#assessment' },
    { label: 'Why DC', href: '#why-us' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-xl bg-white/5 shadow-xl border-b border-white/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo and Navigation Group */}
            <div className="flex items-center space-x-12 lg:space-x-14 xl:space-x-16">
              {/* Brand Logo & Monogram */}
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#home');
                }}
                className="flex items-center space-x-3 group"
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
              </a>

              {/* Desktop Navigation Link Block */}
              <div className="hidden lg:flex items-center space-x-7">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className="text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-[#D4AF37] transition-colors duration-150"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Interaction Block */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={onOpenBooking}
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/95 hover:scale-105 text-black font-bold px-5 py-2 rounded-full text-xs uppercase tracking-wider shadow-lg transition-all duration-200 cursor-pointer"
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
            className="fixed inset-0 top-[60px] z-35 bg-[#0d1627]/95 backdrop-blur-2xl border-b border-white/10 lg:hidden flex flex-col px-6 py-8 space-y-6 overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold border-b border-white/10 pb-1">
                Advisory Menu
              </span>
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className="text-lg font-display text-white hover:text-[#D4AF37] py-1 transition-colors duration-150"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col space-y-4 pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAssessment();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-full border border-white/20 text-[#D4AF37] hover:bg-white/5 font-semibold text-xs uppercase tracking-wider transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Instant Diagnostic Scan</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all"
              >
                Schedule Private Consultation
              </button>
              <div className="flex items-center justify-center space-x-2 text-xs text-white/50 pt-2">
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
