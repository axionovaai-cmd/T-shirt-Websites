"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { User, LogOut, Package, MapPin, Heart, Shield } from "lucide-react";

type ActiveTab = "orders" | "addresses" | "wishlist" | "details";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("orders");

  // Mock Customer Details
  const customer = {
    name: "Aidan Vance",
    email: "aidan.vance@studio.com",
    memberSince: "November 2025"
  };

  // Mock Orders list
  const orders = [
    { id: "CL-987102", date: "April 14, 2026", status: "Delivered", total: 290.00, items: "Obsidian Tee & Structure Mockneck" },
    { id: "CL-563821", date: "February 28, 2026", status: "Delivered", total: 160.00, items: "Drape Heavyweight (Ash)" }
  ];

  // Mock Addresses list
  const addresses = [
    { id: "addr_1", type: "Default Billing & Shipping", name: "Aidan Vance", street: "12 Architectural Blvd, Apt 4B", city: "New York", state: "NY", zip: "10013" }
  ];

  return (
    <div className="bg-black text-on-surface min-h-screen pt-32 pb-24 font-sans select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row justify-between items-baseline border-b border-border-hairline pb-8 mb-12 gap-4">
          <div className="space-y-1">
            <span className="text-label-caps text-gold">CUSTOMER PORTAL</span>
            <h1 className="font-serif text-3xl md:text-5xl font-light text-on-surface uppercase tracking-wide">
              Hello, {customer.name.split(" ")[0]}
            </h1>
            <p className="text-xs text-on-surface-variant font-sans font-light">
              Member since {customer.memberSince} &bull; {customer.email}
            </p>
          </div>
          <Button variant="secondary" size="sm" className="flex items-center gap-2">
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Button>
        </div>

        {/* Dashboard grid panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Navigation left column tabs list */}
          <div className="md:col-span-3 flex flex-row md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 border-b md:border-b-0 border-border-hairline">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-3 text-label-caps py-2.5 px-4 text-left border cursor-pointer whitespace-nowrap ${
                activeTab === "orders" ? "border-gold bg-surface-dim/20 text-gold" : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders</span>
            </button>
            
            <button
              onClick={() => setActiveTab("addresses")}
              className={`flex items-center gap-3 text-label-caps py-2.5 px-4 text-left border cursor-pointer whitespace-nowrap ${
                activeTab === "addresses" ? "border-gold bg-surface-dim/20 text-gold" : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab("wishlist")}
              className={`flex items-center gap-3 text-label-caps py-2.5 px-4 text-left border cursor-pointer whitespace-nowrap ${
                activeTab === "wishlist" ? "border-gold bg-surface-dim/20 text-gold" : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
            </button>

            <button
              onClick={() => setActiveTab("details")}
              className={`flex items-center gap-3 text-label-caps py-2.5 px-4 text-left border cursor-pointer whitespace-nowrap ${
                activeTab === "details" ? "border-gold bg-surface-dim/20 text-gold" : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Account Details</span>
            </button>
          </div>

          {/* Details / Content panel right column */}
          <div className="md:col-span-9 border border-border-hairline p-6 md:p-8 bg-surface-dim/10">
            
            {/* Orders Panel tab */}
            {activeTab === "orders" && (
              <SectionReveal className="space-y-6">
                <h3 className="font-serif text-2xl border-b border-border-hairline/60 pb-3">Order History</h3>
                
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((o) => (
                      <div key={o.id} className="border border-border-hairline p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-gold-hover transition-colors duration-300">
                        <div className="space-y-1">
                          <span className="text-xs font-sans text-gold font-medium uppercase tracking-widest">{o.id}</span>
                          <p className="font-serif text-lg">{o.items}</p>
                          <p className="text-xs font-sans text-on-surface-variant font-light">Placed on {o.date}</p>
                        </div>
                        <div className="flex flex-row md:flex-col items-between md:items-end justify-between w-full md:w-auto gap-2 border-t md:border-t-0 border-border-hairline/40 pt-4 md:pt-0">
                          <span className="text-xs font-sans text-on-surface font-light">Total: ${o.total.toFixed(2)}</span>
                          <span className="text-[10px] font-sans text-on-surface uppercase border border-border-hairline px-2 py-0.5 tracking-wider bg-surface-dim">
                            {o.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-sans text-on-surface-variant font-light">You have no order history.</p>
                )}
              </SectionReveal>
            )}

            {/* Addresses Panel tab */}
            {activeTab === "addresses" && (
              <SectionReveal className="space-y-6">
                <div className="flex justify-between items-baseline border-b border-border-hairline/60 pb-3">
                  <h3 className="font-serif text-2xl">Saved Addresses</h3>
                  <Button size="sm" variant="secondary" className="text-[9px]">ADD NEW ADDRESS</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((a) => (
                    <div key={a.id} className="border border-border-hairline p-6 space-y-4 text-left">
                      <span className="text-label-caps text-gold">{a.type}</span>
                      <div className="text-sm font-sans font-light text-on-surface-variant space-y-1 leading-relaxed">
                        <p className="font-medium text-on-surface">{a.name}</p>
                        <p>{a.street}</p>
                        <p>{a.city}, {a.state} {a.zip}</p>
                      </div>
                      <div className="flex gap-4 pt-2 text-xs font-sans text-gold">
                        <button className="hover:underline cursor-pointer">Edit</button>
                        <button className="hover:underline text-tertiary cursor-pointer">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            )}

            {/* Wishlist Panel tab */}
            {activeTab === "wishlist" && (
              <SectionReveal className="space-y-6">
                <h3 className="font-serif text-2xl border-b border-border-hairline/60 pb-3">Wishlist</h3>
                <p className="text-sm font-sans text-on-surface-variant font-light">
                  Your wishlist is empty. Explore products to bookmark your favorites.
                </p>
                <div className="pt-2">
                  <Button asChild variant="primary">
                    <Link href="/shop">EXPLORE PRODUCTS</Link>
                  </Button>
                </div>
              </SectionReveal>
            )}

            {/* Account Details Panel tab */}
            {activeTab === "details" && (
              <SectionReveal className="space-y-6">
                <h3 className="font-serif text-2xl border-b border-border-hairline/60 pb-3">Account Details</h3>
                
                <div className="space-y-4 max-w-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-on-surface-variant uppercase tracking-widest font-sans font-medium">First Name</label>
                      <Input type="text" defaultValue="Aidan" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-on-surface-variant uppercase tracking-widest font-sans font-medium">Last Name</label>
                      <Input type="text" defaultValue="Vance" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-on-surface-variant uppercase tracking-widest font-sans font-medium">Email Address</label>
                    <Input type="email" defaultValue="aidan.vance@studio.com" />
                  </div>

                  <div className="pt-4">
                    <Button variant="technical">SAVE CHANGES</Button>
                  </div>
                </div>
              </SectionReveal>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
