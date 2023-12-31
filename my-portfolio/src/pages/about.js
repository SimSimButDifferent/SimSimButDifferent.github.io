import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const AboutPage = () => {
  return (
    <div>
      <Head>
        <title>Dream InReality - About</title>
        <meta
          name="description"
          content="What we are about at Dream InReality!"
        ></meta>
      </Head>
      <main>
        <h1 className="flex headings justify-center pt-10">About</h1>
        <div className="flex flex-col shadow-xl">
          <div className="flex justify-center">
            <Image
              src="/images/header-render-anaglyph.jpg"
              height={1000}
              width={1000}
              alt="Picture of the author"
            />
          </div>
          <br></br>
          <div className="textsm items-center justify-center max-w-4xl text-justify mx-auto text-center p-10 lg:text-2xl md:text-xl">
            <p>
              Welcome to Dream InReality - 3D CAD Modelling Services, where we
              specialize in providing high-quality 3D CAD design services for
              all your product design needs. Our team understands the importance
              of efficiency in the CAD design process, and that is why we have
              optimized our 3D CAD modelling process to ensure swift and
              seamless alterations.
            </p>
            <br></br>
            <p>
              When you partner with us, you can rest assured that our models are
              meticulously crafted with the manufacturing process in mind.
              Whether you require a rapid prototype, detailed construction
              drawings, or a comprehensive end-to-end product development
              service, including high-quality product renders, we have got you
              covered.
            </p>
            <br></br>
            <p>
              Bring your dreams to life with our 3D CAD modelling experts. Let
              us help you transform your dreams into reality.
            </p>
            <br></br>
            <p className="text-center pt-5">
              <Link
                class="text-white text-xl font-bold bg-sky-400 rounded-lg px-2 hover:bg-sky-600 lg:text-3xl md:2xl"
                href="./contact"
              >
                Get in touch with us today!
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default AboutPage;
