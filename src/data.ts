import { Service, Testimonial, MetricCard, DiagnosticQuestion } from './types';

export const CORE_VALUES = [
  {
    title: 'Absolute Integrity',
    description: 'Operating with unwavering ethical standards, complete transparency, and fiduciary excellence in all advisory relationships.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Precision Architecture',
    description: 'Structuring every advisory decision around hard, empirical data points and thorough financial modeling.',
    icon: 'Activity',
  },
  {
    title: 'Client-First Alliance',
    description: 'Fostering cohesive, long-term partnerships aimed at compound growth rather than short-term transactions.',
    icon: 'Briefcase',
  },
  {
    title: 'Enduring Impact',
    description: 'Creating foundational operational and administrative systems that scale reliably year after year.',
    icon: 'TrendingUp',
  }
];

export const SERVICES: Service[] = [
  {
    id: 'strategy',
    title: 'Business Strategy Consulting',
    shortDescription: 'Formulate defensible corporate strategies to maintain competitive edge, secure market share, and drive compounding valuation.',
    detailedDescription: 'Our strategic consulting services enable established conglomerates and high-potential enterprises to map out future milestones with absolute clarity. We construct customized operational blueprints designed to absorb market shocks and exploit emerging trends.',
    icon: 'Compass',
    benefits: [
      'Strategic market entry planning and defensibility reviews',
      'Corporate restructuring and functional alignment',
      'Joint venture guidance and asset delegation',
      'M&A advisory and target identification'
    ]
  },
  {
    id: 'market-research',
    title: 'Market Research & Analysis',
    shortDescription: 'Mitigate risk through deep-dive demographic profiling, competitor analysis, and macro-economic demand forecasting.',
    detailedDescription: 'Before you deploy critical capital, our intelligence teams analyze the micro and macro dynamics of your target arena. We unpack local insights within Eastern India (West Bengal, Bihar, Jharkhand) as well as global regulatory barriers.',
    icon: 'SearchCode',
    benefits: [
      'Aggregated consumer behavior analyses and sentiment mining',
      'Supply chain vulnerability maps and alternative sourcing guides',
      'Competitor stress-testing and price-elasticity modeling',
      'Geographic viability studies (retail, commercial, manufacturing)'
    ]
  },
  {
    id: 'optimization',
    title: 'Business Process Optimization',
    shortDescription: 'Identify and dismantle operational friction points to reclaim EBITDA margin and elevate delivery velocity.',
    detailedDescription: 'Through rigorous Six Sigma and Lean operational reviews, we audit internal workflows. We help businesses automate manual workloads, optimize inventory rotation, and upgrade inter-departmental telemetry.',
    icon: 'Cpu',
    benefits: [
      'Full-spectrum workflow bottlenecks identification and redesign',
      'Standard Operating Procedure (SOP) documentation and digital audit logs',
      'Enterprise resource tool stack evaluations (ERP & CRM alignment)',
      'Operational cost reduction and overhead mitigation'
    ]
  },
  {
    id: 'growth-expansion',
    title: 'Growth & Expansion Planning',
    shortDescription: 'Scale your footprint across regional borders, unlock franchise models, or establish new distribution channels.',
    detailedDescription: 'We help profitable enterprises break through regional plateaus. Our advisers construct the legal, financial, and logistic routes to expand safely from Durgapur to national frontiers.',
    icon: 'GlobeIcon',
    benefits: [
      'Franchise network modeling and compliance framework builds',
      'Cross-border and multi-state logistics channel design',
      'B2B partner network acquisition and contract negotiations',
      'Digital-first omni-channel growth campaigns planning'
    ]
  },
  {
    id: 'startup-advisory',
    title: 'Startup Advisory & Incubation',
    shortDescription: 'Equip early-phase founders with premium pitch architectures, cap-table strategy, and early investor readiness metrics.',
    detailedDescription: 'Turn raw technological and operational innovations into investable venture-backed business machines. We support founders with pitch structures, financial modeling, and early growth strategies.',
    icon: 'Zap',
    benefits: [
      'Venture pitch deck structuring and narration review',
      'Unit economics modeling and pricing strategy validation',
      'Advisory on compliance, GST, and seed financing protocols',
      'Go-To-Market (GTM) velocity plans'
    ]
  },
  {
    id: 'financial-operational',
    title: 'Financial & Operational Consulting',
    shortDescription: 'Implement strict treasury practices, optimize working capital pipelines, and implement resilient cost governance.',
    detailedDescription: 'Ensure high levels of liquidity and prudent capital allocation. We partner with CFOs and business owners to audit working capital cycles, balance debt structures, and maximize returns on capital employed (ROCE).',
    icon: 'DollarSign',
    benefits: [
      'Working capital efficiency reviews and cash-burn reduction programs',
      'Budgetary control systems and strict department cost governance',
      'Strategic capital structuring (debt-equity balance optimization)',
      'Risk mitigation architectures and long-term asset security planning'
    ]
  }
];

