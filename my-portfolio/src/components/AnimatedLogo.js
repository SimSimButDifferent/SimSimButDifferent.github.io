import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedLogo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  // Animation variants for path drawing
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    },
  };

  // Container animation that controls the sequence
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div ref={ref} className="bg-white opacity-95 rounded-xl p-4 bg-gray-100">
      <motion.svg
        width="350"
        height="350"
        viewBox="0 0 751.66 887.49"
        style={{ enableBackground: "new 0 0 751.66 887.49" }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.g>
          <motion.polygon
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            points="12.25,156.65 283.36,9.98 741.14,247.76 470.03,395.54"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.polygon
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            points="468.92,334.43 631.14,248.87 283.36,69.98 123.36,154.43"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.polyline
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            points="283.36,237.77 283.36,127.76 177.76,182.76"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.polyline
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            points="12.25,156.65 12.25,637.76 472.25,877.76 741.14,732.2"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.line
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            x1="230.56"
            y1="210.27"
            x2="230.56"
            y2="155.26"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.polyline
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            points="339.96,389.72 339.96,464.95 691.4,642.38 691.4,340.09 525.76,429.59 528.18,559.98"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.polyline
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            points="230.56,332.15 230.56,457.53 61.28,544.34 61.28,243.06 412.25,427.76 412.25,501.45"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.polyline
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            points="12.25,637.76 283.36,489.98 741.14,732.2 741.14,247.76"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.line
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            x1="470.03"
            y1="395.54"
            x2="470.03"
            y2="530.62"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.line
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            x1="117.89"
            y1="272.86"
            x2="117.89"
            y2="515.31"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.line
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            x1="283.36"
            y1="489.98"
            x2="283.36"
            y2="359.93"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.line
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            x1="635.76"
            y1="370.16"
            x2="635.76"
            y2="614.29"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.line
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            x1="283.36"
            y1="127.76"
            x2="574.38"
            y2="278.8"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.line
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            x1="339.96"
            y1="267.25"
            x2="339.96"
            y2="157.13"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.polyline
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            points="470.03,819.06 631.14,732.2 283.36,550.47 123.36,634.21 470.03,819.06"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.polyline
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            points="578.55,704.72 524.29,730.23 470.03,755.74 173.84,607.79"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.line
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            x1="524.29"
            y1="676.37"
            x2="524.29"
            y2="730.23"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.line
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            x1="412.25"
            y1="617.82"
            x2="412.25"
            y2="726.88"
            variants={pathVariants}
          />
        </motion.g>

        <motion.g>
          <motion.line
            className="fill-none stroke-black stroke-[8px]"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            x1="470.03"
            y1="648.01"
            x2="470.03"
            y2="755.74"
            variants={pathVariants}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default AnimatedLogo;
