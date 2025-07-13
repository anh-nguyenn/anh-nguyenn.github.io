"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScaleInProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  scale?: number;
}

/**
 * ScaleIn component that provides a scale-in animation effect.
 * @param children - The content to animate
 * @param className - Optional CSS classes
 * @param duration - Animation duration in seconds
 * @param delay - Delay before animation starts
 * @param scale - Initial scale value (default: 0.8)
 */
export default function ScaleIn({
  children,
  className = "mx-auto px-4 max-w-4xl",
  duration = 0.6,
  delay = 0,
  scale = 0.8,
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay, type: "spring", stiffness: 100 }}
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
