"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import { useCart } from "@/lib/commerce/cart";
import { MobileNav } from "./MobileNav";
import { SearchOverlay } from "./SearchOverlay";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  const { cart, isCartOpen, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Monitor scroll for header background opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalQuantity = cart?.totalQuantity || 0;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out border-b ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md py-4 border-border-hairline"
            : "bg-transparent py-6 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-1 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo (Centered on mobile, Left on desktop) */}
          <div className="flex-1 md:flex-none flex justify-center md:justify-start">
            <Link
              href="/"
              className="font-serif text-[20px] md:text-[24px] tracking-[0.05em] text-on-surface hover:text-gold transition-colors duration-300"
            >
              CLASSTO
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10 flex-1 justify-center">
            <Link
              href="/shop"
              className="label-caps text-on-surface-variant hover:text-on-surface relative py-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-gold after:transition-all after:duration-500"
            >
              Shop All
            </Link>
            <Link
              href="/#collections"
              className="label-caps text-on-surface-variant hover:text-on-surface relative py-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-gold after:transition-all after:duration-500"
            >
              Collections
            </Link>
            <Link
              href="/story"
              className="label-caps text-on-surface-variant hover:text-on-surface relative py-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-gold after:transition-all after:duration-500"
            >
              The Story
            </Link>
            <Link
              href="/lookbook"
              className="label-caps text-on-surface-variant hover:text-on-surface relative py-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-gold after:transition-all after:duration-500"
            >
              Lookbook
            </Link>
          </nav>

          {/* Utility Navigation (Search, Account, Cart) */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              title="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
            <Link
              href="/account"
              className="p-1 text-on-surface-variant hover:text-on-surface transition-colors hidden md:block"
              title="Account"
            >
              <User className="w-4.5 h-4.5" />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1 text-on-surface-variant hover:text-on-surface transition-colors relative cursor-pointer"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center bg-gold text-[9px] font-sans font-bold text-black rounded-full animate-pulse">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Global Overlays & Drawers */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSearchClick={() => setIsSearchOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        cartCount={totalQuantity}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <CartDrawer />
    </>
  );
}
