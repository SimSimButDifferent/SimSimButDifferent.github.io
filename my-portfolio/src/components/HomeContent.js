"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import AnimatedLogo from "./AnimatedLogo";
import TiltBox from "./TiltBox";
import ScrollReveal from "./ScrollReveal";
import StaggeredGrid from "./StaggeredGrid";
import ServiceCard from "./ServiceCard";
import TestimonialCard from "./TestimonialCard";
import useWindowSize from "../hooks/useWindowSize";

export default function HomeContent() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  // The CSS reduced-motion kill-switch doesn't reach JS-driven animations,
  // so honour the preference here: render the final state immediately.
  const reduceMotion = useReducedMotion();

  const gridRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { width } = useWindowSize();
  const isLgScreen = width >= 1024; // Tailwind's 'lg' breakpoint

  function handleMouseMove({ clientX, clientY, currentTarget }) {
    if (!isLgScreen) return;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    // Normalize to [-0.5, 0.5] so 0 is the center
    mouseX.set(x / width - 0.5);
    mouseY.set(y / height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <main>
      <motion.div
        className="relative h-screen overflow-hidden bg-navy"
        style={{ y }}
      >
        {/* Cube render — decorative, anchored right on wide screens, bottom on mobile */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6 sm:items-center sm:justify-end sm:pb-0 sm:pr-6 lg:pr-10 xl:pr-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/images/3d-logo/dir-logo-3d-cutout-1200.webp"
              alt="Impossible cube — the Dream InReality logo rendered in 3D"
              width={991}
              height={1200}
              priority
              className="h-[30vh] w-auto sm:h-[42vh] lg:h-[56vh] xl:h-[64vh]"
            />
          </motion.div>
        </div>

        <div className="relative z-10 flex h-full flex-col justify-center px-5 pb-[30vh] sm:px-10 sm:pb-0 lg:px-16">
          <motion.div className="flex flex-col pt-none" style={{ opacity }}>
            <motion.p
              className="text-sm font-semibold uppercase tracking-wide text-muted-inverse"
              initial={reduceMotion ? false : { opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Dream InReality
            </motion.p>
            <motion.p
              className="headertext max-w-xl font-light rounded-lg text-ink-inverse"
              initial={reduceMotion ? false : { opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              We produce
            </motion.p>
            <motion.p
              className="headertext font-bold py-2 text-accent-visual"
              initial={reduceMotion ? false : { opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              3D CAD Models
            </motion.p>
            <motion.p
              className="headertext font-light text-ink-inverse"
              initial={reduceMotion ? false : { opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              for mass production
            </motion.p>
            <motion.div
              className="pt-3 xl:pt-5 w-fit"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="headertext rounded-lg bg-accent-visual px-4 py-2 font-bold text-ink hover:bg-cyan-300"
              >
                Contact
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div
        ref={gridRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-[url('/images/bambrella-umbrella-hr.jpg')] bg-fixed bg-no-repeat bg-center min-h-screen p-4 md:p-10 flex items-center"
      >
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 max-w-7xl mx-auto">
          <ScrollReveal variant="fadeInLeft">
            <TiltBox
              tiltDirection="right"
              mouseX={mouseX}
              mouseY={mouseY}
              isTiltEnabled={isLgScreen}
              className="rounded-2xl"
            >
              <div className="flex bg-white opacity-90 h-full place-content-center items-center shadow-xl bg-gray-100 rounded-2xl p-4">
                <AnimatedLogo />
              </div>
            </TiltBox>
          </ScrollReveal>

          <ScrollReveal variant="fadeInRight">
            <TiltBox
              tiltDirection="left"
              mouseX={mouseX}
              mouseY={mouseY}
              isTiltEnabled={isLgScreen}
              className="rounded-2xl"
            >
              <div className="flex flex-col justify-center items-center h-full p-4 bg-gray-100 rounded-2xl shadow-xl opacity-90">
                <div className="lg:p-4 max-w-xl">
                  <h1 className="htags-light text-center mb-6">
                    3D CAD Modelling Services UK
                  </h1>
                  <div className="p-4 rounded-2xl">
                    <p className="textsm lg:text-xl pb-4">
                      Welcome to Dream InReality 3D CAD modelling services. We
                      help product businesses bring consumer products to
                      manufacture by building parametric 3D models that are
                      easy to modify and make.
                    </p>
                    <p className="textsm lg:text-xl pb-4">
                      Whether your product is electronic or mechanical, we
                      take it from sketch to a parametric SolidWorks model
                      ready for prototyping.
                    </p>
                    <p className="textsm lg:text-xl">
                      The work begins with your idea, moves through
                      prototyping and testing with 3D printing, then finalises
                      the design — outputting construction drawings and a bill
                      of materials for manufacturers. We can also output
                      photorealistic renders to bring your product to life.
                    </p>
                  </div>
                </div>
              </div>
            </TiltBox>
          </ScrollReveal>
        </div>
      </div>

      <div className="flex flex-col items-center pb-4 shadow-xl justify-center background-origin-content bg-[url('/images/bambrella-umbrella-hr.jpg')] bg-fixed bg-no-repeat bg-center">
        <ScrollReveal variant="scale">
          <div className="p-10 py-10">
            <h2 className="phoneheadings bg-gray-100 bg-opacity-95 md:text-2xl lg:text-4xl xl:5xl text-center p-5 rounded-2xl shadow-xl">
              Our 3D CAD Design Services
            </h2>
          </div>
        </ScrollReveal>

        <StaggeredGrid>
          <ServiceCard
            icon="/images/parametric_icon.svg"
            iconAlt="A square with a small square on each corner, with a capital A in the middle, in black"
            title="Parametric 3D Models"
            href="/services/solidworks-design"
            description="Parametric SolidWorks models, delivered as native SLDPRT/SLDASM files with STEP exports, built so dimensions and features can be altered without rework."
          />
          <ServiceCard
            icon="/images/prototyping_icon.svg"
            iconAlt="3D printed prototype part icon in black"
            title="Rapid Prototyping"
            href="/services/solidworks-design"
            description="Functional prototypes to test and validate your design, 3D printed from STL files produced directly from your CAD model."
          />
          <ServiceCard
            icon="/images/render_icon.svg"
            iconAlt="Camera shutter icon"
            title="Photorealistic Rendering"
            href="/services/photorealistic-rendering"
            description="Photorealistic visualisations of your product from the CAD model, supplied as high-resolution images for listings, pitches and packaging."
          />
          <ServiceCard
            icon="/images/drawings_icon.svg"
            iconAlt="A factory icon"
            title="Construction Drawings"
            href="/services/construction-drawings"
            description="Drawing packs for manufacture: dimensioned and toleranced PDF drawings, DXF profiles and a bill of materials."
          />
          <ServiceCard
            icon="/images/assembly_icon.svg"
            iconAlt="two rings interlinking in black"
            title="Assembly Modelling"
            href="/services/solidworks-design"
            description="Multi-part SolidWorks assemblies (SLDASM) that integrate your components into a single 3D model and check fit and clearance before anything is made."
            iconSize={60}
            extraPadding
          />
          <ServiceCard
            icon="/images/reverse_engineering_icon.svg"
            iconAlt="Reverse engineering icon in black"
            title="Reverse Engineering"
            href="/services/reverse-engineering"
            description="Measured or scanned parts rebuilt as parametric SolidWorks models — useful when drawings are lost or a legacy part needs reproducing."
          />
          <ServiceCard
            icon="/images/file_conversion.svg"
            iconAlt="folder icon with an arrow in black"
            title="CAD File Conversion"
            href="/services/cad-file-conversion"
            description="Conversion between STEP, IGES, DXF and native SolidWorks formats, so your files open cleanly in your suppliers' software."
          />
          <ServiceCard
            icon="/images/design_optimization.svg"
            iconAlt="Upwards arrow in black"
            title="Design Optimisation"
            href="/services/dfm-consultancy"
            description="Analyse and refine existing designs to improve performance, reduce material use or simplify manufacture. Delivered as updated SLDPRT/SLDASM files with revised PDF drawings."
          />
        </StaggeredGrid>
      </div>

      <div className="grid grid-col shadow-xl justify-center items-center p-4">
        <ScrollReveal variant="fadeInUp">
          <div className="bg-cyan-100 rounded-2xl p-10 shadow-xl">
            <div className="pb-10">
              <h2 className="phoneheadings bg-white md:text-3xl lg:text-4xl text-center p-5 rounded-2xl shadow-xl">
                Testimonials
              </h2>
            </div>
            <motion.div className="flex flex-col justify-between bg-cyan-300 rounded-2xl shadow-xl">
              <TestimonialCard
                logo="/images/mws_logo.png"
                logoAlt="Microworkshops logo - a cartoon ninja next to the company name in 3D text."
                website="https://microworkshops.co.uk/"
                name="Elliot @ Microworkshops"
                quotes={[
                  '"After doing several smaller jobs he was then responsible for the company\'s two main CAD accounts which worked really well. This happened faster than my own progression which proved to me he is a fast learner."',
                  '"Simeon has tons of good qualities but the ones I appreciate the most are his consistency, honesty and sense of decency. True team player."',
                ]}
                animationDelay={0}
              />
              <TestimonialCard
                logo="/images/shade_spec.png"
                logoAlt="Shade Specialists Logo"
                website="https://shadespecialists.co.uk/"
                name="Rupert @ Bambrella / ShadeSpecialists"
                quotes={[
                  '"We have worked with Simeon Campbell on a number of design projects. Simeon completed any design work we sent to him quickly and to a consistently high standard."',
                  '"We would certainly recommend him and would be happy to work with him again."',
                ]}
                animationDelay={0.3}
                alignRight
              />
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
