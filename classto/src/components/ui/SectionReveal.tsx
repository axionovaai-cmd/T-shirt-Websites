"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  yOffset = 25,
  once = true,
}: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1.0], // cubic-bezier matching high-end easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
