import PageHeader from '../components/PageHeader';
import About from '../components/About';
import ScrollFadeSection from '../components/ScrollFadeSection';
import SEO from '../components/SEO';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export default function AboutPage({ onOpenBooking }: AboutPageProps) {
  return (
    <div className="bg-corp-navy-950 text-white min-h-screen">
      <SEO
        title="Who We Are & Core Principles | Dubey Conglomerate"
        description="Meet Dubey Conglomerate, an Experience Transformation Partner led by Aniket Dubey. Learn about our leadership vision, heritage, and executive governance."
        canonicalPath="/who-we-are"
        keywords="About Dubey Conglomerate, Aniket Dubey, Corporate Leadership, Experience Transformation, Core Values, Strategic Advisory"
      />

      <PageHeader
        badge="INSTITUTIONAL HERITAGE"
        title="Who We Are &"
        highlightedTitle="Our Core Principles"
        description="Dubey Conglomerate is an Experience Transformation Partner led by Mr. Aniket Dubey. Discover our history, executive principles, and mission to deliver enduring value."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Who We Are' }
        ]}
        actionButton={{
          label: 'Meet Advisory Board',
          onClick: onOpenBooking
        }}
      />

      <ScrollFadeSection>
        <About />
      </ScrollFadeSection>
    </div>
  );
}
