import { useState, FormEvent } from 'react';
import { X, Calendar, Clock, AlertCircle, CheckCircle, Shield, ArrowRight, Loader2 } from 'lucide-react';
import { SERVICES } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  presetNotes?: string;
}

export default function ConsultationModal({ 
  isOpen, 
  onClose, 
  preselectedService = '', 
  presetNotes = '' 
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: preselectedService || SERVICES[0].title,
    date: '',
    timeSlot: '10:00 AM',
    notes: presetNotes || '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: string, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (errorMsg) setErrorMsg('');
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.company || !formData.date) {
      setErrorMsg('All vital dossier coordinates are required to schedule.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // Dispatches the booking metadata over SMTP and stores on regional logs
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'booking',
          payload: formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to dispatch digital dossier pipeline.');
      }

      // Save under Local Storage inquiries
      const savedBookings = JSON.parse(localStorage.getItem('dc_consultations') || '[]');
      const newBooking = {
        id: `booking-${Date.now()}`,
        ...formData,
        status: 'confirmed',
        timestamp: new Date().toISOString()
      };
      savedBookings.push(newBooking);
      localStorage.setItem('dc_consultations', JSON.stringify(savedBookings));
      
      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('An error occurred during transmittal. Please check server connections and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    '10:00 AM - 11:30 AM (IST)',
    '11:30 AM - 01:00 PM (IST)',
    '02:00 PM - 03:30 PM (IST)',
    '03:30 PM - 05:00 PM (IST)',
    '05:00 PM - 06:30 PM (IST)',
  ];

  return (
    <div className="fixed inset-0 bg-[#050B18]/70 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="backdrop-blur-2xl bg-[#0b1220]/90 border border-white/20 w-full max-w-xl overflow-hidden shadow-2xl rounded-3xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-white/5 px-6 py-4 flex items-center justify-between text-white border-b border-white/10">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-[#D4AF37]">
              SECURE BOARD SCHEDULER
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/75 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Close scheduler"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSuccess ? (
          /* Main Interactive Scheduler Form */
          <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-4">
            
            <div className="text-center sm:text-left">
              <h3 className="font-display font-bold text-lg text-white">
                Strategic Consultation Booking
              </h3>
              <p className="text-xs text-white/50 font-light mt-1">
                Dossier coordinates will remain strictly confidential. Select desired portfolio and available time slots.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-300 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-3">
              {/* Double Fields: Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-name" className="block text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1.5 font-bold">
                    Principal Applicant
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    placeholder="Enter name..."
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] focus:outline-none rounded-xl p-2.5 text-xs text-white placeholder-white/20 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="modal-company" className="block text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1.5 font-bold">
                    Enterprise Legal Name
                  </label>
                  <input
                    id="modal-company"
                    type="text"
                    placeholder="Enter company..."
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] focus:outline-none rounded-xl p-2.5 text-xs text-white placeholder-white/20 transition-colors"
                  />
                </div>
              </div>

              {/* Double Fields: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-email" className="block text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1.5 font-bold">
                    Institutional Email
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    placeholder="contact@firm.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] focus:outline-none rounded-xl p-2.5 text-xs text-white placeholder-white/20 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="modal-phone" className="block text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1.5 font-bold">
                    Contact Number
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    placeholder="e.g. 9434012345"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] focus:outline-none rounded-xl p-2.5 text-xs text-white placeholder-white/20 transition-colors"
                  />
                </div>
              </div>

              {/* Service Selection Dropdown */}
              <div>
                <label htmlFor="modal-service" className="block text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1.5 font-bold">
                  Consultation Subject Matter
                </label>
                <select
                  id="modal-service"
                  value={formData.service}
                  onChange={(e) => handleInputChange('service', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] focus:outline-none rounded-xl p-2.5 text-xs text-white select-none [&>option]:bg-[#0d1627] [&>option]:text-white"
                >
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                  <option value="General Corporate Briefing">General Corporate Briefing / Inquiry</option>
                </select>
              </div>

              {/* Date & Time Slot Frame */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-date" className="block text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1.5 font-bold flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Select Date</span>
                  </label>
                  <input
                    id="modal-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] focus:outline-none rounded-xl p-2.5 text-xs text-white placeholder-white/20 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="modal-time" className="block text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1.5 font-bold flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Preferred Hour Slot</span>
                  </label>
                  <select
                    id="modal-time"
                    value={formData.timeSlot}
                    onChange={(e) => handleInputChange('timeSlot', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] focus:outline-none rounded-xl p-2.5 text-xs text-white select-none [&>option]:bg-[#0d1627] [&>option]:text-white"
                  >
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Custom Briefing Notes */}
              <div>
                <label htmlFor="modal-notes" className="block text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1.5 font-bold">
                  Preliminary Outline Notes (Optional)
                </label>
                <textarea
                  id="modal-notes"
                  rows={2}
                  placeholder="Detail any specific objectives or diagnostics indicators generated out of our scanner profile..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] focus:outline-none rounded-xl p-2.5 text-xs text-white placeholder-white/20 resize-none transition-colors"
                />
              </div>

            </div>

            {/* Fiduciary Shield Banner */}
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex items-center space-x-2.5 text-[9px] text-white/50 leading-relaxed font-light">
              <Shield className="w-4 h-4 text-[#D4AF37] flex-shrink-0 animate-pulse" />
              <span>
                By submitting corporate records, you establish a confidential advisory pre-alignment with Dubey Conglomerate. 
                Data remains encrypted inside regional memory grids.
              </span>
            </div>

            {/* Actions button footer */}
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border border-white/20 hover:bg-white/5 rounded-full text-xs font-semibold text-white/80 transition-all cursor-pointer"
              >
                Discard Dossier
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#D4AF37] text-black font-bold py-3 rounded-full text-xs uppercase tracking-widest hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50 flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Authorize Scheduler</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

          </form>
        ) : (
          /* Successful Appointment State */
          <div className="p-8 text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center border-2 border-[#D4AF37] mx-auto animate-bounce">
              <CheckCircle className="w-7 h-7 text-[#D4AF37]" />
            </div>

            <div className="space-y-2">
              <h4 className="font-display font-bold text-lg text-white">
                Strategic Consulting Reserved
              </h4>
              <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed font-light">
                Your private board session for <strong>{formData.company}</strong> has been secured! 
                An advisor will send access information and details for your meeting slot on: 
                <strong className="text-[#D4AF37] font-semibold block mt-1">
                  {formData.date} at {formData.timeSlot}
                </strong>
              </p>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-[10px] text-white/50 max-w-sm mx-auto">
              A private agenda file has been sent to <strong>{formData.email}</strong>. 
              Keep this screen active or save details.
            </div>

            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="py-2.5 px-6 rounded-full bg-white/10 hover:bg-[#D4AF37] text-white hover:text-black text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
            >
              Close Ledger
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
