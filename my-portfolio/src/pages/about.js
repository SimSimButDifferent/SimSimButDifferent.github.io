import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="text-black">
      <h1 className="flex headings justify-center p-10">About</h1>
      <div className="flex h-screen flex-col">
        <div className="flex justify-center p-10">
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
            At DreamIn Reality we understand the need for efficient 3D cad
            modelling services in the product design process. We achieve this by
            optimising our 3D cad modelling process for swift and seamless
            alteration. All of our models are built with the desired manufacture
            process in mind. Whether you need a rapid prototype, detailed
            construction drawings for mass-production or an end-to-end product
            development service, including high quality product renders. We are here to bring your Dream InReality.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
