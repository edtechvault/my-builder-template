import { Builder } from "@builder.io/react";
// @ts-ignore - importing a .tsx module while 'jsx' isn't set in tsconfig; set "jsx": "react-jsx" in tsconfig.json as a proper fix
import HeroAurora from "./src/components/vault/HeroAurora";
// @ts-ignore - importing a .tsx module while 'jsx' isn't set in tsconfig; set "jsx": "react-jsx" in tsconfig.json as a proper fix
import HeroParticles from "./src/components/vault/HeroParticles";
// @ts-ignore - importing a .tsx module while 'jsx' isn't set in tsconfig; set "jsx": "react-jsx" in tsconfig.json as a proper fix
import CTAButtonMagnet from "./src/components/vault/CTAButtonMagnet";
// @ts-ignore - importing a .tsx module while 'jsx' isn't set in tsconfig; set "jsx": "react-jsx" in tsconfig.json as a proper fix
import SpotlightTestimonialCard from "./components/vault/SpotlightTestimonialCard";
// @ts-ignore - importing a .tsx module while 'jsx' isn't set in tsconfig; set "jsx": "react-jsx" in tsconfig.json as a proper fix
import PricingTableFancy from "./src/components/vault/PricingTableFancy";
// @ts-ignore - importing a .tsx module while 'jsx' isn't set in tsconfig; set "jsx": "react-jsx" in tsconfig.json as a proper fix
import FAQAccordionFancy from "./src/components/vault/FAQAccordionFancy";

export function registerBuilderComponents() {
  Builder.registerComponent(HeroAurora, {
    name: "HeroAurora",
    inputs: [
      { name: "eyebrow", type: "string" },
      { name: "title", type: "string", required: true },
      { name: "subtitle", type: "string" },
      { name: "ctaLabel", type: "string" },
      { name: "ctaHref", type: "string" },
      { name: "onCtaClickLocation", type: "string", defaultValue: "hero" },
      { name: "children", type: "uiBlocks" },
    ],
  });

  Builder.registerComponent(HeroParticles, {
    name: "HeroParticles",
    inputs: [
      { name: "title", type: "string", required: true },
      { name: "subtitle", type: "string" },
      { name: "ctaLabel", type: "string" },
      { name: "ctaHref", type: "string" },
      { name: "onCtaClickLocation", type: "string", defaultValue: "hero" },
      { name: "particlesCount", type: "number", defaultValue: 25, helperText: "Keep low for performance" },
    ],
  });

  Builder.registerComponent(CTAButtonMagnet, {
    name: "CTAButtonMagnet",
    inputs: [
      { name: "label", type: "string", required: true },
      { name: "href", type: "string" },
      { name: "location", type: "string", defaultValue: "cta" },
    ],
  });

  Builder.registerComponent(SpotlightTestimonialCard, {
    name: "SpotlightTestimonialCard",
    inputs: [{
      name: "testimonial",
      type: "object",
      subFields: [
        { name: "quote", type: "longText", required: true },
        { name: "author", type: "string", required: true },
        { name: "title", type: "string" },
        { name: "avatarUrl", type: "string" },
        { name: "rating", type: "number" },
      ],
    }],
  });

  Builder.registerComponent(PricingTableFancy, {
    name: "PricingTableFancy",
    inputs: [
      { name: "sectionId", type: "string", defaultValue: "pricing" },
      { name: "heading", type: "string", defaultValue: "Pricing" },
      { name: "subheading", type: "string" },
      {
        name: "tiers",
        type: "list",
        subFields: [
          { name: "id", type: "string", required: true },
          { name: "name", type: "string", required: true },
          { name: "price", type: "string", required: true },
          { name: "features", type: "list", subFields: [{ name: "item", type: "string" }] },
          { name: "ctaLabel", type: "string", required: true },
          { name: "ctaHref", type: "string", required: true },
          { name: "popular", type: "boolean" },
        ],
      },
    ],
  });

  Builder.registerComponent(FAQAccordionFancy, {
    name: "FAQAccordionFancy",
    inputs: [
      { name: "singleOpen", type: "boolean", defaultValue: false },
      {
        name: "items",
        type: "list",
        subFields: [
          { name: "id", type: "string" },
          { name: "question", type: "string", required: true },
          { name: "answer", type: "longText", required: true },
        ],
      },
    ],
  });
}
