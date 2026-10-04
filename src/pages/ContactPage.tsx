import PageHeader from '../components/PageHeader';
import ContactSection from '../components/ContactSection';
import ScrollFadeSection from '../components/ScrollFadeSection';
import SEO from '../components/SEO';

interface ContactPageProps {
  onOpenBooking: () => void;
}

export default function ContactPage({ onOpenBooking }: ContactPageProps) {
  return (
    <div className="bg-corp-navy-950 text-white min-h-screen">
      <SEO
        title="Contact Central Desk | Dubey Conglomerate"
        description="Initiate a confidential strategic brief or schedule an executive session with our senior advisory board in the Durgapur industrial belt."
        canonicalPath="/contact"
        keywords="Contact Dubey Conglomerate, Executive Consultation, Central Desk Durgapur, Confidential Strategic Review, Aniket Dubey"
      />

      <PageHeader
        badge="CENTRAL DESK & COMMUNICATIONS"
        title="Initiate a Confidential"
        highlightedTitle="Strategic Brief"
        description="Connect directly with our senior advisory board or file an encrypted strategic review brief. Located in the Durgapur industrial belt, serving enterprises globally."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Contact' }
        ]}
        actionButton={{
          label: 'Schedule Direct Meeting',
          onClick: onOpenBooking
        }}
      />

      <ScrollFadeSection>
        <ContactSection />
      </ScrollFadeSection>
    </div>
  );
}
