"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/commerce/types";
import { useCart } from "@/lib/commerce/cart";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(() => {
    const colorOption = product.options.find(o => o.name === "Color");
    return colorOption ? colorOption.values[0] : null;
  });

  const price = product.variants[0]?.price;
  const isAvailable = product.variants.some(v => v.availableForSale);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Find variant for selected color, or default to first variant
    let variant = product.variants.find(v => 
      !selectedColor || v.selectedOptions.some(o => o.name === "Color" && o.value === selectedColor)
    );
    
    if (!variant) {
      variant = product.variants[0];
    }
    
    if (variant && variant.availableForSale) {
      addToCart(variant, 1, product);
    }
  };

  // Color Swatch option
  const colorOption = product.options.find(o => o.name === "Color");

  // Determine active images
  const mainImage = product.images[0]?.url || "/images/placeholder.jpg";
  const hoverImage = product.images[1]?.url || mainImage;

  return (
    <div 
      className="group relative flex flex-col font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <Link href={`/products/${product.handle}`} className="relative aspect-[3/4] overflow-hidden bg-surface-dim border border-border-hairline block">
        {/* Main Image */}
        <div className="absolute inset-0 transition-opacity duration-700 ease-out z-10">
          <Image
            src={mainImage}
            alt={product.images[0]?.altText || product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-[800ms] ease-out scale-100 group-hover:scale-105"
            priority
          />
        </div>

        {/* Hover Image (if present) */}
        {product.images.length > 1 && (
          <div 
            className="absolute inset-0 transition-opacity duration-700 ease-out z-20"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <Image
              src={hoverImage}
              alt={product.images[1]?.altText || product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-[800ms] ease-out scale-100 group-hover:scale-105"
            />
          </div>
        )}

        {/* Waitlist Badge / Sold Out Badge */}
        {!isAvailable && (
          <div className="absolute top-4 left-4 z-30 bg-black border border-border-hairline px-3 py-1 text-[10px] tracking-[0.1em] font-semibold text-on-surface uppercase font-sans">
            Waitlist
          </div>
        )}

        {/* Quick Add Overlay */}
        {isAvailable && (
          <div className="absolute bottom-0 left-0 right-0 z-30 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/80 to-transparent flex justify-center hidden md:flex">
            <Button 
              variant="technical" 
              size="sm" 
              className="w-full text-[10px] tracking-[0.15em] font-sans font-bold"
              onClick={handleQuickAdd}
            >
              Quick Add
            </Button>
          </div>
        )}
      </Link>

      {/* Info Panel */}
      <div className="flex flex-col pt-4 pb-2">
        <div className="flex items-baseline justify-between mb-1">
          <Link href={`/products/${product.handle}`} className="text-[14px] font-serif text-on-surface hover:text-gold transition-colors duration-300">
            {product.title}
          </Link>
          <span className="text-[13px] font-sans text-on-surface-variant font-light">
            ${price?.amount}
          </span>
        </div>

        {/* Color Swatches */}
        {colorOption && colorOption.values.length > 1 && (
          <div className="flex gap-2 mt-2">
            {colorOption.values.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                  selectedColor === color 
                    ? "border-gold scale-110" 
                    : "border-border-hairline opacity-60 hover:opacity-100"
                }`}
                style={{ 
                  backgroundColor: 
                    color.toLowerCase() === 'obsidian' ? '#121212' : 
                    color.toLowerCase() === 'bone' ? '#EAE6DF' : 
                    color.toLowerCase() === 'ash' ? '#8F9194' : '#555555' 
                }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
