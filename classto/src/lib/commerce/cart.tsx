"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cart, CartLine, Variant } from './types';

interface CartContextType {
  cart: Cart | null;
  addToCart: (variant: Variant, quantity: number, product: any) => void;
  removeFromCart: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Load from local storage
    const saved = localStorage.getItem('classto_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    } else {
      setCart({
        id: 'mock_cart_id',
        checkoutUrl: '/checkout',
        cost: {
          subtotalAmount: { amount: 0, currencyCode: 'USD' },
          totalAmount: { amount: 0, currencyCode: 'USD' },
          totalTaxAmount: { amount: 0, currencyCode: 'USD' }
        },
        lines: [],
        totalQuantity: 0
      });
    }
  }, []);

  useEffect(() => {
    if (cart) {
      localStorage.setItem('classto_cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (variant: Variant, quantity: number, product: any) => {
    setCart(prev => {
      if (!prev) return prev;
      
      const newLines = [...prev.lines];
      const existingLineIndex = newLines.findIndex(line => line.merchandise.id === variant.id);
      
      if (existingLineIndex >= 0) {
        newLines[existingLineIndex].quantity += quantity;
        newLines[existingLineIndex].cost.totalAmount.amount = newLines[existingLineIndex].quantity * variant.price.amount;
      } else {
        newLines.push({
          id: `line_${Math.random().toString(36).substring(2, 9)}`,
          quantity,
          cost: {
            totalAmount: {
              amount: quantity * variant.price.amount,
              currencyCode: variant.price.currencyCode
            }
          },
          merchandise: {
            ...variant,
            product: {
              id: product.id,
              handle: product.handle,
              title: product.title,
              images: product.images
            }
          }
        });
      }
      
      return calculateCartTotals({ ...prev, lines: newLines });
    });
    
    setIsCartOpen(true);
  };

  const removeFromCart = (lineId: string) => {
    setCart(prev => {
      if (!prev) return prev;
      const newLines = prev.lines.filter(line => line.id !== lineId);
      return calculateCartTotals({ ...prev, lines: newLines });
    });
  };

  const updateQuantity = (lineId: string, quantity: number) => {
    setCart(prev => {
      if (!prev) return prev;
      if (quantity === 0) {
        return calculateCartTotals({ ...prev, lines: prev.lines.filter(l => l.id !== lineId) });
      }
      
      const newLines = prev.lines.map(line => {
        if (line.id === lineId) {
          return {
            ...line,
            quantity,
            cost: {
              ...line.cost,
              totalAmount: {
                ...line.cost.totalAmount,
                amount: quantity * line.merchandise.price.amount
              }
            }
          };
        }
        return line;
      });
      
      return calculateCartTotals({ ...prev, lines: newLines });
    });
  };

  const clearCart = () => {
    setCart(prev => {
      if (!prev) return prev;
      return calculateCartTotals({ ...prev, lines: [] });
    });
  };

  const calculateCartTotals = (newCart: Cart): Cart => {
    let subtotal = 0;
    let totalQty = 0;
    
    newCart.lines.forEach(line => {
      subtotal += line.cost.totalAmount.amount;
      totalQty += line.quantity;
    });
    
    return {
      ...newCart,
      totalQuantity: totalQty,
      cost: {
        ...newCart.cost,
        subtotalAmount: { ...newCart.cost.subtotalAmount, amount: subtotal },
        totalAmount: { ...newCart.cost.totalAmount, amount: subtotal } // Tax calculation mock omitted
      }
    };
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
