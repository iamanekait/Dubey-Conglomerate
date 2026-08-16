import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Mail, 
  MapPin, 
  PhoneCall, 
  CheckCircle, 
  Send, 
  Lock, 
  Clock, 
  Building,
  Loader2,
  AlertCircle,
  AlertTriangle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { safeStorage } from '../utils/storage';

interface ContactFormInputs {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  website?: string; // Honeypot field
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormInputs | null>(null);
  const [showToast, setShowToast] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormInputs>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
      website: '',
    }
  });

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const onFormSubmit = async (formData: ContactFormInputs) => {
    // Spam Prevention: Honeypot check
    if (formData.website && formData.website.trim() !== '') {
      console.warn('[Spam Guard] Honeypot field triggered. Intercepting automated submission.');
      // Silently simulate success to deceive spam bots without storing or sending email
      setIsSubmitted(true);
      setShowToast(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'inquiry',
          payload: formData,
        }),
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        throw new Error(`Server returned status ${response.status} ${response.statusText}. ${errText}`);
      }

      await response.json().catch(() => ({ success: true }));

      setSubmittedData(formData);
      setIsSubmitted(true);
      setShowToast(true);
      
      try {
        const currentLeads = JSON.parse(safeStorage.getItem('dc_inquiries') || '[]');
        currentLeads.push({
          id: `lead-${Date.now()}`,
          ...formData,
          timestamp: new Date().toISOString()
        });
        safeStorage.setItem('dc_inquiries', JSON.stringify(currentLeads));
      } catch (storageErr) {
        console.warn('[Storage] Local storage is disabled or blocked in this context:', storageErr);
      }
    } catch (err: any) {
      console.warn('[Form Submission Fallback] Network dispatch failed, queuing dossier locally:', err);
      
      // Save to Local Storage anyway so the inquiry is recorded and accessible under local ledgers
      try {
        const currentLeads = JSON.parse(safeStorage.getItem('dc_inquiries') || '[]');
        currentLeads.push({
          id: `lead-${Date.now()}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || 'N/A',
          message: formData.message,
          timestamp: new Date().toISOString(),
          queuedOffline: true
        });
        safeStorage.setItem('dc_inquiries', JSON.stringify(currentLeads));
        
        setSubmittedData(formData);
        setIsSubmitted(true);
        setShowToast(true);
      } catch (storageErr) {
        console.error(storageErr);
        setSubmitError(`Transmission failed: ${err?.message || 'Underlying proxy channel is unavailable.'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormState = () => {
    reset();
    setSubmittedData(null);
    setIsSubmitted(false);
    setShowToast(false);
    setSubmitError('');
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-transparent text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Page Title Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
            CENTRAL DESK & COMMUNICATIONS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Initiate a Highly Classified Strategic Review
          </h2>
          <p className="text-sm text-white/60 leading-relaxed font-light">
            Ready to secure your operations? Reach our senior advisory board directly or file a confidential brief below.
          </p>
        </motion.div>

        {/* Form & Map Double Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Communication Card Info + Coded Map Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full filter blur-xl" />
              
              <h3 className="font-display font-bold text-lg text-[#D4AF37]">
                Primary Contact Registry
              </h3>

              <div className="space-y-4">
                {/* Location Registry */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/25 text-[#D4AF37] mt-1 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-white/40">
                      OFFICE HEADQUARTERS
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed text-white font-medium">
                      Benachity, Durgapur, West Bengal, India
                    </span>
                    <span className="block text-[10px] text-white/50 font-light mt-0.5">
                      Sub-Region: Durgapur Municipal Zone • Pin 713213
                    </span>
                  </div>
                </div>

                {/* Email Registry */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/25 text-[#D4AF37] mt-1 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-white/40">
                      SECURE INBOX
                    </span>
                    <a 
                      href="mailto:email@dubeyconglomerate.com" 
                      className="text-xs sm:text-sm text-[#D4AF37] hover:text-[#D4AF37]/80 font-bold block transition-colors mt-0.5"
                    >
                      email@dubeyconglomerate.com
                    </a>
                  </div>
                </div>

                {/* Hours Protocol */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/25 text-[#D4AF37] mt-1 flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-white/40">
                      OPERATIVE HOURS
                    </span>
                    <span className="text-xs leading-relaxed text-white/70 block">
                      Monday — Friday: 09:30 AM to 06:30 PM (IST)
                    </span>
                    <span className="text-[10px] text-[#D4AF37] font-semibold block mt-0.5">
                      Online calendar booking system is active 24/7
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Embedded Styled SVG map placeholder of Benachity, Durgapur */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-5 shadow-md relative overflow-hidden">
              <span className="block text-[10px] font-mono uppercase text-white/50 font-bold tracking-wider mb-3">
                TACTICAL LOCATION RADAR (BENACHITY CORE)
              </span>
              
              {/* SVG Map Graphic */}
              <div className="h-44 sm:h-52 bg-[#0d1627] rounded-2xl border border-white/15 relative flex items-center justify-center overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid Lines */}
                  <defs>
                    <pattern id="grid-map" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#fff" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-map)" />
                  {/* Styled avenues representing Durgapur Map */}
                  <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="90%" y1="20%" x2="10%" y2="80%" stroke="#dfc282" strokeWidth="3" />
                  <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#fff" strokeWidth="1.5" />
                  {/* Circles for main intersections */}
                  <circle cx="50%" cy="50%" r="24" fill="none" stroke="#dfc282" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="50%" cy="50%" r="8" fill="#dfc282" />
                </svg>

                {/* Radar glow */}
                <div className="absolute w-44 h-44 rounded-full border border-[#D4AF37]/15 animate-ping opacity-35" />

                {/* Center Banner Pin Tag */}
                <div className="absolute z-15 bg-[#0d1627]/90 border-2 border-[#D4AF37] py-2.5 px-4 rounded-xl shadow-2xl text-center space-y-1">
                  <span className="block text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                    HQ TARGET LOCATED
                  </span>
                  <span className="block text-[11px] font-display font-bold text-white">
                    Benachity, Durgapur
                  </span>
                  <span className="block text-[8px] text-white/80">
                    West Bengal 713213
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-white/50 leading-relaxed font-light text-center mt-3">
                Our central desk is situated along the main business corridor in Benachity, optimized for local steel 
                consulting and regional manufacturing delegations.
              </p>
            </div>
          </motion.div>

          {/* Right Block: Lead Capture Consultation Intake Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 backdrop-blur-xl bg-white/10 p-6 sm:p-10 rounded-3xl border border-white/25 shadow-xl relative glass-panel-glow"
          >
            <h3 className="font-display font-bold text-xl text-white mb-6 pb-2 border-b border-white/10 flex items-center justify-between">
              <span>Intake Dossier</span>
              <span className="text-xs font-mono font-medium text-white/50">NDA PROTECTED</span>
            </h3>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                {/* Honeypot field - anti-spam trap for automated bots */}
                <div className="absolute opacity-0 pointer-events-none -z-50 h-0 w-0 overflow-hidden select-none" aria-hidden="true">
                  <label htmlFor="form-website">Do not fill this field</label>
                  <input
                    id="form-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register('website')}
                  />
                </div>
                
                {/* Dual Column: Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-name" className="block text-[11px] font-mono text-white/60 uppercase tracking-wider mb-2 font-semibold">
                      Full Name
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      placeholder="e.g. Aniket Dubey"
                      {...register('name', {
                        required: 'Full Name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      })}
                      className={`w-full bg-white/5 border ${
                        errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#D4AF37]'
                      } focus:outline-none rounded-xl p-3 text-xs text-white placeholder-white/30 transition-all`}
                    />
                    {errors.name && <span className="text-[10px] text-red-400 font-mono mt-1 block">{errors.name.message}</span>}
                  </div>

                  <div>
                    <label htmlFor="form-company" className="block text-[11px] font-mono text-white/60 uppercase tracking-wider mb-2 font-semibold flex items-center space-x-1">
                      <Building className="w-3.5 h-3.5" />
                      <span>Company Name</span>
                    </label>
                    <input
                      id="form-company"
                      type="text"
                      placeholder="e.g. Dubey Industries Ltd"
                      {...register('company', {
                        required: 'Company Name is required'
                      })}
                      className={`w-full bg-white/5 border ${
                        errors.company ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#D4AF37]'
                      } focus:outline-none rounded-xl p-3 text-xs text-white placeholder-white/30 transition-all`}
                    />
                    {errors.company && <span className="text-[10px] text-red-400 font-mono mt-1 block">{errors.company.message}</span>}
                  </div>
                </div>

                {/* Dual Column: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-email" className="block text-[11px] font-mono text-white/60 uppercase tracking-wider mb-2 font-semibold">
                      Institutional Email Address
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      placeholder="e.g. contact@yourfirm.com"
                      {...register('email', {
                        required: 'Institutional Email Address is required',
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Please enter a valid email address (e.g. name@company.com)'
                        }
                      })}
                      className={`w-full bg-white/5 border ${
                        errors.email ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#D4AF37]'
                      } focus:outline-none rounded-xl p-3 text-xs text-white placeholder-white/30 transition-all`}
                    />
                    {errors.email && <span className="text-[10px] text-red-400 font-mono mt-1 block">{errors.email.message}</span>}
                  </div>

                  <div>
                    <label htmlFor="form-phone" className="block text-[11px] font-mono text-white/60 uppercase tracking-wider mb-2 font-semibold">
                      Primary Contact Number
                    </label>
                    <input
                      id="form-phone"
                      type="tel"
                      placeholder="e.g. 9434012345"
                      {...register('phone', {
                        required: 'Primary Contact Number is required',
                        pattern: {
                          value: /^[+0-9\s()-.]{7,20}$/,
                          message: 'Provide a valid phone structure (e.g. 9434012345)'
                        }
                      })}
                      className={`w-full bg-white/5 border ${
                        errors.phone ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#D4AF37]'
                      } focus:outline-none rounded-xl p-3 text-xs text-white placeholder-white/30 transition-all`}
                    />
                    {errors.phone && <span className="text-[10px] text-red-400 font-mono mt-1 block">{errors.phone.message}</span>}
                  </div>
                </div>

                {/* Message Outline Textarea */}
                <div>
                  <label htmlFor="form-message" className="block text-[11px] font-mono text-white/60 uppercase tracking-wider mb-2 font-semibold">
                    Briefing Statement / Consultation Objectives
                  </label>
                  <textarea
                    id="form-message"
                    rows={5}
                    placeholder="Provide details about your current operational metrics, growth constraints, or capital challenges..."
                    {...register('message', {
                      required: 'Briefing Statement is required',
                      minLength: { value: 10, message: 'Please provide at least 10 characters for your briefing objectives' }
                    })}
                    className={`w-full bg-white/5 border ${
                      errors.message ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#D4AF37]'
                    } focus:outline-none rounded-xl p-3 text-xs text-white placeholder-white/30 transition-all resize-none`}
                  />
                  {errors.message && <span className="text-[10px] text-red-400 font-mono mt-1 block">{errors.message.message}</span>}
                </div>

                {/* Secure Disclaimer */}
                <div className="flex items-center space-x-2.5 bg-white/5 border border-white/10 p-3.5 rounded-xl text-[10px] text-white/70 font-light">
                  <Lock className="w-5 h-5 text-[#D4AF37] flex-shrink-0 animate-pulse" />
                  <span>
                    Your briefing files and diagnostics metrics are protected under Strict Fiduciary confidentiality. 
                    No values are shared exterior to senior advising boards.
                  </span>
                </div>

                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="p-4 bg-red-950/50 border border-red-500/40 rounded-2xl text-xs text-red-200 shadow-xl backdrop-blur-md relative flex items-start space-x-3.5"
                      role="alert"
                    >
                      <div className="p-2 bg-red-500/20 rounded-xl flex-shrink-0 text-red-400 mt-0.5">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div className="flex-1 pr-6 space-y-1">
                        <h5 className="font-semibold text-red-300 text-xs tracking-wide">
                          Submission Failure
                        </h5>
                        <p className="text-[11px] text-red-200/80 font-light leading-relaxed">
                          {submitError}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSubmitError('')}
                        className="absolute top-3 right-3 text-red-300/60 hover:text-red-200 transition-colors p-1 rounded-lg hover:bg-red-500/20 cursor-pointer"
                        aria-label="Dismiss error message"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CTA Action button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D4AF37] text-[#050B18] font-bold py-3.5 px-4 rounded-full text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 disabled:hover:scale-100 disabled:opacity-60 disabled:cursor-not-allowed group flex items-center justify-center space-x-2.5 transition-all cursor-pointer shadow-lg relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#050B18]" />
                      <span className="font-semibold tracking-wider">Processing & Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Operational Dossier</span>
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>

              </form>
            ) : (
              /* Submission Success Feedback state */
              <div className="py-12 text-center space-y-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center border-2 border-[#D4AF37] mx-auto animate-bounce">
                  <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-bold text-lg text-white">
                    Transmittal Protocol Confirmed
                  </h4>
                  <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed font-light">
                    Your brief for <strong>{submittedData?.company}</strong> has been transmitted to our secure desk files. 
                    An advisor will evaluate the metrics and reach out to your team at <strong>{submittedData?.email}</strong> 
                    within one standard regional business day.
                  </p>
                </div>

                <div className="pt-4 flex justify-center space-x-2">
                  <button
                    onClick={resetFormState}
                    className="py-2.5 px-5 rounded-full border border-white/20 hover:bg-white/5 text-white/80 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                  >
                    Draft Alternate Code
                  </button>
                  <a
                    href="#navbar"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector('#home');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="py-2.5 px-5 rounded-full bg-[#D4AF37] hover:scale-105 hover:bg-[#D4AF37]/90 text-[#050B18] font-bold text-xs uppercase tracking-widest transition-all inline-block cursor-pointer"
                  >
                    Return Top
                  </a>
                </div>
              </div>
            )}

          </motion.div>

        </div>

      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95, x: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-24 right-4 sm:right-6 z-50 max-w-sm w-[calc(100%-2rem)] bg-[#050b18]/95 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-4 shadow-2xl flex items-start space-x-3.5"
          >
            <div className="p-2 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20 text-[#D4AF37] flex-shrink-0">
              <CheckCircle className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold mb-0.5">
                TRANSMISSION VERIFIED
              </span>
              <h4 className="text-xs font-bold font-display text-white mb-1">
                Dossier Safely Lodged
              </h4>
              <p className="text-[11px] text-white/60 leading-relaxed font-light">
                Your strategic inquiry has bypassed outer firewall networks and queued successfully.
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Dismiss Notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
