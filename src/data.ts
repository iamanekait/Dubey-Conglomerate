import { Service, Testimonial, MetricCard, DiagnosticQuestion, LifecyclePhase } from './types';

export const LIFECYCLE_PHASES: LifecyclePhase[] = [
  {
    step: '01',
    title: 'Define',
    summary: 'Business strategy, innovation, and transformation roadmap.',
    description: 'We construct defensible corporate strategies, analyze unit economics, define innovation agendas, and blueprint enterprise transformation roadmaps.',
    icon: 'Compass',
    deliverables: ['Corporate Strategy & GTM Blueprints', 'Business Model Innovation', 'Transformation Roadmap']
  },
  {
    step: '02',
    title: 'Design',
    summary: 'Customer experience, service design, and digital products.',
    description: 'We architect human-centered customer journeys, frictionless digital product interfaces, brand identities, and enterprise design systems.',
    icon: 'Palette',
    deliverables: ['CX & Service Design', 'UI/UX Product Architecture', 'Brand Experience & Systems']
  },
  {
    step: '03',
    title: 'Build',
    summary: 'Applications, enterprise platforms, cloud infrastructure, and AI solutions.',
    description: 'We engineer high-performance web and mobile applications, resilient cloud architectures, custom APIs, and agentic enterprise AI integrations.',
    icon: 'Cpu',
    deliverables: ['Cloud Infrastructure & Platforms', 'Full-Stack Software Development', 'Generative AI & LLM Systems']
  },
  {
    step: '04',
    title: 'Launch',
    summary: 'Marketing, commerce, customer engagement, and go-to-market execution.',
    description: 'We execute omnichannel growth campaigns, deploy modern digital commerce engines, optimize funnel conversion, and orchestrate market launches.',
    icon: 'Rocket',
    deliverables: ['Omnichannel GTM Execution', 'Digital Commerce Platforms', 'Customer Engagement Engines']
  },
  {
    step: '05',
    title: 'Scale',
    summary: 'Analytics, optimization, organizational change, and continuous innovation.',
    description: 'We establish real-time data telemetry, optimize operational performance, drive culture & change management, and foster continuous enterprise innovation.',
    icon: 'TrendingUp',
    deliverables: ['Real-Time Data Telemetry & CDP', 'Organizational Change Management', 'Continuous Optimization Engine']
  }
];

export const CORE_VALUES = [
  {
    title: 'Strategic Foresight',
    description: 'Constructing resilient corporate strategies, market entry blueprints, and experience transformation roadmaps.',
    icon: 'Compass',
  },
  {
    title: 'Creative Excellence',
    description: 'Designing human-centered customer experiences, brand identities, and immersive digital interfaces that resonate.',
    icon: 'Palette',
  },
  {
    title: 'Technological Mastery',
    description: 'Building modern cloud architectures, robust digital products, and high-performance enterprise platforms.',
    icon: 'Cpu',
  },
  {
    title: 'Data & AI Intelligence',
    description: 'Unlocking growth through predictive data analytics, customer data platforms, and agentic generative AI workflows.',
    icon: 'Sparkles',
  }
];

