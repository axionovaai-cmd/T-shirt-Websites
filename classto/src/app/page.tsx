import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/commerce/api";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-black text-on-surface select-none">
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Full-bleed Editorial Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-model.jpg"
            alt="Classto Editorial Campaign"
            fill
            priority
            className="object-cover opacity-60 scale-100 animate-[subtle-zoom_20s_infinite_alternate]"
          />
          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/80" />
        </div>

        {/* Wordmark Overlay */}
        <div className="relative z-10 text-center flex flex-col items-center justify-center h-full px-6 max-w-4xl">
          <SectionReveal duration={1.2}>
            <h1 className="font-serif text-[48px] md:text-[96px] leading-tight tracking-[0.1em] text-on-surface uppercase mb-6 drop-shadow-md">
              CLASSTO
            </h1>
          </SectionReveal>
          
          <SectionReveal duration={1.2} delay={0.3}>
            <p className="text-label-caps text-gold tracking-[0.25em] mb-12">
              MONOLITH LUXURY ESSENTIALS
            </p>
          </SectionReveal>

          <SectionReveal duration={1.2} delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="technical" size="lg">
                <Link href="/shop">SHOP THE COLLECTION</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/story">DISCOVER THE CRAFT</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.3em] text-on-surface-variant font-sans font-light uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent animate-bounce" />
        </div>
      </section>

      {/* 2. Brand Statement Strip */}
      <section className="py-24 md:py-36 px-6 bg-black border-y border-border-hairline/40">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <p className="font-serif text-2xl md:text-4xl text-on-surface leading-relaxed font-light tracking-wide text-balance">
              &ldquo;Architectural silhouettes, heavyweight drapery, and a clinical devotion to details. Designed for permanence, crafted for the discerning.&rdquo;
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* 3. Featured Collection Grid */}
      <section id="collections" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionReveal className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-border-hairline pb-4">
          <div className="space-y-1">
            <span className="text-label-caps text-gold">CURATED STAPLES</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-on-surface">
              The Essentials
            </h2>
          </div>
          <Link 
            href="/shop" 
            className="text-label-caps text-on-surface-variant hover:text-gold transition-colors duration-300 mt-4 md:mt-0"
          >
            Shop All Collections &rarr;
          </Link>
        </SectionReveal>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
          {featuredProducts.map((product, idx) => (
            <SectionReveal key={product.id} delay={idx * 0.1}>
              <ProductCard product={product} />
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* 4. "The Craft" Section */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-surface-dim/40 border-t border-border-hairline">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Editorial Content */}
          <SectionReveal className="space-y-8">
            <span className="text-label-caps text-gold">FABRIC & DESIGN</span>
            <h3 className="font-serif text-3.5xl md:text-5xl text-on-surface font-light leading-tight">
              Honoring Weight.
              <br />
              Mastering Silhouette.
            </h3>
            <p className="text-body-lg text-on-surface-variant/80 font-light leading-relaxed font-sans">
              Our custom jersey fabric is spun from 100% long-staple Supima cotton, reaching an optimal 240gsm. This structural weight guarantees a clean vertical drape that resists warping and retains form over years of wear. 
            </p>
            <p className="text-body-md text-on-surface-variant/70 font-light leading-relaxed font-sans">
              We design with tight, structured mockneck ribs and dropped shoulders, engineering a balance between modern street aesthetics and classic architectural proportions. Every seam is double-needle reinforced, honoring industrial resilience in a refined digital luxury space.
            </p>
            <div className="pt-4">
              <Button asChild variant="secondary">
                <Link href="/story">LEARN MORE ABOUT SOURCING</Link>
              </Button>
            </div>
          </SectionReveal>

          {/* Sourcing Image */}
          <SectionReveal delay={0.2} className="relative aspect-[4/5] bg-surface-dim overflow-hidden border border-border-hairline">
            <Image
              src="/images/products/drape-1.jpg"
              alt="Fabric Detail Close-Up"
              fill
              className="object-cover"
            />
          </SectionReveal>
        </div>
      </section>

      {/* 5. Lookbook Teaser */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionReveal className="text-center mb-16 space-y-2">
          <span className="text-label-caps text-gold">EDITORIAL CAMPAIGN</span>
          <h2 className="font-serif text-3xl md:text-5xl text-on-surface font-light">
            Volume I Lookbook
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SectionReveal className="relative aspect-[3/4] bg-surface-dim overflow-hidden border border-border-hairline group">
            <Image
              src="/images/products/obsidian-tee-1.jpg"
              alt="Look 01"
              fill
              className="object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <span className="text-label-caps text-on-surface">Look 01 &mdash; Obsidian Tee</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1} className="relative aspect-[3/4] md:translate-y-8 bg-surface-dim overflow-hidden border border-border-hairline group">
            <Image
              src="/images/products/mockneck-1.jpg"
              alt="Look 02"
              fill
              className="object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <span className="text-label-caps text-on-surface">Look 02 &mdash; Structure Mockneck</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2} className="relative aspect-[3/4] bg-surface-dim overflow-hidden border border-border-hairline group">
            <Image
              src="/images/products/core-ls-1.jpg"
              alt="Look 03"
              fill
              className="object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <span className="text-label-caps text-on-surface">Look 03 &mdash; Core Longsleeve</span>
            </div>
          </SectionReveal>
        </div>

        <div className="text-center mt-20 md:mt-28">
          <Button asChild variant="primary">
            <Link href="/lookbook">EXPLORE FULL LOOKBOOK</Link>
          </Button>
        </div>
      </section>

      {/* 6. Social Proof */}
      <section className="py-20 md:py-28 px-6 bg-surface-dim border-t border-border-hairline text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <SectionReveal>
            <p className="font-serif text-xl md:text-2xl text-on-surface-variant font-light leading-relaxed italic">
              &ldquo;Classto represents the zenith of quiet luxury garments. The weight and silhouette of their Obsidian Tee is unparalleled.&rdquo;
            </p>
          </SectionReveal>
          <SectionReveal delay={0.2} className="flex justify-center items-center gap-12 opacity-40 grayscale contrast-200">
            <span className="font-serif text-base tracking-widest uppercase">Vogue</span>
            <span className="font-serif text-base tracking-widest uppercase">GQ</span>
            <span className="font-serif text-base tracking-widest uppercase">Hypebeast</span>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
