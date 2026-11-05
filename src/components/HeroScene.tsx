"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent } from "react";

const REST_X = 9;
const REST_Y = -18;

export default function HeroScene() {
  const reducedMotion = useReducedMotion();
  const tiltX = useMotionValue(REST_X);
  const tiltY = useMotionValue(REST_Y);
  const smoothX = useSpring(tiltX, { stiffness: 90, damping: 24, mass: 0.8 });
  const smoothY = useSpring(tiltY, { stiffness: 90, damping: 24, mass: 0.8 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(REST_X - y * 16);
    tiltY.set(REST_Y + x * 24);
  }

  function handlePointerLeave() {
    tiltX.set(REST_X);
    tiltY.set(REST_Y);
  }

  return (
    <div
      className="hero-scene"
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero-scene-shadow" />
      <motion.div
        className="hero-scene-rig"
        style={{ rotateX: smoothX, rotateY: smoothY }}
      >
        <div className="hero-scene-orbit hero-scene-orbit-one" />
        <div className="hero-scene-orbit hero-scene-orbit-two" />
        <div className="hero-scene-sheet hero-scene-sheet-back" />
        <div className="hero-scene-sheet hero-scene-sheet-mid" />
        <div className="hero-scene-core">
          <span className="hero-scene-core-right" />
          <span className="hero-scene-core-bottom" />
          <span className="hero-scene-initials">JN</span>
          <span className="hero-scene-corner hero-scene-corner-top" />
          <span className="hero-scene-corner hero-scene-corner-bottom" />
        </div>
        <span className="hero-scene-point hero-scene-point-one" />
        <span className="hero-scene-point hero-scene-point-two" />
      </motion.div>
    </div>
  );
}
