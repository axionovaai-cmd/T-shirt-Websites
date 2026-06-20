"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-black text-on-surface border-t border-border-hairline pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="font-serif text-[22px] tracking-[0.05em] text-on-surface">
            CLASSTO
          </Link>
          <p className="text-[13px] font-sans font-light text-on-surface-variant leading-relaxed max-w-[240px]">
            Architectural minimalism meets technical precision. Defining the modern silhouette.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-4">
          <h4 className="text-label-caps text-on-surface">Shop</h4>
          <ul className="space-y-2 text-[13px] font-sans font-light text-on-surface-variant">
            <li>
              <Link href="/shop" className="hover:text-gold transition-colors duration-300">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/collections/essentials" className="hover:text-gold transition-colors duration-300">
                The Essentials
              </Link>
            </li>
            <li>
              <Link href="/collections/signature-series" className="hover:text-gold transition-colors duration-300">
                Signature Series
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-4">
          <h4 className="text-label-caps text-on-surface">Support</h4>
          <ul className="space-y-2 text-[13px] font-sans font-light text-on-surface-variant">
            <li>
              <Link href="/contact" className="hover:text-gold transition-colors duration-300">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/size-guide" className="hover:text-gold transition-colors duration-300">
                Size Guide
              </Link>
            </li>
            <li>
              <Link href="/legal/shipping-returns" className="hover:text-gold transition-colors duration-300">
                Shipping & Returns
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-4">
          <h4 className="text-label-caps text-on-surface">Newsletter</h4>
          <p className="text-[13px] font-sans font-light text-on-surface-variant leading-relaxed">
            Be first to access new drops and limited edition releases.
          </p>
          {subscribed ? (
            <p className="text-[13px] font-sans text-gold font-medium">
              Thank you for subscribing.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 items-end">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                required
                className="h-10 text-xs py-1"
              />
              <Button type="submit" size="sm" variant="secondary" className="h-10 text-[9px] tracking-[0.15em]">
                JOIN
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Sub Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-border-hairline/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans font-light text-on-surface-variant">
        <div className="flex gap-6">
          <Link href="/legal/privacy-policy" className="hover:text-on-surface transition-colors duration-300">
            Privacy Policy
          </Link>
          <Link href="/legal/terms-of-service" className="hover:text-on-surface transition-colors duration-300">
            Terms of Service
          </Link>
        </div>
        <div>
          <span>&copy; {new Date().getFullYear()} CLASSTO. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
