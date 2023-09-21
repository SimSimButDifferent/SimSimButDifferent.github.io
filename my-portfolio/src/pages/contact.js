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
        <div className="flex flex-col bg-white p-10 md:flex-row pb-10 lg:shadow-xl md:shadow-xl justify-around">
          <div className="flex flex-col bg-slate-200 rounded-2xl shadow-xl text-center pb-10 px-4 lg:px-10 xl:px-20">
            <h1 className="flex headings justify-center">Contact</h1>
            <div className="bg-white rounded-2xl shadow-xl p-4">
              <p className="contactText md:htags lg:htags pb-5 text-left">
                If you would like to discuss a project of yours
              </p>
              <p className="contactText md:htags lg:htags pb-5 text-left">Get in touch today!</p>
              <div className="flex flex-row justify-center md:justify-start hover">
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
                  className="contactText md:htags lg:htags text-sky-400 pl-3"
                >
                  +44 (0)24 7698 1341
                </a>
              </div>
              <p className="contactText md:htags lg:htags py-5 text-left">
                Or just drop us a message at
              </p>
              <div className="flex flex-row justify-center md:justify-start">
                <a
                  href="mailto:dreaminrealitycad@gmail.com"
                  className="pr-3 pt-1"
                >
                  <Image
                    src="/images/mail_sky_400.svg"
                    height={30}
                    width={30}
                    alt="Call icon of a phone from google icons"
                  ></Image>
                </a>
                <Link
                  href="mailto:dreaminrealitycad@gmail.com"
                  className="contactText md:htags lg:htags text-sky-400"
                >
                  dreaminrealitycad@gmail.com
                </Link>
              </div>
            </div>
          </div>
          <div className="mapContainer py-10 md:py-0 md:px-10 xl:px-20 rounded-2xl">
            <Map address="Dream InReality, Sellindge, Ashford, UK" />
          </div>
        </div>
      </main>
    </div>
  );
};
export default ContactPage;
