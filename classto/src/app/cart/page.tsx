"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/commerce/cart";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  
  const subtotal = cart?.cost.subtotalAmount.amount || 0;
  const FREE_SHIPPING_THRESHOLD = 150;
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="bg-black text-on-surface select-none pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        
        <SectionReveal className="text-center mb-12 space-y-2">
          <span className="text-label-caps text-gold">YOUR STAPLES</span>
          <h1 className="font-serif text-3xl md:text-5xl font-light text-on-surface uppercase tracking-wide">
            Shopping Bag
          </h1>
        </SectionReveal>

        {cart?.lines && cart.lines.length > 0 ? (
          <div className="space-y-8">
            {/* Free Shipping Tracker */}
            <SectionReveal className="border border-border-hairline p-6 space-y-3 bg-surface-dim/20">
              <p className="text-sm font-sans font-light text-on-surface-variant leading-relaxed">
                {remaining > 0 ? (
                  <>
                    You are only <span className="text-gold font-normal">${remaining.toFixed(2)}</span> away from complimentary shipping.
                  </>
                ) : (
                  <span className="text-gold font-normal">Your order qualifies for complimentary standard shipping.</span>
                )}
              </p>
              <div className="h-1 bg-border-hairline w-full">
                <div 
                  className="h-full bg-gold transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </SectionReveal>

            {/* Line Items */}
            <div className="space-y-4">
              {cart.lines.map((line) => {
                const image = line.merchandise.product.images[0]?.url || "/images/placeholder.jpg";
                return (
                  <SectionReveal key={line.id} className="flex flex-col sm:flex-row gap-6 border border-border-hairline p-4 sm:p-6 items-start sm:items-center">
                    {/* Image */}
                    <div className="relative w-24 h-32 bg-surface-dim overflow-hidden flex-shrink-0 border border-border-hairline/40">
                      <Image
                        src={image}
                        alt={line.merchandise.product.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    {/* Meta info */}
                    <div className="flex-grow space-y-1">
                      <Link href={`/products/${line.merchandise.product.handle}`} className="font-serif text-lg text-on-surface hover:text-gold transition-colors duration-300">
                        {line.merchandise.product.title}
                      </Link>
                      <p className="text-xs font-sans text-on-surface-variant tracking-wide">
                        SKU: {line.merchandise.sku}
                      </p>
                      <p className="text-xs font-sans text-on-surface-variant font-light mt-1">
                        Options: {line.merchandise.selectedOptions.map(o => o.value).join(" / ")}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
                      <div className="flex items-center border border-border-hairline">
                        <button
                          onClick={() => updateQuantity(line.id, line.quantity - 1)}
                          className="p-2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-4 text-xs font-sans font-light select-none">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          className="p-2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line total */}
                      <span className="text-sm font-sans text-on-surface font-light min-w-[60px] text-right">
                        ${line.cost.totalAmount.amount}
                      </span>

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(line.id)}
                        className="text-on-surface-variant/40 hover:text-tertiary transition-colors cursor-pointer p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>

            {/* Total summary board */}
            <SectionReveal className="border border-border-hairline p-6 md:p-8 space-y-6 bg-surface-dim/40 max-w-md ml-auto">
              <div className="space-y-4">
                <div className="flex justify-between items-baseline text-on-surface border-b border-border-hairline/40 pb-4">
                  <span className="text-label-caps">Subtotal</span>
                  <span className="font-sans text-xl font-light">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-on-surface-variant font-light">
                  <span>Shipping</span>
                  <span>{subtotal >= 150 ? "FREE" : "Calculated next"}</span>
                </div>
              </div>
              
              <Button asChild variant="technical" className="w-full h-14 text-xs tracking-[0.2em]">
                <Link href="/checkout">
                  PROCEED TO SECURE CHECKOUT
                </Link>
              </Button>

              <div className="text-center">
                <Link href="/shop" className="text-xs font-sans text-on-surface-variant hover:text-gold transition-colors underline uppercase tracking-wider">
                  Continue Shopping
                </Link>
              </div>
            </SectionReveal>

          </div>
        ) : (
          /* Empty Page state */
          <SectionReveal className="text-center py-20 border border-dashed border-border-hairline/40 space-y-8 flex flex-col items-center max-w-xl mx-auto">
            <ShoppingBag className="w-16 h-16 text-on-surface-variant/30 stroke-1" />
            <div className="space-y-2">
              <h2 className="font-serif text-2xl text-on-surface">Your bag is empty</h2>
              <p className="text-sm font-sans text-on-surface-variant font-light max-w-xs mx-auto">
                Explore our catalog for minimalist, structural essentials.
              </p>
            </div>
            <Button asChild variant="primary" className="mt-4">
              <Link href="/shop">SHOP THE COLLECTION</Link>
            </Button>
          </SectionReveal>
        )}
      </div>
    </div>
  );
}
