import Image from "next/image";
import { Poppins } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  useScrollAnimation,
  animationVariants,
} from "../hooks/useScrollAnimation";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "600", "900"],
});

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div>
      <Head>
        <title>Dream InReality - 3D Cad Modelling Services</title>
        <meta name="description" content="3D CAD Modelling Services UK"></meta>
      </Head>
      <main>
        <motion.div
          className="h-screen bg-[url('/images/header-assembly-blue.png')] bg-contain bg-no-repeat bg-origin-content pb-20 bg-bottom-25 sm:bg-right sm:bg-70% lg:bg-right-bottom lg:bg-70% xl:bg-80%"
          style={{ y }}
        >
          <div className="flex flex-col">
            <motion.div
              className="px-5 pt-10 lg:pb-10"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                className="lg:pt-0 md:pt-0"
                src="/images/dream_inreality_logo_lg_logo.svg"
                height={500}
                width={500}
                alt="Dream InReality Logo - An illusion of a 3D cube overlapping with the Company name on the right."
              />
            </motion.div>
            <motion.div
              className="flex flex-col pt-none pl-5"
              style={{ opacity }}
            >
              <motion.p
                className="headertext max-w-xl font-light rounded-lg pt-2 pt-10 md:pt-20"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                We produce
              </motion.p>
              <motion.h1
                className="headertext font-bold py-2 text-sky-400"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                3D CAD Models
              </motion.h1>
              <motion.p
                className="headertext font-light"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                for mass-production
              </motion.p>
              <motion.div
                className="pt-3 xl:pt-5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="headertext text-white font-bold bg-sky-400 rounded-lg px-2 hover:bg-sky-600"
                >
                  Contact
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 grid-cols-1 bg-[url('/images/bambrella-umbrella-hr.jpg')] bg-fixed bg-no-repeat bg-center  min-h-screen">
          <ScrollReveal variant="fadeInLeft">
            <div className="flex mx-auto bg-white opacity-90 h-full place-content-center items-center shadow-xl bg-gray-100">
              <motion.div
                whileHover={{ rotateY: 15 }}
                transition={{ duration: 0.3 }}
                style={{ perspective: 1000 }}
              >
                <Image
                  className="bg-white opacity-95 rounded-xl p-4 bg-gray-100"
                  src="/images/dir-logo-01.svg"
                  height={350}
                  width={350}
                  alt="Dream InReality Logo - An illusion of a 3D cube overlapping"
                />
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeInRight">
            <div className="flex flex-col justify-center items-center h-full p-4">
              <div className="opacity-90 lg:p-4 max-w-xl">
                <motion.div
                  className="bg-gray-100 rounded-2xl p-4 shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h2
                    className="htags text-center mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    3D Cad modelling Services UK
                  </motion.h2>
                  <div className="p-4 rounded-2xl">
                    <p className="textsm lg:text-xl pb-4">
                      Welcome to Dream InReality 3D CAD modelling services. We
                      help people create consumer products by creating 3D models
                      that are parametric, easy to modify and make.
                    </p>
                    <p className="textsm lg:text-xl pb-4">
                      {" "}
                      Whether electronic or mechanical, we can take you through
                      the product development process, with our 3D CAD modelling
                      services.
                    </p>
                    <p className="textsm lg:text-xl">
                      Our 3D CAD modelling services begin with your idea,
                      through the prototyping and testing, with 3D printing.
                      Then finalise designs, outputting construction drawings
                      and bill of materials for manufacturers. We can also
                      output photorealistic renders to bring your product to
                      life.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
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
              description="Parametric 3D CAD modelling techniques to create 3D models that allow easy alterations, saving time in the design process."
            />
            <ServiceCard
              icon="/images/prototyping_icon.svg"
              iconAlt="3d model icon in black"
              title="Rapid Prototyping"
              description="Develop and build functional prototypes to test and validate your product design concepts, through 3D printing."
            />
            <ServiceCard
              icon="/images/render_icon.svg"
              iconAlt="Camera shutter icon"
              title="Photo Realistic Rendering"
              description="Generate stunning, life-like visualizations of your product using advanced rendering techniques."
            />
            <ServiceCard
              icon="/images/drawings_icon.svg"
              iconAlt="A factory icon"
              title="Construction Drawings"
              description="Prepare detailed and accurate construction drawings to provide the information needed to produce at scale."
            />
            <ServiceCard
              icon="/images/assembly_icon.svg"
              iconAlt="two rings interlinking in black"
              title="Assembly Modelling"
              description="Construct complex assembly models by integrating multiple components into a single 3D model, ensuring proper fit and functionality."
              iconSize={60}
              extraPadding
            />
            <ServiceCard
              icon="/images/reverse_engineering_icon.svg"
              iconAlt="3d model icon in black"
              title="Reverse Engineering"
              description="Create 3D models from existing physical objects or scanned data. Reverse engineering is valuable for reproducing parts with complex geometries."
            />
            <ServiceCard
              icon="/images/file_conversion.svg"
              iconAlt="folder icon with an arrow in black"
              title="CAD File Conversion"
              description="Convert CAD files between formats to ensure compatibility with different software. Streamlining collaboration and exchange with suppliers, and partners."
            />
            <ServiceCard
              icon="/images/design_optimization.svg"
              iconAlt="Upwards arrow in black"
              title="Design Optimization"
              description="Analyze and refine existing designs to enhance performance, reduce material usage, or optimize manufacturing processes."
            />
          </StaggeredGrid>
        </div>

        <div className="grid grid-col shadow-xl justify-center items-center p-4">
          <ScrollReveal variant="fadeInUp">
            <div className="bg-sky-100 rounded-2xl p-10 shadow-xl">
              <div className="pb-10">
                <h3 className="phoneheadings bg-white md:text-3xl lg:text-4xl text-center p-5 rounded-2xl shadow-xl">
                  Testemonials
                </h3>
              </div>
              <motion.div className="flex flex-col justify-between bg-sky-300 rounded-2xl shadow-xl">
                <TestimonialCard
                  logo="/images/mws_logo.png"
                  logoAlt="Microworkshops 3D printing ninja's logo. A cartoon ninja next to the company name in 3d text."
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
    </div>
  );
}

// Service Card Component with 3D hover effect
function ServiceCard({
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

// Testimonial Card Component
function TestimonialCard({
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
          <h4
            className={`flex textlg ${
              alignRight ? "justify-end" : ""
            } rounded-2xl p-5`}
          >
            {name}
          </h4>
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

// Staggered Grid Component for Services
function StaggeredGrid({ children }) {
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
