import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const AboutPage = () => {
  return (
    <div className="text-black">
      <Head>
        <title>Dream InReality - About</title>
        <meta
          name="description"
          content="What we are about at Dream InReality!"
        ></meta>
      </Head>
      <!-- Google tag (gtag.js) -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-FTY7N2QF09"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-FTY7N2QF09');
      </script>
      <main>
        <h1 className="flex headings justify-center pt-10">About</h1>
        <div className="flex h-screen flex-col">
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
              specialize in providing high-quality 3D CAD modelling services for
              all your product design needs. Our team understands the importance
              of efficiency in the design process, and that is why we have
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
              us help you transform your ideas into reality.
            </p>
            <br></br>
            <p className="text-center">
              <Link class="button" href="./contact">
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