export const METRICS: MetricCard[] = [
  {
    id: 'clients',
    value: '180',
    prefix: '',
    suffix: '+',
    label: 'Corporate Entities Advised',
    description: 'Providing premium consulting to manufacturing units, trade networks, and tech ventures across India.'
  },
  {
    id: 'valuation',
    value: '1,500',
    prefix: '₹',
    suffix: ' Cr+',
    label: 'Client Capital Guided',
    description: 'We orchestrate capital strategies that optimize high-value asset portfolios and working capital flows.'
  },
  {
    id: 'satisfaction',
    value: '98',
    prefix: '',
    suffix: '%',
    label: 'Strategic Retention Rate',
    description: 'Our clients maintain multi-year partnership alliances with our advisory cabinet.'
  },
  {
    id: 'experience',
    value: '15',
    prefix: '',
    suffix: '+ Yrs',
    label: 'Collective Advisory Legacy',
    description: 'Led by seasoned industry captains and chartered operational professionals.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Rajesh Sen',
    role: 'Managing Director',
    company: 'Sen & Sons Industrial Steel Ltd, Asansol',
    review: 'Dubey Conglomerate restructured our entire factory dispatch logistical flow and saved us approx. 14% in annual operations leakage. Their custom process optimization work was detailed, objective, and executed with high corporate precision.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Priyanka Mukherjee',
    role: 'Co-Founder & COO',
    company: 'NeoAgro Supply Chain Solutions, Kolkata',
    review: 'The startup advisory we received from Dubey Conglomerate changed how we present unit economics. Thanks to their pitch validation metrics, we raised our pre-Series A funding seamlessly. Their advisory of the regulatory landscape in West Bengal is unmatched.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Anirban Lahiri',
    role: 'Director of Asset Management',
    company: 'Durgapur Plaza Hospitality Holdings',
    review: 'Having strategic advisors who physically understand the Benachity business belt and West Bengal markets made all the difference. Their market viability research is deeply analytical. We trust Dubey Conglomerate with our high-value commercial expansions.',
    rating: 5
  }
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'industry',
    question: 'Select your primary operational industry vertical:',
    type: 'select',
    options: [
      { value: 'manufacturing', label: 'Manufacturing & Heavy Industries', impact: 'High supply chain friction and energy overhead focus.' },
      { value: 'retail', label: 'Retail, Franchise & FMCG Networks', impact: 'High pressure on inventory turnovers and distribution routes.' },
      { value: 'tech', label: 'Software, IT & High-Growth Startups', impact: 'Unit economics and user-acquisition speed priorities.' },
      { value: 'healthcare', label: 'Healthcare, Clinical & Pharmaceuticals', impact: 'Strict regulatory matrices combined with scheduling bottlenecks.' },
      { value: 'realestate', label: 'Real Estate & Infrastructure Developers', impact: 'Capital structuring, long liquidity cycles, and project financing.' }
    ]
  },
  {
    id: 'biggest_challenge',
    question: 'Identify your most critical bottleneck/friction point:',
    type: 'select',
    options: [
      { value: 'margin', label: 'Decreasing Profit Margins / EBITDA Friction', impact: 'Process Optimization and Cost Governance Strategy recommended.' },
      { value: 'scale', label: 'Inability to scale out of the current city/state', impact: 'Growth & Expansion Strategy with Franchising options recommended.' },
      { value: 'capital', label: 'Working Capital crunch & inefficient credit lines', impact: 'Financial & Operational Consulting and Balance Sheet Restructuring recommended.' },
      { value: 'efficiency', label: 'Manual administrative processes and paper dependence', impact: 'Digital Transformation, ERP Audit, and automated workflow SOPs recommended.' }
    ]
  },
  {
    id: 'employee_count',
    question: 'Approximate scale of your human capital (Employee Count):',
    type: 'select',
    options: [
      { value: 'micro', label: '1 to 15 employees (Micro scale)', impact: 'Foundations and base legal, financial governance required.' },
      { value: 'mid', label: '16 to 100 employees (Mid scale)', impact: 'Formally documented SOPs and delegation architectures required.' },
      { value: 'enterprise', label: 'Over 100 employees (Enterprise scale)', impact: 'Continuous cost-reduction sprints and enterprise telemetry required.' }
    ]
  }
];
