"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  useScrollAnimation,
  animationVariants,
} from "../hooks/useScrollAnimation";

// Scroll Reveal Wrapper Component
export default function ScrollReveal({ children, variant = "fadeInUp" }) {
  const { ref, isInView } = useScrollAnimation();
  // The CSS reduced-motion kill-switch doesn't reach JS-driven animations,
  // so honour the preference here: render the final state immediately.
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion || isInView ? "visible" : "hidden"}
      variants={animationVariants[variant]}
    >
      {children}
    </motion.div>
  );
}
