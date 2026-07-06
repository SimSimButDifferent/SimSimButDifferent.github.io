"use client";

import { motion } from "framer-motion";
import {
  useScrollAnimation,
  animationVariants,
} from "../hooks/useScrollAnimation";

// Staggered Grid Component for Services
export default function StaggeredGrid({ children }) {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 px-10 pt-4 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animationVariants.staggerContainer}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={animationVariants.fadeInUp}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
