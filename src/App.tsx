import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import ScrollToTop from './components/ScrollToTop';
import AdvisoryChatbot from './components/AdvisoryChatbot';
import ScrollProgressBar from './components/ScrollProgressBar';
import Preloader from './components/Preloader';
import ScrollToTopOnNavigate from './components/ScrollToTopOnNavigate';

// Dedicated Portal Pages
import HomePage from './pages/HomePage';
import CapabilitiesPage from './pages/CapabilitiesPage';
import PerspectivePage from './pages/PerspectivePage';
import AboutPage from './pages/AboutPage';
import InsightsPage from './pages/InsightsPage';
import WhyUsPage from './pages/WhyUsPage';
import AlliancesPage from './pages/AlliancesPage';
import ContactPage from './pages/ContactPage';

function AppContent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [presetNotes, setPresetNotes] = useState('');

  const handleOpenBooking = (serviceName: string = '', notes: string = '') => {
    // Redirect directly to the Zoom scheduler URL
    const zoomUrl = 'https://scheduler.zoom.us/aniketdubey/consultation';
    try {
      const win = window.open(zoomUrl, '_blank');
      if (!win) {
        window.location.href = zoomUrl;
      }
    } catch (e) {
      window.location.href = zoomUrl;
    }
  };

  const handleOpenAssessment = () => {
    navigate('/insights');
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

        {/* Dynamic Sticky Navigation Bar with active tab indicators */}
        <Navbar 
          onOpenBooking={() => handleOpenBooking()} 
          onOpenAssessment={handleOpenAssessment} 
        />

        {/* Main Routed Multi-Page Container */}
        <main className="flex-grow">
          <Routes>
            {/* Primary Tab Routes */}
            <Route 
              path="/" 
              element={
                <HomePage 
                  onOpenBooking={(service, notes) => handleOpenBooking(service, notes)} 
                  onOpenAssessment={handleOpenAssessment} 
                />
              } 
            />
            <Route path="/home" element={<Navigate to="/" replace />} />

            {/* Capabilities Tab */}
            <Route 
              path="/capabilities" 
              element={
                <CapabilitiesPage 
                  onOpenBooking={(service) => handleOpenBooking(service)} 
                />
              } 
            />
            <Route path="/services" element={<Navigate to="/capabilities" replace />} />

            {/* Perspective Tab */}
            <Route 
              path="/perspective" 
              element={
                <PerspectivePage 
                  onOpenBooking={() => handleOpenBooking('Transformation Lifecycle')} 
                />
              } 
            />
            <Route path="/lifecycle" element={<Navigate to="/perspective" replace />} />

            {/* Who We Are Tab */}
            <Route 
              path="/who-we-are" 
              element={
                <AboutPage 
                  onOpenBooking={() => handleOpenBooking('Executive Advisory')} 
                />
              } 
            />
            <Route path="/about" element={<Navigate to="/who-we-are" replace />} />

            {/* Insights & Diagnostics Tab */}
            <Route 
              path="/insights" 
              element={
                <InsightsPage 
                  onOpenBooking={(service, notes) => handleOpenBooking(service, notes)} 
                />
              } 
            />
            <Route path="/assessment" element={<Navigate to="/insights" replace />} />

            {/* Why DC Tab */}
            <Route 
              path="/why-dc" 
              element={
                <WhyUsPage 
                  onOpenBooking={() => handleOpenBooking('Strategic Synergy')} 
                />
              } 
            />
            <Route path="/why-us" element={<Navigate to="/why-dc" replace />} />

            {/* Alliances & Endorsements Tab */}
            <Route 
              path="/alliances" 
              element={
                <AlliancesPage 
                  onOpenBooking={() => handleOpenBooking('Enterprise Partnership')} 
                />
              } 
            />
            <Route path="/testimonials" element={<Navigate to="/alliances" replace />} />

            {/* Contact Central Desk Tab */}
            <Route 
              path="/contact" 
              element={
                <ContactPage 
                  onOpenBooking={() => handleOpenBooking('Central Desk Direct')} 
                />
              } 
            />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Executive Ledger Footer */}
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

        {/* Floating Utilities */}
        <ScrollToTop />
        <AdvisoryChatbot onOpenBooking={handleOpenBooking} />
      </div>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTopOnNavigate />
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}
