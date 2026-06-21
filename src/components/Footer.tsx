import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Mail, 
  FileText, 
  ShieldCheck, 
  Trash2, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import faviconDark from '../assets/images/favicon_dark_1781929946198.jpg';
import LazyImage from './LazyImage';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAssessment: () => void;
}

export default function Footer({ onOpenBooking, onOpenAssessment }: FooterProps) {
  const [localBookings, setLocalBookings] = useState<any[]>([]);
  const [localLeads, setLocalLeads] = useState<any[]>([]);

  const fetchLocalStorageData = () => {
    try {
      const bookings = JSON.parse(localStorage.getItem('dc_consultations') || '[]');
      const leads = JSON.parse(localStorage.getItem('dc_inquiries') || '[]');
      setLocalBookings(bookings);
      setLocalLeads(leads);
    } catch (e) {
      console.error('Error fetching local ledgers', e);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchLocalStorageData();
    // Set periodic polling check to automatically refresh active dossiers
    const interval = setInterval(fetchLocalStorageData, 3000);
    return () => clearInterval(interval);
  }, []);

  const clearBookings = () => {
    if (window.confirm('Do you want to wipe local consultation records from this browser cache?')) {
      localStorage.removeItem('dc_consultations');
      localStorage.removeItem('dc_inquiries');
      setLocalBookings([]);
      setLocalLeads([]);
    }
  };

  return (
    <footer className="backdrop-blur-xl bg-white/5 text-white pt-16 pb-12 border-t border-white/10 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37] to-[#D4AF37]/40" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid: Info columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand description */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                <LazyImage src={faviconDark} alt="DC Monogram" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base tracking-wider text-white">
                  DUBEY CONGLOMERATE
                </span>
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Business Advisory Bureau
                </span>
              </div>
            </div>

            <p className="text-xs text-white/60 leading-relaxed font-light">
              We deliver premium, high-integrity strategy consulting, working-capital treasury coaching, 
              and lean operational process engineering for companies targeting compounding expansions 
              out of the Durgapur industrial belt.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <span className="block text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
              SOLUTIONS CORE
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="text-white/60 hover:text-[#D4AF37] transition-colors font-light">
                  Business Strategy
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/60 hover:text-[#D4AF37] transition-colors font-light">
                  Process Optimization
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/60 hover:text-[#D4AF37] transition-colors font-light">
                  Market Capital Audit
                </a>
              </li>
              <li>
                <a href="#assessment" className="text-white/60 hover:text-[#D4AF37] transition-colors font-light">
                  Diagnostic Scan
                </a>
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
                <a href="mailto:info@dubeyconglomerate.com" className="text-white/80 hover:text-[#D4AF37] transition-all">
                  info@dubeyconglomerate.com
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="font-light text-white/80">Certified Regulatory Adviser</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Closing Sub-Copyright bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 font-light gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span>
              © 2026 Dubey Conglomerate. All rights reserved.
            </span>
            <span className="block text-[10px] text-white/30">
              Headquarters: Benachity, Durgapur, West Bengal 713213.
            </span>
          </div>


        </div>

      </div>
    </footer>
  );
}
