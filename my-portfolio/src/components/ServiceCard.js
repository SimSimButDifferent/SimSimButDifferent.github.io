"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Service Card Component with 3D hover effect
export default function ServiceCard({
  icon,
  iconAlt,
  title,
  description,
  iconSize = 80,
  extraPadding = false,
}) {
  return (
    <motion.div
      className=""
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        z: 50,
      }}
      transition={{ duration: 0.3 }}
      style={{ perspective: 1000 }}
    >
      <div className="gridboxes h-full">
        <div
          className={`flex justify-center ${extraPadding ? "pt-2 pb-4" : ""}`}
        >
          <Image
            className="icons"
            src={icon}
            height={iconSize}
            width={iconSize}
            alt={iconAlt}
          />
        </div>
        <h3 className="text-xl">{title}</h3>
        <p className="textboxes">{description}</p>
      </div>
    </motion.div>
  );
}
