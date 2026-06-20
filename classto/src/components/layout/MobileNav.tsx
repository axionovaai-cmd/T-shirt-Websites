"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, User, ShoppingBag } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  cartCount: number;
}

export function MobileNav({
  isOpen,
  onClose,
  onSearchClick,
  onCartClick,
  cartCount,
}: MobileNavProps) {
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.3, 0, 0, 1] as const,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.3, 0, 0, 1] as const,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 30 },
    open: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const navLinks = [
    { name: "Shop All", href: "/shop" },
    { name: "Collections", href: "/#collections" },
    { name: "The Story", href: "/story" },
    { name: "Lookbook", href: "/lookbook" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-50 bg-black text-on-surface flex flex-col justify-between px-6 py-8"
        >
          {/* Header row in mobile overlay */}
          <div className="flex justify-between items-center">
            <Link href="/" onClick={onClose} className="font-serif text-2xl tracking-[0.05em] text-on-surface">
              CLASSTO
            </Link>
            <button 
              onClick={onClose}
              className="p-2 border border-border-hairline text-on-surface hover:text-gold transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links list */}
          <div className="flex flex-col space-y-6 my-auto pt-12">
            {navLinks.map((link) => (
              <motion.div key={link.name} variants={itemVariants}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-serif text-4xl hover:text-gold transition-colors duration-300 block py-2"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Action Footer */}
          <motion.div 
            variants={itemVariants} 
            className="border-t border-border-hairline pt-6 flex justify-around items-center"
          >
            <button
              onClick={() => {
                onClose();
                onSearchClick();
              }}
              className="flex items-center gap-2 text-label-caps text-on-surface-variant hover:text-on-surface"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center gap-2 text-label-caps text-on-surface-variant hover:text-on-surface"
            >
              <User className="w-4 h-4" />
              <span>Account</span>
            </Link>
            <button
              onClick={() => {
                onClose();
                onCartClick();
              }}
              className="flex items-center gap-2 text-label-caps text-on-surface-variant hover:text-on-surface relative"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart ({cartCount})</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
