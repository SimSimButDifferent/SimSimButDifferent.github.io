import React from "react";
import { motion, useTransform, useSpring } from "framer-motion";

const TiltBox = ({
  children,
  className,
  tiltDirection = "none",
  mouseX,
  mouseY,
  isTiltEnabled = true,
}) => {
  // Use spring for smooth transitions for the tilt effect
  const smoothOptions = { stiffness: 300, damping: 20, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, smoothOptions);
  const smoothMouseY = useSpring(mouseY, smoothOptions);

  // Define base rotation and style based on the direction prop and user's previous static style
  const baseRotateY = tiltDirection === "left" ? -15 : 15;
  const baseRotateX = -10;
  const rotationRange = 10; // The mouse will add/subtract up to 5 degrees

  // Transform smoothed mouse values into rotation, relative to the base tilt
  const rotateY = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [baseRotateY - rotationRange / 2, baseRotateY + rotationRange / 2]
  );
  const rotateX = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [baseRotateX + rotationRange / 2, baseRotateX - rotationRange / 2] // Inverted for natural feel
  );

  if (!isTiltEnabled) {
    // For smaller screens, apply a simple hover effect
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`h-full ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  // Apply base styles only if a tilt direction is set
  const baseStyle =
    tiltDirection !== "none"
      ? {
          scale: 1.05,
          boxShadow: "0px 15px 30px -5px rgba(0, 0, 0, 0.3)",
        }
      : {};

  return (
    <motion.div
      style={{
        ...baseStyle,
        perspective: 1000,
        rotateY,
        rotateX,
      }}
      className={`h-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default TiltBox;
