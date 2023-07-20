import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="text-black">
      <h1 className="flex headings justify-center">About</h1>
      <div className="flex h-screen flex-col">
        <div className="flex justify-center">
          <Image
            className="rounded-full"
            src="/images/profile.jpg"
            height={400}
            width={400}
            alt="Picture of the author"
          />
        </div>
        <br></br>
        <div className="text-black textsml items-center justify-center max-w-xl text-justify mx-auto text-center">
          <p>
            My name is Simeon Campbell. I started my design career as an
            trainee/ intern at Microworkshops Ltd for over 3 years. Initially,
            helping with day to day tasks, including some SEO for the company
            website, whilst learning Solidworks and the design process, from my
            tutor, mentor and friend Elliot Colley. After a few months I started
            taking the more basic iterations for single part design, before
            learning the workings of more complex assemblies. After 2 years I
            was independently working with my own basket of clients, before
            moving on to taking care of the larger clients. After 3 and a half
            great years at Microworkshops, After working on my own projects as a
            freelancer. I have now made the move to start my own company Dream
            InReality. We specialise in building assemblies optimised for fluid
            alterations. Aiming for the most efficient design changes possible.
            Allowing you to achieve maximum creativity.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
