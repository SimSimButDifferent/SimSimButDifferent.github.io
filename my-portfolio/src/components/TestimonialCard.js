"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

// Testimonial Card Component
export default function TestimonialCard({
  logo,
  logoAlt,
  website,
  name,
  quotes,
  animationDelay = 0,
  alignRight = false,
}) {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      className="flex"
      initial={{ opacity: 0, x: alignRight ? 100 : -100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: animationDelay }}
    >
      <div className="p-5 w-full">
        <motion.div
          className="bg-white p-5 rounded-2xl shadow-xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href={website}
            className={`flex ${
              alignRight ? "justify-end pr-20" : "justify-start pl-10"
            }`}
          >
            <Image
              className="icons rounded-full"
              src={logo}
              height={alignRight ? 150 : 200}
              width={alignRight ? 150 : 200}
              alt={logoAlt}
            />
          </a>
          <h3
            className={`flex textlg ${
              alignRight ? "justify-end" : ""
            } rounded-2xl p-5`}
          >
            {name}
          </h3>
          <div className="textsm italic bg-sky-200 rounded-2xl shadow-xl">
            {quotes.map((quote, index) => (
              <p key={index} className="p-4">
                {quote}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
