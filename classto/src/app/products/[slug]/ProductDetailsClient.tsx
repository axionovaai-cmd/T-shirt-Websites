"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, Variant } from "@/lib/commerce/types";
import { useCart } from "@/lib/commerce/cart";
import { Button } from "@/components/ui/Button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Check, ShieldCheck, Truck, RotateCcw } from "lucide-react";

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  
  // Color Option
  const colorOption = product.options.find(o => o.name === "Color");
  const [selectedColor, setSelectedColor] = useState<string>(() => 
    colorOption ? colorOption.values[0] : "All"
  );

  // Size Option
  const sizeOption = product.options.find(o => o.name === "Size");
  const [selectedSize, setSelectedSize] = useState<string>(() => 
    sizeOption ? sizeOption.values[0] : "All"
  );

  // Main Image View state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Zoom state
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.5)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  // Find variant matching current options
  const selectedVariant = product.variants.find(variant => {
    const hasColor = !colorOption || variant.selectedOptions.some(opt => opt.name === "Color" && opt.value === selectedColor);
    const hasSize = !sizeOption || variant.selectedOptions.some(opt => opt.name === "Size" && opt.value === selectedSize);
    return hasColor && hasSize;
  }) || product.variants[0];

  const isAvailable = selectedVariant?.availableForSale && selectedVariant?.inventoryQty > 0;

  const handleAddToCart = () => {
    if (selectedVariant && isAvailable) {
      addToCart(selectedVariant, 1, product);
    }
  };

  return (
    <div className="space-y-24">
      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
        
        {/* Left: Thumbnail & Image Gallery */}
        <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Thumbnails (hidden on mobile, vertical left on desktop) */}
          <div className="hidden md:flex md:col-span-2 flex-col space-y-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[3/4] bg-surface-dim border transition-all duration-300 overflow-hidden cursor-pointer ${
                  activeImageIndex === idx ? "border-gold" : "border-border-hairline hover:opacity-85"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.altText || product.title}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Visual Display */}
          <div className="md:col-span-10">
            <div
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-[3/4] bg-surface-dim overflow-hidden border border-border-hairline cursor-zoom-in"
            >
              <Image
                src={product.images[activeImageIndex]?.url || "/images/placeholder.jpg"}
                alt={product.images[activeImageIndex]?.altText || product.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ ...zoomStyle, transition: "transform 0.1s ease-out" }}
                className="object-cover"
              />
            </div>
            
            {/* Mobile Horizontal Thumbnail list */}
            <div className="flex gap-3 mt-4 md:hidden overflow-x-auto pb-2 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-20 bg-surface-dim border flex-shrink-0 transition-all ${
                    activeImageIndex === idx ? "border-gold" : "border-border-hairline"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.altText}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sticky Panel */}
        <div className="md:col-span-5 md:sticky md:top-[120px] space-y-8">
          {/* Header titles */}
          <div className="space-y-2 border-b border-border-hairline pb-6">
            <span className="text-label-caps text-gold">MONOLITH ESSENTIALS</span>
            <h1 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-on-surface">
              {product.title}
            </h1>
            <p className="text-xl font-sans font-light text-on-surface-variant">
              ${selectedVariant?.price.amount || product.variants[0]?.price.amount}
            </p>
          </div>

          {/* Sizing & Colors selection */}
          <div className="space-y-6">
            {/* Color swatches */}
            {colorOption && (
              <div className="space-y-2.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-label-caps text-on-surface-variant">Color</span>
                  <span className="text-xs font-sans text-on-surface font-medium">{selectedColor}</span>
                </div>
                <div className="flex gap-3">
                  {colorOption.values.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        selectedColor === color 
                          ? "border-gold scale-105" 
                          : "border-border-hairline hover:opacity-100 opacity-60"
                      }`}
                      style={{ 
                        backgroundColor: 
                          color.toLowerCase() === 'obsidian' ? '#121212' : 
                          color.toLowerCase() === 'bone' ? '#EAE6DF' : 
                          color.toLowerCase() === 'ash' ? '#8F9194' : '#555555' 
                      }}
                      title={color}
                    >
                      {selectedColor === color && (
                        <Check className={`w-4 h-4 ${color.toLowerCase() === 'bone' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {sizeOption && (
              <div className="space-y-2.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-label-caps text-on-surface-variant">Size</span>
                  <Link href="/size-guide" className="text-xs font-sans text-gold hover:underline tracking-wide">
                    Size Guide
                  </Link>
                </div>
                <div className="flex gap-2">
                  {sizeOption.values.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 w-12 border text-xs font-sans transition-all duration-300 cursor-pointer ${
                        selectedSize === size
                          ? "border-gold bg-gold text-black font-semibold"
                          : "border-border-hairline text-on-surface-variant hover:border-on-surface"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add To Cart Trigger */}
          <div className="space-y-4 pt-4">
            {/* Low inventory Warning */}
            {isAvailable && selectedVariant.inventoryQty > 0 && selectedVariant.inventoryQty <= 10 && (
              <p className="text-xs font-sans text-gold font-light tracking-wide animate-pulse">
                Limited Release: Only {selectedVariant.inventoryQty} items remaining.
              </p>
            )}

            <Button
              onClick={handleAddToCart}
              disabled={!isAvailable}
              variant={isAvailable ? "technical" : "primary"}
              className="w-full h-14 text-xs tracking-[0.2em] font-sans font-bold"
            >
              {isAvailable ? "ADD TO BAG" : "SOLD OUT / JOIN WAITLIST"}
            </Button>
          </div>

          {/* Trust Row */}
          <div className="grid grid-cols-3 gap-4 border-y border-border-hairline py-6 text-center text-[10px] text-on-surface-variant/80 uppercase tracking-widest font-sans font-light">
            <div className="flex flex-col items-center gap-1.5">
              <Truck className="w-4 h-4 text-gold stroke-1" />
              <span>Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold stroke-1" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-gold stroke-1" />
              <span>Easy Returns</span>
            </div>
          </div>

          {/* Technical Accordion list */}
          <Accordion type="single" collapsible defaultValue="description" className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Product Description</AccordionTrigger>
              <AccordionContent>{product.description}</AccordionContent>
            </AccordionItem>
            
            {product.fabricDetails && (
              <AccordionItem value="fabric">
                <AccordionTrigger>Fabric & Care</AccordionTrigger>
                <AccordionContent>
                  <p className="font-semibold text-on-surface mb-2">Specifications:</p>
                  <p>{product.fabricDetails}</p>
                  <p className="font-semibold text-on-surface mt-4 mb-2">Instructions:</p>
                  <p>{product.careInstructions}</p>
                </AccordionContent>
              </AccordionItem>
            )}

            {product.fitAndSizing && (
              <AccordionItem value="fit">
                <AccordionTrigger>Fit & Sizing</AccordionTrigger>
                <AccordionContent>{product.fitAndSizing}</AccordionContent>
              </AccordionItem>
            )}

            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                Free standard shipping on orders over $150. Returns are accepted within 14 days of delivery for store credit or refund. Items must be in original unworn condition.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-border-hairline pt-20">
          <SectionReveal className="text-center mb-12">
            <span className="text-label-caps text-gold">COMPLETE THE LOOK</span>
            <h2 className="font-serif text-2xl md:text-4xl text-on-surface font-light mt-2">
              You May Also Like
            </h2>
          </SectionReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map((p, idx) => (
              <SectionReveal key={p.id} delay={idx * 0.05}>
                <ProductCard product={p} />
              </SectionReveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
