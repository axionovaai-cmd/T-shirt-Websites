"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/commerce/cart";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ShoppingBag, ChevronRight, Check } from "lucide-react";

type CheckoutStep = "information" | "shipping" | "payment";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>("information");

  // Form State
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const subtotal = cart?.cost.subtotalAmount.amount || 0;
  const shippingCost = shippingMethod === "express" ? 20 : 0;
  const total = subtotal + shippingCost;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "information") {
      setStep("shipping");
    } else if (step === "shipping") {
      setStep("payment");
    } else if (step === "payment") {
      // Simulate final order placement
      clearCart();
      router.push("/checkout/confirmation");
    }
  };

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="bg-black text-on-surface min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-6 pt-32">
        <ShoppingBag className="w-12 h-12 text-on-surface-variant/30 stroke-1" />
        <p className="font-serif text-lg">Your bag is empty. Add items to checkout.</p>
        <Button asChild variant="primary">
          <Link href="/shop">SHOP THE COLLECTION</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-black text-on-surface min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Form Steps */}
        <div className="lg:col-span-7 space-y-12">
          {/* Brand Wordmark */}
          <div className="pb-6 border-b border-border-hairline">
            <Link href="/" className="font-serif text-2xl tracking-[0.05em] text-on-surface uppercase">
              CLASSTO
            </Link>
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center gap-2 text-xs tracking-wider uppercase font-sans text-on-surface-variant">
            <span className={step === "information" ? "text-gold font-medium" : "opacity-60"}>
              Information
            </span>
            <ChevronRight className="w-3.5 h-3.5 opacity-55" />
            <span className={step === "shipping" ? "text-gold font-medium" : "opacity-60"}>
              Shipping
            </span>
            <ChevronRight className="w-3.5 h-3.5 opacity-55" />
            <span className={step === "payment" ? "text-gold font-medium" : "opacity-60"}>
              Payment
            </span>
          </div>

          {/* Form wrapper */}
          <form onSubmit={handleNextStep} className="space-y-8">
            
            {/* Step 1: Information */}
            {step === "information" && (
              <SectionReveal className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-serif text-xl">Contact Information</h3>
                  <Input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="font-serif text-xl">Shipping Address</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="FIRST NAME"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="LAST NAME"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <Input
                    type="text"
                    placeholder="ADDRESS"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="CITY"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="POSTAL CODE"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <Button type="submit" variant="technical" className="w-full sm:w-auto px-10">
                    CONTINUE TO SHIPPING
                  </Button>
                </div>
              </SectionReveal>
            )}

            {/* Step 2: Shipping Method */}
            {step === "shipping" && (
              <SectionReveal className="space-y-6">
                <h3 className="font-serif text-xl">Shipping Method</h3>
                
                <div className="space-y-4">
                  {/* Standard Radio */}
                  <label className={`flex items-center justify-between p-4 border transition-colors cursor-pointer ${
                    shippingMethod === "standard" ? "border-gold bg-surface-dim/20" : "border-border-hairline hover:border-on-surface-variant"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === "standard"}
                        onChange={() => setShippingMethod("standard")}
                        className="accent-gold h-4 w-4"
                      />
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-sans font-medium">Standard Sourcing Delivery</span>
                        <span className="text-xs text-on-surface-variant font-light">3 - 5 business days</span>
                      </div>
                    </div>
                    <span className="text-xs font-sans text-gold">FREE</span>
                  </label>

                  {/* Express Radio */}
                  <label className={`flex items-center justify-between p-4 border transition-colors cursor-pointer ${
                    shippingMethod === "express" ? "border-gold bg-surface-dim/20" : "border-border-hairline hover:border-on-surface-variant"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingMethod === "express"}
                        onChange={() => setShippingMethod("express")}
                        className="accent-gold h-4 w-4"
                      />
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-sans font-medium">Express Courier Sourcing</span>
                        <span className="text-xs text-on-surface-variant font-light">1 - 2 business days</span>
                      </div>
                    </div>
                    <span className="text-xs font-sans text-on-surface">$20.00</span>
                  </label>
                </div>

                <div className="flex gap-4 pt-6 flex-wrap">
                  <Button type="submit" variant="technical" className="w-full sm:w-auto px-10">
                    CONTINUE TO PAYMENT
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => setStep("information")}>
                    RETURN TO INFORMATION
                  </Button>
                </div>
              </SectionReveal>
            )}

            {/* Step 3: Payment */}
            {step === "payment" && (
              <SectionReveal className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl">Payment Details</h3>
                  <p className="text-xs text-on-surface-variant font-sans font-light">
                    Transactions are encrypted and processed securely (Stripe-ready mock).
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="CARD NUMBER"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="EXPIRY DATE (MM/YY)"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder="CVV"
                      required
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6 flex-wrap">
                  <Button type="submit" variant="technical" className="w-full sm:w-auto px-10">
                    PLACE SECURE ORDER
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => setStep("shipping")}>
                    RETURN TO SHIPPING
                  </Button>
                </div>
              </SectionReveal>
            )}

          </form>
        </div>

        {/* Right Column: Order Summary (Sidebar) */}
        <div className="lg:col-span-5 bg-surface-dim/40 border border-border-hairline p-6 space-y-6">
          <h3 className="font-serif text-lg border-b border-border-hairline pb-3">Order Summary</h3>
          
          {/* Cart items list */}
          <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin">
            {cart.lines.map((line) => {
              const image = line.merchandise.product.images[0]?.url || "/images/placeholder.jpg";
              return (
                <div key={line.id} className="flex gap-4 items-center">
                  <div className="relative w-12 h-16 bg-surface-dim overflow-hidden flex-shrink-0 border border-border-hairline/40">
                    <Image
                      src={image}
                      alt={line.merchandise.product.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow flex flex-col text-left">
                    <span className="text-sm font-serif truncate leading-tight">
                      {line.merchandise.product.title}
                    </span>
                    <span className="text-xs text-on-surface-variant font-light mt-0.5">
                      {line.merchandise.selectedOptions.map(o => o.value).join(" / ")} &times; {line.quantity}
                    </span>
                  </div>
                  <span className="text-xs font-sans text-on-surface font-light">
                    ${line.cost.totalAmount.amount}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Pricing calculations details */}
          <div className="space-y-3 border-t border-border-hairline pt-6 text-xs text-on-surface-variant font-sans font-light">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-on-surface">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-on-surface">
                {shippingMethod === "express" ? "$20.00" : "Complimentary"}
              </span>
            </div>
            <div className="flex justify-between border-t border-border-hairline/40 pt-4 text-sm font-sans font-normal text-on-surface">
              <span>Total</span>
              <span className="text-gold font-semibold">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
