"use client";

import { ReactNode } from "react";

interface NoAnimationProps {
  children: ReactNode;
  className?: string;
}

/**
 * NoAnimation component that renders content without any animations.
 * Useful for debugging or when animations need to be disabled.
 * @param children - The content to render
 * @param className - Optional CSS classes
 */
export default function NoAnimation({
  children,
  className = "mx-auto px-4 max-w-4xl",
}: NoAnimationProps) {
  return <div className={className}>{children}</div>;
}
