import PageHeader from '../components/PageHeader';
import LifecycleSection from '../components/LifecycleSection';
import ScrollFadeSection from '../components/ScrollFadeSection';
import SEO from '../components/SEO';

interface PerspectivePageProps {
  onOpenBooking: () => void;
}

export default function PerspectivePage({ onOpenBooking }: PerspectivePageProps) {
  return (
    <div className="bg-corp-navy-950 text-white min-h-screen">
      <SEO
        title="Perspective & Transformation Lifecycle | Dubey Conglomerate"
        description="Discover our 5-stage transformation lifecycle: Define, Design, Build, Launch, and Scale. Unify strategy, creativity, tech, data, and AI into compounding growth."
        canonicalPath="/perspective"
        keywords="Transformation Lifecycle, Define Design Build Launch Scale, Business Methodology, Enterprise Innovation Roadmap, Dubey Conglomerate"
      />

      <PageHeader
        badge="END-TO-END METHODOLOGY"
        title="The Transformation"
        highlightedTitle="Lifecycle Model"
        description="Explore how Dubey Conglomerate structures organizational change across Define, Design, Build, Launch, and Scale to deliver sustained competitive advantage."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Perspective' }
        ]}
        actionButton={{
          label: 'Schedule Briefing',
          onClick: onOpenBooking
        }}
      />

      <ScrollFadeSection>
        <LifecycleSection />
      </ScrollFadeSection>
    </div>
  );
}
