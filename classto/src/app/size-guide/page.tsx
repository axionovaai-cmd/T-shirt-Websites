import React from "react";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function SizeGuidePage() {
  const sizes = [
    { size: "S", chest: '36" - 38"', waist: '30" - 32"', length: '27.5"' },
    { size: "M", chest: '38" - 40"', waist: '32" - 34"', length: '28"' },
    { size: "L", chest: '40" - 42"', waist: '34" - 36"', length: '28.5"' },
    { size: "XL", chest: '42" - 44"', waist: '36" - 38"', length: '29"' },
    { size: "XXL", chest: '44" - 46"', waist: '38" - 40"', length: '29.5"' }
  ];

  return (
    <div className="bg-black text-on-surface pt-32 pb-24 font-sans select-none">
      <div className="max-w-3xl mx-auto px-6">
        
        <SectionReveal className="text-center mb-16 space-y-2">
          <span className="text-label-caps text-gold">GARMENT SPECS</span>
          <h1 className="font-serif text-3xl md:text-5xl font-light text-on-surface uppercase tracking-wide">
            Size Guide
          </h1>
          <p className="text-xs text-on-surface-variant font-sans font-light mt-4 leading-relaxed max-w-md mx-auto">
            Our products are designed for a relaxed, vertical-drape fit. Follow the measurements below to select your desired silhouette.
          </p>
        </SectionReveal>

        {/* Sizes table */}
        <SectionReveal className="border border-border-hairline overflow-hidden bg-surface-dim/10 mb-16">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-hairline text-label-caps text-[10px] bg-surface-dim/40 text-on-surface-variant">
                <th className="p-4 pl-6">SIZE</th>
                <th className="p-4">CHEST WIDTH</th>
                <th className="p-4">WAIST WIDTH</th>
                <th className="p-4 pr-6">BODY LENGTH</th>
              </tr>
            </thead>
            <tbody className="text-sm font-sans font-light text-on-surface-variant divide-y divide-border-hairline/40">
              {sizes.map((row) => (
                <tr key={row.size} className="hover:bg-surface-bright/5 transition-colors">
                  <td className="p-4 pl-6 font-semibold text-on-surface">{row.size}</td>
                  <td className="p-4">{row.chest}</td>
                  <td className="p-4">{row.waist}</td>
                  <td className="p-4 pr-6">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionReveal>

        {/* How to measure guide */}
        <SectionReveal className="space-y-8">
          <h2 className="font-serif text-2xl border-b border-border-hairline/60 pb-3">How to Measure</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h4 className="text-label-caps text-gold">1. Chest</h4>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                Measure around the fullest part of your chest, keeping the tape horizontal under your arms.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-label-caps text-gold">2. Waist</h4>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                Measure around your natural waistline (narrowest part), keeping the tape comfortably loose.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-label-caps text-gold">3. Length</h4>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                Measure from the highest point of the shoulder straight down to the hem of the garment.
              </p>
            </div>
          </div>
        </SectionReveal>

      </div>
    </div>
  );
}
