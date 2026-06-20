"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { searchProducts } from "@/lib/commerce/api";
import { Product } from "@/lib/commerce/types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Real-time search debouncing
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const delayDebounce = setTimeout(async () => {
      try {
        const found = await searchProducts(query);
        setResults(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col px-6 md:px-16 py-8"
        >
          {/* Close button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="p-2 border border-border-hairline hover:border-on-surface hover:text-gold transition-colors duration-300 rounded-none cursor-pointer"
            >
              <X className="w-5 h-5 text-on-surface" />
            </button>
          </div>

          {/* Search Input Box */}
          <div className="max-w-4xl w-full mx-auto mt-12 md:mt-24">
            <div className="relative border-b border-border-hairline focus-within:border-gold transition-colors duration-300 flex items-center">
              <Search className="w-6 h-6 text-on-surface-variant mr-4" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH FOR A PRODUCT..."
                className="w-full bg-transparent text-xl md:text-3xl text-on-surface placeholder:text-on-surface-variant/30 py-4 focus:outline-none uppercase tracking-widest font-sans font-light rounded-none"
              />
            </div>
            
            {/* Loading / Results message */}
            <div className="mt-8 text-label-caps text-on-surface-variant">
              {loading ? (
                <span>Searching...</span>
              ) : query && results.length === 0 ? (
                <span>No results found for &quot;{query}&quot;</span>
              ) : results.length > 0 ? (
                <span>Results ({results.length})</span>
              ) : (
                <span>Try searching: Essentials, Mockneck, Heavyweight</span>
              )}
            </div>

            {/* Results Grid */}
            <div className="mt-12 overflow-y-auto max-h-[50vh] grid grid-cols-1 md:grid-cols-3 gap-8 pr-2 scrollbar-thin">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  onClick={onClose}
                  className="flex items-center gap-4 group border border-border-hairline/40 hover:border-gold transition-all duration-300 p-3"
                >
                  <div className="relative w-16 h-20 bg-surface-dim overflow-hidden">
                    <Image
                      src={product.images[0]?.url || "/images/placeholder.jpg"}
                      alt={product.title}
                      fill
                      sizes="64px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-[16px] text-on-surface group-hover:text-gold transition-colors">
                      {product.title}
                    </span>
                    <span className="text-sm font-sans text-on-surface-variant font-light mt-1">
                      ${product.variants[0]?.price.amount}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
