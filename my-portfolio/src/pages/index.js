import Image from "next/image";
import { Poppins } from "@next/font/google";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dream InReality</title>
        <meta
          name="description"
          content="Product Development for Mass-Production"
        ></meta>
      </Head>
      <main>
        <div className="h-screen bg-[url('/images/bambrella-umbrella-hr.jpg')] bg-cover bg-no-repeat bg-center bg-fixed">
          <div className="flex flex-center">
            <h1 className="headings text-black animate-fadeIn">
              Dream InReality
            </h1>
          </div>
          <div className="flex flex-row">
            <h2 className="subheadings text-black pl-2 animate-fadeIn">
              Product Development for Mass Production
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-center pt-40">
          <Image
            className="rounded-full"
            src="/images/profile.jpg"
            height={400}
            width={400}
            alt="Picture of the author"
          />
        </div>
        <div className="text-black text flex items-center justify-center py-40 max-w-3xl text-justify mx-auto text-center">
          <p>
            I started my design career as an trainee/ intern at Microworkshops
            Ltd for over 3 years. Initially, helping with day to day tasks,
            including some SEO for the company website, whilst learning
            Solidworks and the design process, from my tutor, mentor and friend
            Elliot Colley. After a few months I started taking the more basic
            iterations for single part design, before learning the workings of
            more complex assemblies. After 2 years I was independently working
            with my own basket of clients, before moving on to taking care of
            the larger clients. After 3 and a half great years at
            Microworkshops, I have since been working on my own projects as a
            freelancer. I now mostly specialise in garden furniture design,
            pairing that with my plastic part design expertise, I create 3D
            models that are parametric, easy to modify and make.
          </p>
        </div>
        <div className="text flex items-center justify-center">
          <p>I am currently working on</p>
        </div>
      </main>
    </div>
  );
}
