import PageHeader from '../components/PageHeader';
import ServicesSection from '../components/ServicesSection';
import ScrollFadeSection from '../components/ScrollFadeSection';
import SEO from '../components/SEO';

interface CapabilitiesPageProps {
  onOpenBooking: (serviceName?: string) => void;
}

export default function CapabilitiesPage({ onOpenBooking }: CapabilitiesPageProps) {
  return (
    <div className="bg-corp-navy-950 text-white min-h-screen">
      <SEO
        title="Capabilities & Portfolios | Dubey Conglomerate"
        description="Explore our 10 transformation capabilities spanning strategy roadmaps, customer experience design, cloud engineering, data telemetry, and enterprise AI."
        canonicalPath="/capabilities"
        keywords="Enterprise Capabilities, Experience Transformation, Business Strategy, AI Solutions, Cloud Platforms, Data Analytics, Service Design, Dubey Conglomerate"
      />

      <PageHeader
        badge="SOLUTIONS CORE"
        title="Experience Transformation"
        highlightedTitle="Capabilities"
        description="We combine business strategy, customer experience design, modern digital engineering, predictive data analytics, and enterprise generative AI into measurable outcomes across Define, Design, Build, Launch, and Scale."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Capabilities' }
        ]}
        actionButton={{
          label: 'Book Consultation',
          onClick: () => onOpenBooking()
        }}
      />

      <ScrollFadeSection>
        <ServicesSection onOpenBooking={onOpenBooking} />
      </ScrollFadeSection>
    </div>
  );
}
