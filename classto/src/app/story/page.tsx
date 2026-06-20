import React from "react";
import Image from "next/image";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function StoryPage() {
  return (
    <div className="bg-black text-on-surface pt-32 pb-24 font-sans select-none overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-32">
        
        {/* Intro Banner */}
        <SectionReveal className="text-center space-y-4">
          <span className="text-label-caps text-gold">OUR MANIFESTO</span>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide uppercase">
            Crafted for Permanence
          </h1>
          <p className="text-sm md:text-base font-sans text-on-surface-variant max-w-xl mx-auto font-light leading-relaxed">
            Classto sits at the intersection of high fashion, structural architecture, and extreme material discipline.
          </p>
        </SectionReveal>

        {/* Section 1: Sourcing & Fabric */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <SectionReveal className="space-y-6">
            <span className="text-label-caps text-gold">01 / Sourcing</span>
            <h2 className="font-serif text-3xl font-light leading-tight">The 240gsm Custom Weave</h2>
            <p className="text-sm text-on-surface-variant font-light leading-relaxed">
              Every garment begins at the fiber level. We source 100% extra-long staple Supima cotton grown exclusively in California. Our yarn is combed and double-spun into an ultra-fine, tight-gauge knit that reaches a structural 240 grams per square meter.
            </p>
            <p className="text-sm text-on-surface-variant font-light leading-relaxed">
              This heavyweight density yields a dramatic drape that remains perfectly vertical. It is a fabric built not for seasons, but for years of structural wear.
            </p>
          </SectionReveal>
          
          <SectionReveal delay={0.2} className="relative aspect-[4/5] bg-surface-dim overflow-hidden border border-border-hairline">
            <Image
              src="/images/products/obsidian-tee-1.jpg"
              alt="Supima Cotton Thread"
              fill
              className="object-cover"
            />
          </SectionReveal>
        </div>

        {/* Serif pull quote */}
        <SectionReveal className="text-center py-12 border-y border-border-hairline/40 max-w-3xl mx-auto">
          <p className="font-serif text-2xl md:text-3xl italic text-gold leading-relaxed font-light">
            &ldquo;We do not make clothing for trends. We design architecture for the body.&rdquo;
          </p>
        </SectionReveal>

        {/* Section 2: Silhouette & Tailoring */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <SectionReveal delay={0.2} className="relative aspect-[4/5] bg-surface-dim overflow-hidden border border-border-hairline order-last md:order-first">
            <Image
              src="/images/products/mockneck-1.jpg"
              alt="Drape and structure details"
              fill
              className="object-cover"
            />
          </SectionReveal>

          <SectionReveal className="space-y-6">
            <span className="text-label-caps text-gold">02 / Architecture</span>
            <h2 className="font-serif text-3xl font-light leading-tight">Proportion is Authority</h2>
            <p className="text-sm text-on-surface-variant font-light leading-relaxed">
              Our pattern cutters spend months adjusting millimeters. The dropped shoulder of the Obsidian Tee falls at a precise anatomical angle to prevent boxy bunching, while the neckline rib is tightly structured to hold its clean shape indefinitely.
            </p>
            <p className="text-sm text-on-surface-variant font-light leading-relaxed">
              By balancing weight with architectural minimalism, our shirts hang in a manner that commands visual authority without decorative noise.
            </p>
          </SectionReveal>
        </div>

        {/* Sourcing Sincerity / Ethics */}
        <SectionReveal className="space-y-8 bg-surface-dim/20 border border-border-hairline p-8 md:p-12">
          <span className="text-label-caps text-gold">Transparency</span>
          <h3 className="font-serif text-2xl md:text-3xl font-light">Ethical Precision</h3>
          <p className="text-sm text-on-surface-variant font-light leading-relaxed">
            We partner with a single multi-generational, family-owned knitting mill in Los Angeles, California. Every worker is paid a living wage and works in safety. By maintaining a localized, small-batch supply chain, we eliminate transit waste and ensure absolute control over the quality of every single double-needle stitch.
          </p>
        </SectionReveal>

      </div>
    </div>
  );
}
