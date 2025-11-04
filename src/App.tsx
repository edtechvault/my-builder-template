import React from 'react';

/* Adjust paths if your folders differ */
import HeroAurora from './components/vault/HeroAurora';
import PricingTableFancy from './components/vault/PricingTableFancy';
import FAQAccordionFancy from './components/vault/FAQAccordionFancy';
import CTAButtonMagnet from './components/vault/CTAButtonMagnet';

import type { PricingTier } from './types/Pricing';
import type { FAQItem } from './types/FAQ';

const tiers: PricingTier[] = [
  { id: 'starter', name: 'Starter', price: '$499', features: ['1 page','Basic analytics','Email capture'], ctaLabel: 'Choose Starter', ctaHref: '#contact' },
  { id: 'pro', name: 'Pro', price: '$2,999', features: ['7-day delivery','Builder components','GA4 + events','A11y & SEO pass'], ctaLabel: 'Choose Pro', ctaHref: '#contact', popular: true },
  { id: 'scale', name: 'Scale', price: 'Custom', features: ['Lead gen system','A/B slots','Ongoing optimization'], ctaLabel: 'Talk to Sales', ctaHref: '#contact' },
];

const faqs: FAQItem[] = [
  { id: 'f1', question: 'How fast is delivery?', answer: 'Typical timeline is 7 days end-to-end, including QA.' },
  { id: 'f2', question: 'Can I edit content in Builder?', answer: 'Yes — all sections are Builder-registered and props-driven.' },
  { id: 'f3', question: 'Are events tracked?', answer: 'CTA clicks, form submits, and pricing impressions are tracked via GA4.' },
];

export default function App() {
  return (
    <main className="bg-base-100 text-base-content">
      <HeroAurora
        eyebrow="Course Creator Template"
        title="Launch in 7 Days"
        subtitle="Tokenized, accessible, analytics-ready — built for conversion."
        ctaLabel="Get a Demo"
        ctaHref="#contact"
        onCtaClickLocation="hero"
      >
        <CTAButtonMagnet label="See Pricing" href="#pricing" location="hero_secondary" />
      </HeroAurora>

      <section id="pricing">
        <PricingTableFancy
          sectionId="pricing-main"
          heading="Transparent Pricing"
          subheading="Pick the plan that fits your launch."
          tiers={tiers}
        />
      </section>

      <FAQAccordionFancy items={faqs} singleOpen />
    </main>
  );
}
