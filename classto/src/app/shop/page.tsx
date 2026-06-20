"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getProducts } from "@/lib/commerce/api";
import { Product } from "@/lib/commerce/types";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Skeleton } from "@/components/ui/Skeleton";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Sort States
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [selectedSort, setSelectedSort] = useState<string>("Newest");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("All");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Filter by size
    if (selectedSize !== "All") {
      result = result.filter(product => 
        product.variants.some(variant => 
          variant.selectedOptions.some(opt => opt.name === "Size" && opt.value === selectedSize)
        )
      );
    }

    // Filter by color
    if (selectedColor !== "All") {
      result = result.filter(product => 
        product.variants.some(variant => 
          variant.selectedOptions.some(opt => opt.name === "Color" && opt.value === selectedColor)
        )
      );
    }

    // Filter by price range
    if (selectedPriceRange !== "All") {
      result = result.filter(product => {
        const price = product.variants[0]?.price.amount || 0;
        if (selectedPriceRange === "under-130") return price < 130;
        if (selectedPriceRange === "130-150") return price >= 130 && price <= 150;
        if (selectedPriceRange === "over-150") return price > 150;
        return true;
      });
    }

    // Sort products
    if (selectedSort === "PriceAsc") {
      result.sort((a, b) => (a.variants[0]?.price.amount || 0) - (b.variants[0]?.price.amount || 0));
    } else if (selectedSort === "PriceDesc") {
      result.sort((a, b) => (b.variants[0]?.price.amount || 0) - (a.variants[0]?.price.amount || 0));
    } else if (selectedSort === "BestSelling") {
      // Mock best selling: just filter / sort arbitrarily
      result.reverse();
    }

    setFilteredProducts(result);
  }, [products, selectedSize, selectedColor, selectedSort, selectedPriceRange]);

  return (
    <div className="bg-black text-on-surface select-none pt-24 min-h-screen">
      {/* Shop Hero Banner */}
      <div className="relative h-[40vh] w-full flex items-center justify-center bg-surface-dim overflow-hidden border-b border-border-hairline">
        <Image
          src="/images/hero-model.jpg"
          alt="Campaign Hero"
          fill
          priority
          className="object-cover opacity-30 object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center space-y-2">
          <span className="text-label-caps text-gold">MONOLITH APPAREL</span>
          <h1 className="font-serif text-4xl md:text-6xl text-on-surface uppercase tracking-wide">
            Shop All
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Sticky Filter Bar */}
        <div className="sticky top-[80px] z-30 bg-black border-y border-border-hairline py-4 px-2 flex flex-wrap justify-between items-center gap-4 mb-12">
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-sans tracking-wide pr-2 border-r border-border-hairline">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </div>

            {/* Size Filter */}
            <div className="relative group">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="appearance-none bg-black border border-border-hairline px-4 py-1.5 pr-8 text-xs font-sans text-on-surface-variant hover:text-on-surface hover:border-gold transition-colors focus:outline-none rounded-none cursor-pointer"
              >
                <option value="All">SIZE: ALL</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <ChevronDown className="w-3 h-3 text-on-surface-variant absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Color Filter */}
            <div className="relative group">
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="appearance-none bg-black border border-border-hairline px-4 py-1.5 pr-8 text-xs font-sans text-on-surface-variant hover:text-on-surface hover:border-gold transition-colors focus:outline-none rounded-none cursor-pointer"
              >
                <option value="All">COLOR: ALL</option>
                <option value="Obsidian">OBSIDIAN</option>
                <option value="Bone">BONE</option>
                <option value="Ash">ASH</option>
              </select>
              <ChevronDown className="w-3 h-3 text-on-surface-variant absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Price Filter */}
            <div className="relative group">
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="appearance-none bg-black border border-border-hairline px-4 py-1.5 pr-8 text-xs font-sans text-on-surface-variant hover:text-on-surface hover:border-gold transition-colors focus:outline-none rounded-none cursor-pointer"
              >
                <option value="All">PRICE: ALL</option>
                <option value="under-130">UNDER $130</option>
                <option value="130-150">$130 - $150</option>
                <option value="over-150">OVER $150</option>
              </select>
              <ChevronDown className="w-3 h-3 text-on-surface-variant absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="appearance-none bg-black border border-border-hairline px-4 py-1.5 pr-8 text-xs font-sans text-on-surface-variant hover:text-on-surface hover:border-gold transition-colors focus:outline-none rounded-none cursor-pointer"
            >
              <option value="Newest">SORT: NEWEST</option>
              <option value="BestSelling">SORT: BEST SELLING</option>
              <option value="PriceAsc">SORT: PRICE LOW-HIGH</option>
              <option value="PriceDesc">SORT: PRICE HIGH-LOW</option>
            </select>
            <ChevronDown className="w-3 h-3 text-on-surface-variant absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Product Count */}
        <div className="text-[11px] text-on-surface-variant uppercase tracking-widest mb-6 font-sans">
          Showing {filteredProducts.length} of {products.length} products
        </div>

        {/* Loading state / Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="space-y-4">
                <Skeleton className="aspect-[3/4] w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <SectionReveal key={product.id}>
                <ProductCard product={product} />
              </SectionReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 space-y-4 border border-dashed border-border-hairline">
            <p className="font-serif text-lg text-on-surface">No products match your filters.</p>
            <button 
              onClick={() => {
                setSelectedSize("All");
                setSelectedColor("All");
                setSelectedPriceRange("All");
              }}
              className="text-xs text-gold underline tracking-wider uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
