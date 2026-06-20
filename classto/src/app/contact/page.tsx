"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="bg-black text-on-surface pt-32 pb-24 font-sans select-none">
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Left: contact details */}
        <div className="md:col-span-5 space-y-8">
          <SectionReveal className="space-y-2">
            <span className="text-label-caps text-gold">SUPPORT CENTER</span>
            <h1 className="font-serif text-3xl md:text-5xl font-light text-on-surface uppercase tracking-wide">
              Contact
            </h1>
            <p className="text-xs text-on-surface-variant font-sans font-light leading-relaxed">
              We are available to answer sizing, fit, or order inquiries.
            </p>
          </SectionReveal>

          <SectionReveal className="space-y-6 pt-4 text-xs font-sans font-light text-on-surface-variant">
            <div className="space-y-1">
              <span className="text-[10px] text-on-surface uppercase tracking-widest font-medium">Digital Concierge</span>
              <p className="hover:text-gold transition-colors duration-300">concierge@classto.com</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-on-surface uppercase tracking-widest font-medium">Hours</span>
              <p>Monday &mdash; Friday</p>
              <p>9:00 AM &mdash; 6:00 PM EST</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-on-surface uppercase tracking-widest font-medium">Press Inquiry</span>
              <p className="hover:text-gold transition-colors duration-300">media@classto.com</p>
            </div>
          </SectionReveal>
        </div>

        {/* Right: form panel */}
        <div className="md:col-span-7 border border-border-hairline p-6 md:p-8 bg-surface-dim/10">
          {submitted ? (
            <SectionReveal className="text-center py-12 space-y-4">
              <span className="text-label-caps text-gold">Inquiry Received</span>
              <p className="font-serif text-lg">Thank you for writing.</p>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed max-w-xs mx-auto">
                A member of our digital concierge team will respond within 24 hours.
              </p>
              <div className="pt-4">
                <Button size="sm" variant="secondary" onClick={() => setSubmitted(false)}>
                  SEND ANOTHER MESSAGE
                </Button>
              </div>
            </SectionReveal>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <SectionReveal className="space-y-4">
                <Input
                  type="text"
                  placeholder="YOUR NAME"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                {/* Textarea styling matching border-b input */}
                <div className="space-y-1">
                  <textarea
                    placeholder="HOW CAN WE ASSIST YOU?"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent border-b border-border-hairline py-3 text-base md:text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-gold transition-colors duration-300 font-sans resize-none rounded-none"
                  />
                </div>
              </SectionReveal>

              <SectionReveal className="pt-2">
                <Button type="submit" variant="technical" className="w-full">
                  SUBMIT INQUIRY
                </Button>
              </SectionReveal>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
