import React from "react";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/commerce/api";
import { ProductDetailsClient } from "./ProductDetailsClient";
import { StructuredData } from "@/components/seo/StructuredData";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id);

  // Generate structured schema data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": product.images.map(img => img.url),
    "description": product.description,
    "sku": product.variants[0]?.sku || "",
    "offers": {
      "@type": "Offer",
      "priceCurrency": product.variants[0]?.price.currencyCode || "USD",
      "price": product.variants[0]?.price.amount || 0,
      "availability": product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "url": `https://classto.com/products/${product.handle}`
    }
  };

  return (
    <>
      <StructuredData data={jsonLd} />
      <div className="bg-black text-on-surface select-none pt-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
        </div>
      </div>
    </>
  );
}
