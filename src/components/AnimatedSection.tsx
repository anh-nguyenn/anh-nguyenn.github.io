"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * AnimatedSection component that provides a simple fade-in animation.
 * Alternative to AnimatedArticle with more flexible styling.
 * @param children - The content to animate
 * @param className - Optional CSS classes
 * @param delay - Optional delay before animation starts
 */
export default function AnimatedSection({
  children,
  className = "mx-auto px-4 max-w-4xl",
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
