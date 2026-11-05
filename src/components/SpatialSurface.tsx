"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className: string;
};

export default function SpatialSurface({ children, className }: Props) {
  const reducedMotion = useReducedMotion();
  const rotateX = useMotionValue(1);
  const rotateY = useMotionValue(-1);
  const smoothX = useSpring(rotateX, { stiffness: 100, damping: 26 });
  const smoothY = useSpring(rotateY, { stiffness: 100, damping: 26 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(1 - y * 4);
    rotateY.set(-1 + x * 5);
  }

  function handlePointerLeave() {
    rotateX.set(1);
    rotateY.set(-1);
  }

  return (
    <motion.div
      className={`spatial-surface ${className}`}
      style={{ rotateX: reducedMotion ? 0 : smoothX, rotateY: reducedMotion ? 0 : smoothY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  );
}
