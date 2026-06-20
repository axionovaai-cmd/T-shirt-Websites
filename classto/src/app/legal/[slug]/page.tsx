import React from "react";
import { notFound } from "next/navigation";
import { SectionReveal } from "@/components/ui/SectionReveal";

interface LegalPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;

  // Render mock legal content based on slug
  let title = "";
  let content = null;

  if (slug === "shipping-returns") {
    title = "Shipping & Returns";
    content = (
      <div className="space-y-6 font-sans font-light text-on-surface-variant leading-relaxed text-sm">
        <p>
          We partner with specialized logistics suppliers to deliver Classto items worldwide. Our products are sourced and packaged in small batches to preserve fabric architecture and guarantee quality.
        </p>
        <h3 className="font-serif text-lg text-on-surface font-normal pt-4">Domestic Shipping</h3>
        <p>
          We offer complimentary standard shipping on all domestic orders over $150. Standard shipping is processed within 48 hours and takes 3 to 5 business days for delivery. Express courier delivery takes 1 to 2 business days and is available for a flat rate of $20.00.
        </p>
        <h3 className="font-serif text-lg text-on-surface font-normal pt-4">International Delivery</h3>
        <p>
          Worldwide courier shipping is available at checkout. Duties and taxes are calculated dynamically and are paid by the customer. Delivery timelines range from 5 to 10 business days depending on location.
        </p>
        <h3 className="font-serif text-lg text-on-surface font-normal pt-4">Returns Policy</h3>
        <p>
          Returns are accepted within 14 days of delivery for store credit or refund. Items must be in original unworn, unwashed condition with all tags intact. Return shipping labels are available upon request; a processing fee of $10.00 will be deducted from your final refund amount.
        </p>
      </div>
    );
  } else if (slug === "privacy-policy") {
    title = "Privacy Policy";
    content = (
      <div className="space-y-6 font-sans font-light text-on-surface-variant leading-relaxed text-sm">
        <p>
          Classto is committed to protecting your privacy. This policy describes how we collect, store, and utilize your personal data during your shopping experience.
        </p>
        <h3 className="font-serif text-lg text-on-surface font-normal pt-4">Data Collection</h3>
        <p>
          We collect personal details (email, shipping address, payment credentials) only when voluntarily provided during account creation or transaction checkout. We utilize standard browser cookies to personalize your navigation and manage persistent cart states.
        </p>
        <h3 className="font-serif text-lg text-on-surface font-normal pt-4">Data Security</h3>
        <p>
          Your transactions are encrypted and processed securely using Stripe Elements or compatible headless gateways. We do not store full credit card credentials on our servers. Your information is never sold to third-party advertising companies.
        </p>
      </div>
    );
  } else if (slug === "terms-of-service") {
    title = "Terms of Service";
    content = (
      <div className="space-y-6 font-sans font-light text-on-surface-variant leading-relaxed text-sm">
        <p>
          Welcome to Classto. By navigating or transacting on our digital boutique, you agree to comply with and be bound by the following terms of service.
        </p>
        <h3 className="font-serif text-lg text-on-surface font-normal pt-4">Intellectual Property</h3>
        <p>
          All assets, graphics, designs, photography, copy, and layout configurations are the intellectual property of Classto. Any unauthorized duplication or reproduction is strictly prohibited.
        </p>
        <h3 className="font-serif text-lg text-on-surface font-normal pt-4">Limitation of Liability</h3>
        <p>
          Our garments are produced in limited production batches. While we strive to present accurate inventory quantities and fabric details, minor variations in fit or shade may occur. Classto is not responsible for direct or indirect losses caused by product unavailability or shipping courier delays.
        </p>
      </div>
    );
  } else {
    notFound();
  }

  return (
    <div className="bg-black text-on-surface pt-32 pb-24 font-sans select-none">
      <div className="max-w-2xl mx-auto px-6">
        <SectionReveal className="space-y-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-label-caps text-gold">LEGAL DETAILS</span>
            <h1 className="font-serif text-3xl md:text-5xl font-light text-on-surface uppercase tracking-wide">
              {title}
            </h1>
          </div>
          <div className="border-t border-border-hairline/40 pt-8">
            {content}
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
