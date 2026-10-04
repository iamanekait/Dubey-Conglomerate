import PageHeader from '../components/PageHeader';
import WhyUs from '../components/WhyUs';
import ScrollFadeSection from '../components/ScrollFadeSection';
import SEO from '../components/SEO';

interface WhyUsPageProps {
  onOpenBooking: () => void;
}

export default function WhyUsPage({ onOpenBooking }: WhyUsPageProps) {
  return (
    <div className="bg-corp-navy-950 text-white min-h-screen">
      <SEO
        title="Why Dubey Conglomerate | Unified 5-Pillar Synergy"
        description="Discover why enterprise leaders partner with Dubey Conglomerate. We eliminate organizational silos by integrating Strategy, Creativity, Tech, Data, and AI."
        canonicalPath="/why-dc"
        keywords="Why Dubey Conglomerate, Competitive Advantage, 5 Pillar Synergy, Integrated Consulting, Aniket Dubey"
      />

      <PageHeader
        badge="STRATEGIC ADVANTAGE"
        title="Why Partner With"
        highlightedTitle="Dubey Conglomerate"
        description="Experience the competitive leverage of orchestrating Strategy, Creativity, Tech, Data, and AI as one continuous growth engine without silos or handover friction."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Why DC' }
        ]}
        actionButton={{
          label: 'Engage DC Advisors',
          onClick: onOpenBooking
        }}
      />

      <ScrollFadeSection>
        <WhyUs />
      </ScrollFadeSection>
    </div>
  );
}
