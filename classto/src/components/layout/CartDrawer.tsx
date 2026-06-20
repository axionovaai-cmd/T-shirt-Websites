"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/commerce/cart";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();
  
  const FREE_SHIPPING_THRESHOLD = 150;
  const subtotal = cart?.cost.subtotalAmount.amount || 0;
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-black border-l border-border-hairline text-on-surface flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-hairline">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <span className="text-label-caps">CART ({cart?.totalQuantity || 0})</span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 border border-border-hairline hover:border-on-surface hover:text-gold transition-colors duration-300 rounded-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
              {cart?.lines && cart.lines.length > 0 ? (
                <>
                  {/* Free Shipping Tracker */}
                  <div className="space-y-2 border-b border-border-hairline/40 pb-6">
                    <p className="text-sm font-sans font-light text-on-surface-variant">
                      {remaining > 0 ? (
                        <>You are <span className="text-gold font-normal">${remaining.toFixed(2)}</span> away from free shipping.</>
                      ) : (
                        <span className="text-gold font-normal">Congratulations! You qualify for free shipping.</span>
                      )}
                    </p>
                    <div className="h-1 bg-border-hairline w-full">
                      <div 
                        className="h-full bg-gold transition-all duration-500 ease-out" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Lines List */}
                  <div className="space-y-4">
                    {cart.lines.map((line) => {
                      const image = line.merchandise.product.images[0]?.url || "/images/placeholder.jpg";
                      return (
                        <div key={line.id} className="flex gap-4 border border-border-hairline/40 p-3 group">
                          {/* Image */}
                          <div className="relative w-20 h-24 bg-surface-dim overflow-hidden flex-shrink-0">
                            <Image
                              src={image}
                              alt={line.merchandise.product.title}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>

                          {/* Info & Quantity controls */}
                          <div className="flex flex-col justify-between flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-serif text-[15px] leading-tight">
                                  {line.merchandise.product.title}
                                </h4>
                                <p className="text-[12px] font-sans text-on-surface-variant mt-1">
                                  {line.merchandise.selectedOptions.map(o => o.value).join(" / ")}
                                </p>
                              </div>
                              <span className="text-sm font-sans text-on-surface-variant font-light">
                                ${line.merchandise.price.amount}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              {/* Quantity inputs */}
                              <div className="flex items-center border border-border-hairline">
                                <button
                                  onClick={() => updateQuantity(line.id, line.quantity - 1)}
                                  className="p-1 px-2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-sans font-light select-none">
                                  {line.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(line.id, line.quantity + 1)}
                                  className="p-1 px-2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              {/* Remove button */}
                              <button
                                onClick={() => removeFromCart(line.id)}
                                className="text-on-surface-variant/60 hover:text-tertiary transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                /* Empty state */
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 pt-12">
                  <ShoppingBag className="w-12 h-12 text-on-surface-variant/30 stroke-1" />
                  <div className="space-y-2">
                    <p className="font-serif text-lg text-on-surface">Your bag is empty.</p>
                    <p className="text-sm font-sans text-on-surface-variant font-light max-w-xs">
                      Discover our high-end staples built with architectural minimalism.
                    </p>
                  </div>
                  <Button 
                    variant="primary" 
                    className="w-full mt-4"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Shop the Collection
                  </Button>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart?.lines && cart.lines.length > 0 && (
              <div className="p-6 border-t border-border-hairline space-y-4 bg-surface-dim/40">
                <div className="flex justify-between items-baseline text-on-surface">
                  <span className="text-label-caps">SUBTOTAL</span>
                  <span className="font-sans text-lg font-light">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-[11px] font-sans font-light text-on-surface-variant tracking-wide">
                  Shipping, taxes, and discounts calculated at checkout.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <Button 
                    asChild 
                    variant="technical" 
                    className="w-full"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <Link href="/checkout">
                      PROCEED TO CHECKOUT
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <Link href="/cart">
                      VIEW FULL CART
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
