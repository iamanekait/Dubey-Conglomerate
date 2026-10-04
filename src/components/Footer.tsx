import { Link } from 'react-router-dom';
import { MapPin, Mail, ShieldCheck } from 'lucide-react';
import faviconDark from '../assets/images/favicon_dark_1781929946198.jpg';
import LazyImage from './LazyImage';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAssessment?: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  return (
    <footer className="backdrop-blur-xl bg-white/5 text-white pt-16 pb-12 border-t border-white/10 overflow-hidden relative pb-[calc(3rem+env(safe-area-inset-bottom,0px))]">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37] to-[#D4AF37]/40" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid: Info columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand description */}
          <div className="lg:col-span-5 space-y-5">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center shadow-lg overflow-hidden group-hover:scale-105 transition-transform">
                <LazyImage src={faviconDark} alt="DC Monogram" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base tracking-wider text-white group-hover:text-[#D4AF37] transition-colors">
                  DUBEY CONGLOMERATE
                </span>
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Experience Transformation Partner
                </span>
              </div>
            </Link>

            <p className="text-xs text-white/60 leading-relaxed font-light">
              We help organizations reimagine how they operate, engage, and create value by combining strategy, design, AI, data, and engineering into measurable business outcomes.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <span className="block text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
              PORTAL PAGES
            </span>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/capabilities" className="text-white/60 hover:text-[#D4AF37] transition-colors font-light">
                  Capabilities & Solutions
                </Link>
              </li>
              <li>
                <Link to="/perspective" className="text-white/60 hover:text-[#D4AF37] transition-colors font-light">
                  Transformation Lifecycle
                </Link>
              </li>
              <li>
                <Link to="/who-we-are" className="text-white/60 hover:text-[#D4AF37] transition-colors font-light">
                  Who We Are & Values
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-white/60 hover:text-[#D4AF37] transition-colors font-light">
                  Diagnostic Scanner
                </Link>
              </li>
              <li>
                <Link to="/why-dc" className="text-white/60 hover:text-[#D4AF37] transition-colors font-light">
                  Why DC Differentiators
                </Link>
              </li>
              <li>
                <Link to="/alliances" className="text-white/60 hover:text-[#D4AF37] transition-colors font-light">
                  Client Alliances & Proof
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/60 hover:text-[#D4AF37] transition-colors font-light">
                  Contact Central Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: General Contacts */}
          <div className="lg:col-span-4 space-y-4">
            <span className="block text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
              REGISTRATION DESK
            </span>
            <ul className="space-y-3 text-xs font-light text-white/70">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span className="font-light text-white/80">Benachity, Durgapur, West Bengal, India</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href="mailto:email@dubeyconglomerate.com" className="text-white/80 hover:text-[#D4AF37] transition-all break-all sm:break-normal">
                  email@dubeyconglomerate.com
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="font-light text-white/80">Certified Experience Transformation Partner</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>Book Strategic Consultation →</span>
              </button>
            </div>
          </div>

        </div>

        {/* Closing Sub-Copyright bar */}
        <div className="pt-8 border-t border-white/10 text-center text-xs text-white/50">
          Developed by{' '}
          <a
            href="https://dubeyconglomerate.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4AF37] hover:underline font-medium transition-all"
          >
            Dubey Conglomerate
          </a>
        </div>

      </div>
    </footer>
  );
}
