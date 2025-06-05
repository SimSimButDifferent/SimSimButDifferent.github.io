import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import {
  useScrollAnimation,
  animationVariants,
} from "../hooks/useScrollAnimation";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  display: "swap",
});

export default function About() {
  return (
    <div className={poppins.variable}>
      <Head>
        <title>About - Dream InReality</title>
        <meta name="description" content="About Dream InReality"></meta>
      </Head>
      <main className="min-h-screen bg-white py-10">
        <div className="container mx-auto px-4">
          {/* Title */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="phoneheadings lg:text-2xl xl:text-4xl">
              About Dream InReality
            </h1>
          </motion.div>

          {/* Mobile Layout: Image below title */}
          <div className="lg:hidden">
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/images/header-render-anaglyph.jpg"
                alt="3D CAD rendering with anaglyph effect showing technical design process"
                width={300}
                height={200}
                className="rounded-xl"
              />
            </motion.div>

            <motion.div className="space-y-6">
              <motion.p
                className="textsm lg:text-base"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Dream InReality was founded by Simeon Campbell, to help
                designers and manufacturers turn their product ideas into
                reality. We believe that 3D modelling is a crucial step in any
                product design process. It helps you visualise and refine your
                ideas, and it can also be used to produce photorealistic renders
                that can be used for marketing purposes or to impress clients.
              </motion.p>

              <motion.p
                className="textsm lg:text-base"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Before establishing Dream InReality, Simeon worked for a 3D
                printing company in London. During that time, he designed and
                produced 3D models for a wide array of industries, from garden
                furniture to musical equipment. Simeon developed an
                understanding for what can make a good 3D model for 3D printing,
                and how to produce detailed construction drawings for mass
                production.
              </motion.p>

              <motion.p
                className="textsm lg:text-base"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                At Dream InReality we are passionate about helping people turn
                their ideas into tangible products. We believe in the power of
                technology to transform industries and improve lives. Whether
                you are an entrepreneur with a new product idea or a company
                looking to streamline your manufacturing process, Dream
                InReality is here to help.
              </motion.p>
            </motion.div>
          </div>

          {/* Desktop Layout: Text left, Image right */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.p
                className="textsm lg:text-base"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Dream InReality was founded by Simeon Campbell, to help
                designers and manufacturers turn their product ideas into
                reality. We believe that 3D modelling is a crucial step in any
                product design process. It helps you visualise and refine your
                ideas, and it can also be used to produce photorealistic renders
                that can be used for marketing purposes or to impress clients.
              </motion.p>

              <motion.p
                className="textsm lg:text-base"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Before establishing Dream InReality, Simeon worked for a 3D
                printing company in Fulham. During that time, he designed and
                produced 3D models for a wide array of industries, from
                architects to jewellery makers. Simeon developed an
                understanding for what can make a good 3D model for 3D printing,
                and how to produce detailed construction drawings.
              </motion.p>

              <motion.p
                className="textsm lg:text-base"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                At Dream InReality we are passionate about helping people turn
                their ideas into tangible products. We believe in the power of
                technology to transform industries and improve lives. Whether
                you are an entrepreneur with a new product idea or a company
                looking to streamline your manufacturing process, Dream
                InReality is here to help.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Image
                src="/images/header-render-anaglyph.jpg"
                alt="3D CAD rendering with anaglyph effect showing technical design process"
                width={500}
                height={400}
                className="rounded-xl"
              />
            </motion.div>
          </div>

          {/* Contact Button */}
          <motion.div
            className="text-center pt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Link
              href="/contact"
              className="contactText button bg-sky-300 p-4 text-black font-light hover:bg-sky-500 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// Scroll Reveal Wrapper Component
function ScrollReveal({ children, variant = "fadeInUp" }) {
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
