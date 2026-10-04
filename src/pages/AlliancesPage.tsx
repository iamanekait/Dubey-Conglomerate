import PageHeader from '../components/PageHeader';
import Testimonials from '../components/Testimonials';
import ScrollFadeSection from '../components/ScrollFadeSection';
import SEO from '../components/SEO';

interface AlliancesPageProps {
  onOpenBooking: () => void;
}

export default function AlliancesPage({ onOpenBooking }: AlliancesPageProps) {
  return (
    <div className="bg-corp-navy-950 text-white min-h-screen">
      <SEO
        title="Client Alliances & Endorsements | Dubey Conglomerate"
        description="Read verified executive testimonials and measurable transformation results from corporate partners throughout West Bengal, India, and beyond."
        canonicalPath="/alliances"
        keywords="Client Endorsements, Enterprise Testimonials, Case Studies, Corporate Track Record, Client Reviews, Dubey Conglomerate"
      />

      <PageHeader
        badge="ENTERPRISE TRUST"
        title="Client Alliances &"
        highlightedTitle="Executive Endorsements"
        description="Explore verified outcomes and testimonials from business leaders and industrial enterprises that have partnered with Dubey Conglomerate."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Alliances' }
        ]}
        actionButton={{
          label: 'Initiate Alliance',
          onClick: onOpenBooking
        }}
      />

      <ScrollFadeSection>
        <Testimonials />
      </ScrollFadeSection>
    </div>
  );
}
