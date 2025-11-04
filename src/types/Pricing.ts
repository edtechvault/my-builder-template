/* src/types/Pricing.ts */
export interface PricingTier {
  id: string;
  name: string;
  price: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  popular?: boolean;
}
