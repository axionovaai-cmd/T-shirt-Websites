import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { CheckCircle2 } from "lucide-react";

export default function ConfirmationPage() {
  const orderNumber = `CL-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="bg-black text-on-surface min-h-screen flex items-center justify-center p-6 pt-32">
      <SectionReveal className="max-w-md w-full text-center space-y-8 border border-border-hairline p-8 md:p-12 bg-surface-dim/20">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-gold stroke-1" />
        </div>

        <div className="space-y-3">
          <span className="text-label-caps text-gold">Order Confirmed</span>
          <h1 className="font-serif text-3xl font-light">Thank you.</h1>
          <p className="text-sm font-sans text-on-surface-variant font-light">
            Your order has been placed. We will email you the tracking details shortly.
          </p>
        </div>

        <div className="border-y border-border-hairline/40 py-6 space-y-1">
          <p className="text-xs text-on-surface-variant font-sans font-light">ORDER NUMBER</p>
          <p className="text-lg font-sans font-medium text-gold">{orderNumber}</p>
        </div>

        <div className="pt-4">
          <Button asChild variant="technical" className="w-full h-12">
            <Link href="/shop">CONTINUE SHOPPING</Link>
          </Button>
        </div>
      </SectionReveal>
    </div>
  );
}