export const SERVICES: Service[] = [
  {
    id: 'strategy-transformation',
    title: 'Strategy & Business Transformation',
    shortDescription: 'Reinvent your operating model and formulate defensible corporate strategies to secure market leadership.',
    detailedDescription: 'Inspired by world-class consulting methodologies, our strategy practice bridges high-level vision with ground-level execution. We help enterprises reinvent business models, execute GTM strategies, and align organizational structure for sustainable growth.',
    icon: 'Compass',
    benefits: [
      'Corporate & Experience Transformation Roadmaps',
      'Market Entry, Competitor Defense & GTM Execution',
      'Business Model Innovation & Portfolio Optimization',
      'Organizational Agility & Functional Alignment'
    ]
  },
  {
    id: 'creative-experience',
    title: 'Creativity & Experience Design (CX/UX)',
    shortDescription: 'Deliver human-centric brand experiences, digital UI/UX, and customer journeys that build deep brand equity.',
    detailedDescription: 'Creativity is the ultimate growth differentiator. We combine design thinking, brand strategy, and interaction design to create frictionless customer touchpoints, immersive digital products, and compelling narrative experiences.',
    icon: 'Palette',
    benefits: [
      'Customer Experience (CX) & User Experience (UX) Architecture',
      'Brand Identity, Positioning & Creative Direction',
      'Omnichannel Customer Journey & Design System Builds',
      'Content Intelligence & Interactive Product Design'
    ]
  },
  {
    id: 'technology-engineering',
    title: 'Technology & Digital Engineering',
    shortDescription: 'Architect resilient cloud solutions, full-stack digital products, and scalable enterprise platforms.',
    detailedDescription: 'We build modern technological foundations that scale seamlessly. From modernizing legacy enterprise platforms to launching full-stack digital product studios, our engineering teams deliver speed, security, and performance.',
    icon: 'Cpu',
    benefits: [
      'Cloud Architecture, Microservices & Platform Modernization',
      'Full-Stack Web & Mobile Digital Product Development',
      'API Integration, Headless Architectures & DevOps',
      'Enterprise Software Audit & Infrastructure Hardening'
    ]
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics & Predictive Intelligence',
    shortDescription: 'Turn raw data into actionable intelligence with customer data platforms, telemetry, and predictive modeling.',
    detailedDescription: 'Data is the engine of modern competitive advantage. We implement end-to-end data pipelines, customer data platforms (CDP), and real-time operational dashboards that empower executive committees to make hyper-accurate decisions.',
    icon: 'Database',
    benefits: [
      'Customer Data Platforms (CDP) & Unified Data Fabrics',
      'Real-Time Operational Telemetry & EBITDA Analytics',
      'Predictive Customer Behavior & Demand Forecasting',
      'Business Intelligence Dashboards & KPI Monitoring'
    ]
  },
  {
    id: 'enterprise-ai',
    title: 'Enterprise AI & Agentic Automation',
    shortDescription: 'Deploy custom Generative AI, LLM solutions, and autonomous agentic workflows to multiply workforce productivity.',
    detailedDescription: 'Move from AI experimentation to scalable enterprise deployment. We integrate state-of-the-art Generative AI models, agentic workflows, and automated process intelligence directly into your existing business software stack.',
    icon: 'Sparkles',
    benefits: [
      'Custom LLM Integration & Enterprise AI Copilots',
      'Agentic Workflow Automation & Intelligent SOPs',
      'Natural Language Data Querying & Knowledge Engines',
      'AI Governance, Security & Model Fine-Tuning'
    ]
  },
  {
    id: 'growth-incubation',
    title: 'Growth Acceleration & Digital Incubation',
    shortDescription: 'Equip high-potential ventures with GTM execution, venture capital readiness, and scale-up engines.',
    detailedDescription: 'We help early-stage and expanding enterprises transition into market leaders. Our incubation practice offers pitch deck architecture, unit economics optimization, investor readiness metrics, and rapid scaling frameworks.',
    icon: 'Rocket',
    benefits: [
      'Venture Pitch Deck Architecture & Valuation Strategy',
      'Unit Economics Optimization & Pricing Validation',
      'Go-To-Market (GTM) Velocity & Customer Acquisition Engines',
      'Franchise & Multi-Region Expansion Frameworks'
    ]
  }
];

