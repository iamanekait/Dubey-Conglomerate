import PageHeader from '../components/PageHeader';
import InteractiveScanner from '../components/InteractiveScanner';
import ScrollFadeSection from '../components/ScrollFadeSection';
import SEO from '../components/SEO';

interface InsightsPageProps {
  onOpenBooking: (serviceName?: string, notes?: string) => void;
}

export default function InsightsPage({ onOpenBooking }: InsightsPageProps) {
  return (
    <div className="bg-corp-navy-950 text-white min-h-screen">
      <SEO
        title="Insights & Strategic Diagnostics | Dubey Conglomerate"
        description="Run automated friction diagnostics and live technical audits. Evaluate operational bottlenecks, margin leakages, and benchmark digital performance."
        canonicalPath="/insights"
        keywords="Strategic Business Audit, Friction Diagnostic Scanner, Operational Health Check, Lighthouse Benchmark, Enterprise Insights, Dubey Conglomerate"
      />

      <PageHeader
        badge="DIAGNOSTIC SUITE"
        title="Enterprise Insights &"
        highlightedTitle="Diagnostic Calibration"
        description="Run real-time performance and friction diagnostics across your operations, digital assets, and organizational architecture to identify growth bottlenecks."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Insights' }
        ]}
        actionButton={{
          label: 'Book Consultation',
          onClick: () => onOpenBooking('Diagnostic Audit')
        }}
      />

      <ScrollFadeSection>
        <InteractiveScanner onOpenBooking={onOpenBooking} />
      </ScrollFadeSection>
    </div>
  );
}
