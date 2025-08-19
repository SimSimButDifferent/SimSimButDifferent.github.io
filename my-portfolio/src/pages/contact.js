import React from "react";
import Head from "next/head";
import GoogleMap from "@/components/Map";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  display: "swap",
});

const ContactPage = () => {
  return (
    <div className={poppins.variable}>
      <Head>
        <title>Dream InReality - Contact</title>
        <meta
          name="description"
          content="Contact us today for 3D CAD Modelling Services!"
        ></meta>
      </Head>
      <main className="pt-4">
        <div className="object-center">
          <Image
            src="/images/contact_header.png"
            width={1920}
            height={1920}
            alt="A hand holding a phone with some contact icons above it, made form light. "
            priority
          />
        </div>
        <div className="bg-white p-10 pb-10 md:shadow-xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-stretch">
              <motion.div
                className="w-full md:w-1/2 h-auto md:h-auto pl-0 md:pl-[10px]"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-sky-300 p-4 rounded-2xl shadow-xl h-full">
                  <div className="flex flex-col bg-white rounded-2xl shadow-xl text-center p-4 h-full justify-center">
                    <motion.h1
                      className="flex headings justify-center"
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      Contact
                    </motion.h1>
                    <div className="textboxes">
                      <p className="pb-5 text-center">
                        If you would like to discuss a project of yours
                      </p>
                      <p className="pb-5 text-center">Get in touch today!</p>
                      <div className="flex flex-row justify-center">
                        <a href="tel:+441233234583">
                          <Image
                            src="/images/call_sky_400.svg"
                            height={30}
                            width={30}
                            alt="Call icon of a phone from google icons"
                          ></Image>
                        </a>
                        <a
                          href="tel:+441233234583"
                          className="text-sky-400 hover:text-sky-600 pl-3"
                        >
                          +44 (0)1233 234583
                        </a>
                      </div>
                      <p className="py-5 text-center">
                        Or just drop us a message at
                      </p>
                      <div className="flex flex-row justify-center">
                        <a
                          href="mailto:dreaminrealitycad@gmail.com"
                          className="pr-3"
                        >
                          <Image
                            src="/images/mail_sky_400.svg"
                            height={30}
                            width={30}
                            alt="Call icon of a phone from google icons"
                          ></Image>
                        </a>
                        <div className="flex flex-col text-sky-400 hover:text-sky-600">
                          <Link href="mailto:dreaminrealitycad@gmail.com">
                            dreaminrealitycad
                          </Link>
                          <Link
                            href="mailto:dreaminrealitycad@gmail.com"
                            className="pl-6"
                          >
                            @gmail.com
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="w-full md:w-1/2 h-auto md:h-auto pr-0 md:pr-[10px]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <GoogleMap address="Dream InReality, Swan Lane, Sellindge, Ashford, UK" />
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default ContactPage;
