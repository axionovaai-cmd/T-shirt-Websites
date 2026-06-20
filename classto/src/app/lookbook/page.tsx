import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

export default function LookbookPage() {
  const looks = [
    {
      id: "look_01",
      num: "LOOK 01",
      title: "The Monolith Silhouette",
      productName: "The Obsidian Tee",
      productLink: "/products/the-obsidian-tee",
      image: "/images/products/obsidian-tee-1.jpg",
      align: "left"
    },
    {
      id: "look_02",
      num: "LOOK 02",
      title: "Architectural Drape",
      productName: "Drape Heavyweight",
      productLink: "/products/drape-heavyweight",
      image: "/images/products/drape-1.jpg",
      align: "right"
    },
    {
      id: "look_03",
      num: "LOOK 03",
      title: "Transitional Essential",
      productName: "Structure Mockneck",
      productLink: "/products/structure-mockneck",
      image: "/images/products/mockneck-1.jpg",
      align: "left"
    }
  ];

  return (
    <div className="bg-black text-on-surface pt-32 pb-24 font-sans select-none overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-32">
        
        {/* Banner header */}
        <SectionReveal className="text-center space-y-4">
          <span className="text-label-caps text-gold">Volume I</span>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide uppercase">
            Editorial Lookbook
          </h1>
          <div className="w-12 h-px bg-gold mx-auto mt-6" />
        </SectionReveal>

        {/* Looks Loop */}
        <div className="space-y-48">
          {looks.map((look, index) => {
            const isLeft = look.align === "left";
            return (
              <div 
                key={look.id}
                className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center ${
                  isLeft ? "" : "md:rtl"
                }`}
              >
                {/* Visual Image container */}
                <div className="md:col-span-8 ltr">
                  <SectionReveal delay={0.1} className="relative aspect-[16/10] md:aspect-[16/9] bg-surface-dim overflow-hidden border border-border-hairline group">
                    <Image
                      src={look.image}
                      alt={look.title}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-out scale-100 group-hover:scale-102"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </SectionReveal>
                </div>

                {/* Narrative Details column */}
                <div className="md:col-span-4 ltr flex flex-col justify-center space-y-6">
                  <SectionReveal className="space-y-4">
                    <span className="text-xs font-sans text-gold font-semibold tracking-widest">{look.num}</span>
                    <h2 className="font-serif text-2xl md:text-3.5xl font-light leading-tight text-on-surface">
                      {look.title}
                    </h2>
                    <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                      Captured in high-contrast natural light, showcasing the natural texture and heavy drapes of our extra-long staple Supima knitwear.
                    </p>
                  </SectionReveal>

                  <SectionReveal delay={0.2} className="pt-2">
                    <Button asChild variant="secondary" size="sm" className="w-full sm:w-auto">
                      <Link href={look.productLink}>
                        SHOP THE LOOK &mdash; {look.productName.toUpperCase()}
                      </Link>
                    </Button>
                  </SectionReveal>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
