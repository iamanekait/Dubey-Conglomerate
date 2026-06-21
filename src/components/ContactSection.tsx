import { useState, FormEvent } from 'react';
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
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simple, robust client-side validations
  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email structure';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(formData.phone.trim())) {
      tempErrors.phone = 'Provide a valid phone structure (e.g., 9434012345)';
    }
    if (!formData.company.trim()) tempErrors.company = 'Enterprise name is required';
    if (!formData.message.trim()) tempErrors.message = 'Please input a briefing statement';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const update = { ...prev };
        delete update[field];
        return update;
      });
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
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
          throw new Error('Failed to transmit central inquiry files.');
        }

        setIsSubmitted(true);
        // Store submission locally as a historical validation proof
        const currentLeads = JSON.parse(localStorage.getItem('dc_inquiries') || '[]');
        currentLeads.push({
          id: `lead-${Date.now()}`,
          ...formData,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('dc_inquiries', JSON.stringify(currentLeads));
      } catch (err: any) {
        console.error(err);
        setSubmitError('An error occurred while establishing transmission pipeline. Please retry.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetFormState = () => {
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    setIsSubmitted(false);
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
                      href="mailto:info@dubeyconglomerate.com" 
                      className="text-xs sm:text-sm text-[#D4AF37] hover:text-[#D4AF37]/80 font-bold block transition-colors mt-0.5"
                    >
                      info@dubeyconglomerate.com
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
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
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
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full bg-white/5 border ${
                        errors.name ? 'border-red-500' : 'border-white/10'
                      } focus:border-[#D4AF37] focus:outline-none rounded-xl p-3 text-xs text-white placeholder-white/30 transition-all`}
                    />
                    {errors.name && <span className="text-[10px] text-red-400 font-mono mt-1 block">{errors.name}</span>}
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
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className={`w-full bg-white/5 border ${
                        errors.company ? 'border-red-500' : 'border-white/10'
                      } focus:border-[#D4AF37] focus:outline-none rounded-xl p-3 text-xs text-white placeholder-white/30 transition-all`}
                    />
                    {errors.company && <span className="text-[10px] text-red-400 font-mono mt-1 block">{errors.company}</span>}
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
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full bg-white/5 border ${
                        errors.email ? 'border-red-500' : 'border-white/10'
                      } focus:border-[#D4AF37] focus:outline-none rounded-xl p-3 text-xs text-white placeholder-white/30 transition-all`}
                    />
                    {errors.email && <span className="text-[10px] text-red-400 font-mono mt-1 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label htmlFor="form-phone" className="block text-[11px] font-mono text-white/60 uppercase tracking-wider mb-2 font-semibold">
                      Primary Contact Number
                    </label>
                    <input
                      id="form-phone"
                      type="tel"
                      placeholder="e.g. 9434012345"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full bg-white/5 border ${
                        errors.phone ? 'border-red-500' : 'border-white/10'
                      } focus:border-[#D4AF37] focus:outline-none rounded-xl p-3 text-xs text-white placeholder-white/30 transition-all`}
                    />
                    {errors.phone && <span className="text-[10px] text-red-400 font-mono mt-1 block">{errors.phone}</span>}
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
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full bg-white/5 border ${
                      errors.message ? 'border-red-500' : 'border-white/10'
                      } focus:border-[#D4AF37] focus:outline-none rounded-xl p-3 text-xs text-white placeholder-white/30 transition-all resize-none`}
                  />
                  {errors.message && <span className="text-[10px] text-red-400 font-mono mt-1 block">{errors.message}</span>}
                </div>

                {/* Secure Disclaimer */}
                <div className="flex items-center space-x-2.5 bg-white/5 border border-white/10 p-3.5 rounded-xl text-[10px] text-white/70 font-light">
                  <Lock className="w-5 h-5 text-[#D4AF37] flex-shrink-0 animate-pulse" />
                  <span>
                    Your briefing files and diagnostics metrics are protected under Strict Fiduciary confidentiality. 
                    No values are shared exterior to senior advising boards.
                  </span>
                </div>

                {submitError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-300 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* CTA Action button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D4AF37] text-[#050B18] font-bold py-3.5 px-4 rounded-full text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 disabled:hover:scale-100 disabled:opacity-50 group flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#050B18]" />
                      <span>Transmitting Dossier...</span>
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
                    Your brief for <strong>{formData.company}</strong> has been transmitted to our secure desk files. 
                    An advisor will evaluate the metrics and reach out to your team at <strong>{formData.email}</strong> 
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
                    className="py-2.5 px-5 rounded-full bg-[#D4AF37] hover:scale-105 hover:bg-[#D4AF37]/90 text-[#050B18] font-bold text-xs uppercase tracking-widest transition-all inline-block"
                  >
                    Return Top
                  </a>
                </div>
              </div>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
}
