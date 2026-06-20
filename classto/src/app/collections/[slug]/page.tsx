import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCollectionBySlug, getProducts } from "@/lib/commerce/api";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionReveal } from "@/components/ui/SectionReveal";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const allProducts = await getProducts();
  
  // Filter products by collection handle
  const collectionProducts = allProducts.filter(product => 
    product.tags.some(tag => tag.toLowerCase() === slug.toLowerCase()) ||
    slug === "essentials" && product.tags.includes("Essentials") ||
    slug === "signature-series" && product.tags.includes("Signature")
  );

  // Background banner image fallback
  const heroImage = collection.image?.url || "/images/hero-model.jpg";

  return (
    <div className="bg-black text-on-surface select-none pt-24 min-h-screen">
      {/* Collection Hero */}
      <div className="relative h-[45vh] w-full flex items-center justify-center bg-surface-dim overflow-hidden border-b border-border-hairline">
        <Image
          src={heroImage}
          alt={collection.title}
          fill
          priority
          className="object-cover opacity-35 object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center space-y-3 px-6 max-w-3xl">
          <span className="text-label-caps text-gold">MONOLITH COLLECTION</span>
          <h1 className="font-serif text-4xl md:text-6xl text-on-surface uppercase tracking-wide">
            {collection.title}
          </h1>
          <p className="text-sm md:text-base font-sans font-light text-on-surface-variant leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Count */}
        <div className="text-[11px] text-on-surface-variant uppercase tracking-widest mb-10 font-sans border-b border-border-hairline/40 pb-4">
          Showing {collectionProducts.length} items
        </div>

        {/* Product Grid */}
        {collectionProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {collectionProducts.map((product, idx) => (
              <SectionReveal key={product.id} delay={idx * 0.05}>
                <ProductCard product={product} />
              </SectionReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 space-y-4">
            <p className="font-serif text-lg text-on-surface">No products found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
