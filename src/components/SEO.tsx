import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string;
  type?: 'website' | 'article';
  schemaData?: Record<string, any>;
}

export default function SEO({
  title,
  description,
  canonicalPath = '',
  keywords = 'Dubey Conglomerate, Experience Transformation Partner, Strategy, Design, Tech, Data, AI, Business Consulting, Aniket Dubey, Durgapur, West Bengal',
  type = 'website',
  schemaData
}: SEOProps) {
  const origin = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'https://dubeyconglomerate.vercel.app';
  const canonicalUrl = `${origin}${canonicalPath}`;
  const defaultOgImage = `${origin}/favicon_dark_1781929946198.jpg`;

  // Standard comprehensive Schema.org @graph featuring Organization, LocalBusiness (Durgapur), and WebSite
  const defaultSchemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        'name': 'Dubey Conglomerate',
        'legalName': 'Dubey Conglomerate',
        'alternateName': ['DC', 'DC Transformation Partner', 'Dubey Conglomerate Global'],
        'url': origin,
        'logo': {
          '@type': 'ImageObject',
          '@id': `${origin}/#logo`,
          'url': defaultOgImage,
          'caption': 'Dubey Conglomerate Monogram'
        },
        'image': { '@id': `${origin}/#logo` },
        'founder': {
          '@type': 'Person',
          'name': 'Aniket Dubey',
          'jobTitle': 'Founder & Principal Executive',
          'email': 'aniketdubey.2012@gmail.com'
        },
        'contactPoint': [
          {
            '@type': 'ContactPoint',
            'contactType': 'consulting & advisory inquiry',
            'email': 'email@dubeyconglomerate.com',
            'availableLanguage': ['English', 'Hindi', 'Bengali'],
            'areaServed': 'Worldwide'
          }
        ],
        'sameAs': [
          'https://dubeyconglomerate.vercel.app/'
        ],
        'description': description || 'Dubey Conglomerate combines strategy, design, AI, data, and engineering to reimagine enterprise operations and deliver measurable business outcomes.',
        'slogan': 'Experience Transformation Partner',
        'knowsAbout': [
          'Enterprise Architecture & Strategy',
          'Customer Experience (CX) Transformation',
          'Applied Generative AI Solutions',
          'Cloud-Native Systems & Modernization',
          'Strategic Diagnostics & Health Checks'
        ]
      },
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${origin}/#localbusiness`,
        'name': 'Dubey Conglomerate – Durgapur Headquarters & Executive Bureau',
        'parentOrganization': { '@id': `${origin}/#organization` },
        'url': canonicalUrl,
        'image': defaultOgImage,
        'email': 'email@dubeyconglomerate.com',
        'priceRange': '$$$$',
        'currenciesAccepted': 'INR, USD, EUR, GBP',
        'paymentAccepted': 'Bank Transfer, Corporate Invoice, Wire',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Benachity Commercial Quarter',
          'addressLocality': 'Durgapur',
          'addressRegion': 'West Bengal',
          'postalCode': '713213',
          'addressCountry': 'IN'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 23.5204,
          'longitude': 87.3119
        },
        'hasMap': 'https://maps.google.com/?q=Benachity,+Durgapur,+West+Bengal+713213',
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            'opens': '09:00',
            'closes': '18:00'
          }
        ],
        'areaServed': [
          {
            '@type': 'City',
            'name': 'Durgapur'
          },
          {
            '@type': 'AdministrativeArea',
            'name': 'West Bengal'
          },
          {
            '@type': 'Country',
            'name': 'India'
          },
          'Worldwide Enterprise Clients'
        ],
        'makesOffer': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Enterprise Strategy & Advisory',
              'description': 'Target operating model definition, digital portfolio prioritization, and roadmap acceleration.'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Human-Centric Experience (CX) Design',
              'description': 'Customer journey orchestration, multi-device UX design systems, and rapid prototyping.'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Applied Generative AI & Automation',
              'description': 'Custom reasoning agent workflows, LLM application development, and cognitive decision trees.'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Data Modernization & Real-Time Intelligence',
              'description': 'Scalable event-driven pipelines, analytics warehouses, and actionable enterprise telemetry.'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Strategic Friction Diagnostic Audit',
              'description': 'Interactive diagnostic assessment evaluating operational speed, margin resilience, and tech posture.'
            }
          }
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        'url': origin,
        'name': 'Dubey Conglomerate',
        'publisher': { '@id': `${origin}/#organization` },
        'inLanguage': 'en-US'
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        'url': canonicalUrl,
        'name': title,
        'description': description,
        'isPartOf': { '@id': `${origin}/#website` },
        'about': { '@id': `${origin}/#organization` },
        'inLanguage': 'en-US'
      }
    ]
  };

  const finalSchema = schemaData || defaultSchemaGraph;

  return (
    <Helmet>
      {/* Primary Page Title and Meta Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Dubey Conglomerate" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Geographic / Local Business Metas for Durgapur, West Bengal */}
      <meta name="geo.region" content="IN-WB" />
      <meta name="geo.placename" content="Durgapur, West Bengal" />
      <meta name="geo.position" content="23.5204;87.3119" />
      <meta name="ICBM" content="23.5204, 87.3119" />

      {/* OpenGraph / Facebook Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Dubey Conglomerate" />
      <meta property="og:image" content={defaultOgImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultOgImage} />

      {/* Structured Data (Schema.org JSON-LD with Organization and LocalBusiness) */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
}
