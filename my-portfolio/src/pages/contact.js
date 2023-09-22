import React from "react";
import Head from "next/head";
import Map from "@/components/Map";
import Link from "next/link";
import Image from "next/image";

const ContactPage = () => {
  return (
    <div>
      <Head>
        <title>Dream InReality - Contact</title>
        <meta
          name="description"
          content="Contact us today for 3D CAD Modelling Services!"
        ></meta>
      </Head>
      <main className="pt-4">
        <div className="object-center ">
          <Image
            src="/images/contact_header3.jpg"
            width={1920}
            height={1920}
            alt="A hand holding a phone with some contact icons above it, made form light. "
            priority
          />
        </div>
        <div className="flex flex-col bg-white p-10 md:flex-row pb-10 md:shadow-xl justify-around">
          <div className="outerBox">
            <div className="flex flex-col bg-white rounded-2xl shadow-xl text-center p-2">
              <h1 className="flex headings justify-center">Contact</h1>
              <div className="textboxes">
                <p className="pb-5 text-center lg:text-left">
                  If you would like to discuss a project of yours
                </p>
                <p className="pb-5 text-center lg:text-left">
                  Get in touch today!
                </p>
                <div className="flex flex-row justify-center md:justify-start">
                  <a href="tel:+442476981341">
                    <Image
                      src="/images/call_sky_400.svg"
                      height={30}
                      width={30}
                      alt="Call icon of a phone from google icons"
                    ></Image>
                  </a>
                  <a
                    href="tel:+442476981341"
                    className="text-sky-400 hover:text-sky-600 pl-3"
                  >
                    +44 (0)24 7698 1341
                  </a>
                </div>
                <p className="py-5 text-center lg:text-left">
                  Or just drop us a message at
                </p>
                <div className="flex flex-row justify-center md:justify-start">
                  <a href="mailto:dreaminrealitycad@gmail.com" className="pr-3">
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
          <div className="mapContainer max-w-6xl py-10 md:py-0 md:px-10 xl:px-20 rounded-2xl">
            <Map address="Dream InReality, Sellindge, Ashford, UK" />
          </div>
        </div>
      </main>
    </div>
  );
};
export default ContactPage;
