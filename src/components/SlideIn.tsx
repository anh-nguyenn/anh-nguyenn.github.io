"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideInProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
}

/**
 * SlideIn component that provides slide-in animations from different directions.
 * @param children - The content to animate
 * @param className - Optional CSS classes
 * @param direction - Direction to slide from (up, down, left, right)
 * @param duration - Animation duration in seconds
 * @param delay - Delay before animation starts
 */
export default function SlideIn({
  children,
  className = "mx-auto px-4 max-w-4xl",
  direction = "up",
  duration = 0.6,
  delay = 0,
}: SlideInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 50 };
      case "down":
        return { opacity: 0, y: -50 };
      case "left":
        return { opacity: 0, x: 50 };
      case "right":
        return { opacity: 0, x: -50 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay }}
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