export const METRICS: MetricCard[] = [
  {
    id: 'transformations',
    value: '250',
    prefix: '',
    suffix: '+',
    label: 'Transformations Delivered',
    description: 'Empowering enterprises across strategy, creative design, technology, data, and artificial intelligence.'
  },
  {
    id: 'capital',
    value: '2,000',
    prefix: '₹',
    suffix: ' Cr+',
    label: 'Client Value Unlocked',
    description: 'Guiding corporate valuation growth, cost optimization, and market expansion across key sectors.'
  },
  {
    id: 'satisfaction',
    value: '99',
    prefix: '',
    suffix: '%',
    label: 'Strategic Retention Rate',
    description: 'Long-term advisory partnerships built on measurable business performance and innovation.'
  },
  {
    id: 'pillars',
    value: '5',
    prefix: '',
    suffix: ' Pillars',
    label: 'Unified Core Synergy',
    description: 'Seamless integration of Strategy, Creativity, Tech, Data, and AI in every solution.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Rajesh Sen',
    role: 'Managing Director',
    company: 'Sen & Sons Industrial Steel, Asansol',
    review: 'Dubey Conglomerate redefined our entire operational model. By combining strategic consulting with AI-driven predictive supply chain analytics, they reduced dispatch friction by 18% and gave us real-time EBITDA visibility.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Priyanka Mukherjee',
    role: 'Co-Founder & Chief Product Officer',
    company: 'NeoAgro Digital Solutions, Kolkata',
    review: 'The combination of creative experience design, full-stack product engineering, and AI agentic automation provided by Dubey Conglomerate transformed our platform. Our user engagement tripled within 90 days.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Anirban Lahiri',
    role: 'Director of Brand & Strategy',
    company: 'Durgapur Horizon Enterprises',
    review: 'Dubey Conglomerate brings world-class strategy, creative design, and AI sophistication to our enterprise. Their data analytics platform and strategic expansion plan allowed us to scale into three new regional markets smoothly.',
    rating: 5
  }
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'primary_focus',
    question: 'Select your primary strategic transformation priority:',
    type: 'select',
    options: [
      { value: 'define', label: 'Define – Business strategy, innovation, and transformation roadmap.', impact: 'Focus on business strategy, innovation, and transformation roadmap.' },
      { value: 'design', label: 'Design – Customer experience, service design, and digital products.', impact: 'Focus on customer experience, service design, and digital products.' },
      { value: 'build', label: 'Build – Applications, enterprise platforms, cloud infrastructure, and AI solutions.', impact: 'Focus on applications, enterprise platforms, cloud infrastructure, and AI solutions.' },
      { value: 'launch', label: 'Launch – Marketing, commerce, customer engagement, and go-to-market execution.', impact: 'Focus on marketing, commerce, customer engagement, and go-to-market execution.' },
      { value: 'scale', label: 'Scale – Analytics, optimization, organizational change, and continuous innovation.', impact: 'Focus on analytics, optimization, organizational change, and continuous innovation.' }
    ]
  },
  {
    id: 'biggest_challenge',
    question: 'Identify your most critical growth friction point:',
    type: 'select',
    options: [
      { value: 'margin', label: 'Decreasing Margins / Need for Cost & Process Optimization', impact: 'Strategy & Process Optimization with Data Telemetry recommended.' },
      { value: 'cx', label: 'Outdated Customer Experience & Low Digital Conversion', impact: 'Creativity & CX/UX Design System overhaul recommended.' },
      { value: 'legacy_tech', label: 'Legacy Tech Systems & Slow Product Delivery', impact: 'Technology Engineering & Cloud Platform Modernization recommended.' },
      { value: 'ai_adoption', label: 'Manual Workflows & Lack of AI/Automation Integration', impact: 'Enterprise AI & Agentic Workflow Automation recommended.' }
    ]
  },
  {
    id: 'organization_scale',
    question: 'Scale of your organization (Human Capital & Operations):',
    type: 'select',
    options: [
      { value: 'micro', label: '1 to 15 team members (Growth Phase)', impact: 'Fast-track digital incubation and GTM foundation strategy.' },
      { value: 'mid', label: '16 to 100 team members (Scaling Enterprise)', impact: 'Full-stack technology architecture and data pipeline integration.' },
      { value: 'enterprise', label: 'Over 100 team members (Corporate Leader)', impact: 'Enterprise AI deployment, corporate strategy, and experience transformation.' }
    ]
  }
];
