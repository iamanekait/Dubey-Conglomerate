import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import About from './components/About';
import InteractiveScanner from './components/InteractiveScanner';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import ScrollToTop from './components/ScrollToTop';
import AdvisoryChatbot from './components/AdvisoryChatbot';
import ScrollProgressBar from './components/ScrollProgressBar';
import Preloader from './components/Preloader';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [presetNotes, setPresetNotes] = useState('');

  const handleOpenBooking = (serviceName: string = '', notes: string = '') => {
    setPreselectedService(serviceName);
    setPresetNotes(notes);
    setIsBookingOpen(true);
  };

  const handleOpenAssessment = () => {
    const el = document.querySelector('#assessment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* High-fidelity Strategic Preloader */}
      <Preloader onComplete={() => setIsLoading(false)} />

      <div className="relative min-h-screen bg-corp-navy-950 text-white flex flex-col antialiased overflow-x-hidden">
        {/* Scroll Progress Indicator Bar */}
        <ScrollProgressBar />

      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-corp-gold-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-corp-gold-600/5 blur-[130px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      {/* Dynamic Sticky Navigation Bar */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenAssessment={handleOpenAssessment} 
      />

      {/* Main Corporate Portal Container */}
      <main className="flex-grow">
        
        {/* Section 1: Hero Block & Success Counters */}
        <Hero 
          onOpenBooking={() => handleOpenBooking()} 
          onOpenAssessment={handleOpenAssessment} 
        />

        {/* Section 2: Detailed Service Offerings Directory */}
        <ServicesSection 
          onOpenBooking={(serviceName) => handleOpenBooking(serviceName)} 
        />

        {/* Section 3: Corporate Narrative legacy & Core Values */}
        <About />

        {/* Section 4: Interactive Risk & Strategy Diagnostics Calibration */}
        <InteractiveScanner 
          onOpenBooking={(service, notes) => handleOpenBooking(service, notes)} 
        />

        {/* Section 5: Bento Differentiators */}
        <WhyUs />

        {/* Section 6: Star Rated Endorsements */}
        <Testimonials />

        {/* Section 7: Encrypted Lead Intake Portal */}
        <ContactSection />

      </main>

      {/* Section 8: Confidential Ledger Footer */}
      <Footer 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenAssessment={handleOpenAssessment} 
      />

      {/* Persistent Consultation Booking Overlay Modal */}
      <ConsultationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={preselectedService}
        presetNotes={presetNotes}
      />

      {/* Floating Action Utilities */}
      <ScrollToTop />
      <AdvisoryChatbot onOpenBooking={handleOpenBooking} />
    </div>
    </>
  );
}
