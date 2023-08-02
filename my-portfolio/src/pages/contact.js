import React from "react";
import Head from "next/head";
import Map from "@/components/Map";

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
        <h1 className="text-black flex headings justify-center">Contact</h1>
        <div></div>
        <div className="flex justify-center rounded px-4">
          <Map address="Dream InReality, Sellindge, Ashford, UK" />
        </div>
      </main>
    </div>
  );
};
export default ContactPage;
