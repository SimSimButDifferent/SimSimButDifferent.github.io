"use client";

import { motion } from "framer-motion";
import {
  useScrollAnimation,
  animationVariants,
} from "../hooks/useScrollAnimation";

// Scroll Reveal Wrapper Component
export default function ScrollReveal({ children, variant = "fadeInUp" }) {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animationVariants[variant]}
    >
      {children}
    </motion.div>
  );
}
