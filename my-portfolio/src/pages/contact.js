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
      <main>
        <h1 className="text-black flex headings justify-center px-4">
          Contact
        </h1>
        <div className="flex flex-col text-center py-10 px-4">
          <p className="textlg md:htags lg:htags pb-10">
            For all Enquiries and more information on our services<br></br>
            Get in touch today!
          </p>
          <div className="flex flex-row justify-center">
            <a href="tel:+442476981341">
              <Image
                src="/images/call_sky_400.svg"
                height={40}
                width={40}
                alt="Call icon of a phone from google icons"
              ></Image>
            </a>
            <a
              href="tel:+442476981341"
              className="textlg md:htags lg:htags text-sky-400 pl-4"
            >
              +44 (0)24 7698 1341
            </a>
          </div>
          <p className="textlg md:htags lg:htags py-10">
            Or just drop us a message at
          </p>
          <div className="flex flex-row justify-center">
            <a href="mailto:dreaminrealitycad@gmail.com" className="pr-3">
              <Image
                src="/images/mail_sky_400.svg"
                height={40}
                width={40}
                alt="Call icon of a phone from google icons"
              ></Image>
            </a>
            <Link
              href="mailto:dreaminrealitycad@gmail.com"
              className="textlg md:htags lg:htags text-sky-400"
            >
              dreaminrealitycad@gmail.com
            </Link>
          </div>
        </div>
        <div className="flex justify-center rounded px-4 pb-10 shadow-xl">
          <Map address="Dream InReality, Sellindge, Ashford, UK" />
        </div>
      </main>
    </div>
  );
};
export default ContactPage;
