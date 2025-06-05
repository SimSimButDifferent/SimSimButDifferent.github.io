import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  useScrollAnimation,
  animationVariants,
} from "../hooks/useScrollAnimation";

export default function About() {
  return (
    <div>
      <Head>
        <title>About - Dream InReality</title>
        <meta name="description" content="About Dream InReality"></meta>
      </Head>
      <main className="flex bg-[url('/images/header-assembly-blue.png')] bg-contain bg-no-repeat bg-origin-content pb-20 bg-bottom sm:bg-bottom sm:bg-50% lg:bg-bottom-right lg:bg-50% xl:bg-60%">
        <motion.div
          className="flex flex-col p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="p-4 lg:p-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="phoneheadings lg:text-4xl">About Dream InReality</h1>
          </motion.div>
          <motion.div className="p-4 lg:pl-20 max-w-4xl">
            <motion.p
              className="textsm"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Dream InReality was founded by Simeon Campbell, to help designers
              and manufacturers turn their product ideas into reality. We
              believe that 3D modelling is a crucial step in any product design
              process. It helps you visualise and refine your ideas, and it can
              also be used to produce photorealistic renders that can be used
              for marketing purposes or to impress clients.
            </motion.p>
            <br />
            <motion.p
              className="textsm"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Before establishing Dream InReality, Simeon worked for a 3D
              printing company in Fulham. During that time, he designed and
              produced 3D models for a wide array of industries, from architects
              to jewellery makers. Simeon developed an understanding for what
              can make a good 3D model for 3D printing, and how to produce
              detailed construction drawings.
            </motion.p>
            <br />
            <motion.p
              className="textsm"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              At Dream InReality we are passionate about helping people turn
              their ideas into tangible products. We believe in the power of
              technology to transform industries and improve lives. Whether you
              are an entrepreneur with a new product idea or a company looking
              to streamline your manufacturing process, Dream InReality is here
              to help.
            </motion.p>
            <br />
            <motion.p className="text-center pt-5">
              <Link
                href="/contact"
                className="contactText button bg-sky-300 p-4 text-black font-light hover:bg-sky-500"
              >
                Get In Touch
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
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
