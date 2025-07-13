"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}

/**
 * Simple FadeIn component for basic fade-in animations.
 * @param children - The content to animate
 * @param className - Optional CSS classes
 * @param duration - Animation duration in seconds
 */
export default function FadeIn({
  children,
  className = "",
  duration = 0.6,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
