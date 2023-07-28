import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="text-black">
      <h1 className="flex headings justify-center pt-10">About</h1>
      <div className="flex h-screen flex-col">
        <div className="flex justify-center">
          <Image
            className=""
            src="/images/header-render-anaglyph.jpg"
            height={1000}
            width={1000}
            alt="Picture of the author"
          />
        </div>
        <br></br>
        <div className="textsm items-center justify-center max-w-4xl text-justify mx-auto text-center p-10 lg:text-2xl md:text-xl">
          <p>
            Welcome to DreamIn Reality, where we specialize in providing
            high-quality 3D CAD modeling services for all your product design
            needs. Our team understands the importance of efficiency in the
            design process, and that's why we have optimized our 3D CAD modeling
            process to ensure swift and seamless alterations. <br></br>
            <br></br>When you partner with us, you can rest assured that our
            models are meticulously crafted with the manufacturing process in
            mind. Whether you require a rapid prototype, detailed construction
            drawings, or a comprehensive end-to-end product development service,
            including high-quality product renders, we've got you covered.
            <br></br>
            <br></br> Bring your dreams to life with DreamIn Reality's expert 3D
            CAD modeling services. Let us help you transform your ideas into
            reality.
            <Link class="button text-center" href="./contact">
              Get in touch with us today!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
