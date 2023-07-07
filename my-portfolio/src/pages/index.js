import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="headings animate-fade-in fade-in">Cad Services</h1>
        <div className="flex flex-row">
          <h2 className="subheading pl-2 animate-fadeInOut">
            Industrial design
          </h2>
          <h2 className="subheading pl-2 animate-fadeInOut delay-2000">
            Rapid Prototyping
          </h2>
          <h2 className="subheading pl-2 animate-fadeInOut delay-4000">
            Design for manufacturing
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image
          className="rounded-full"
          src="/images/profile.jpg"
          height={400}
          width={400}
          alt="Picture of the author"
        />
      </div>
      <div className="text flex items-center justify-center py-40 max-w-3xl text-justify mx-auto text-center">
        <p>
          I started my design career as an trainee/ intern at Microworkshops Ltd
          for over 3 years. Initially, helping with day to day tasks, including
          some SEO for the company website, whilst learning Solidworks and the
          design process, from my tutor, mentor and friend Elliot Colley. After
          a few months I started taking the more basic iterations for single
          part design, before learning the workings of more complex assemblies.
          After 2 years I was independently working with my own basket of
          clients, before moving on to taking care of the larger clients. After
          3 and a half great years at Microworkshops, I have since been working
          on my own projects as a freelancer. I now mostly specialise in garden
          furniture design, pairing that with my plastic part design expertise,
          I create 3D models that are parametric, easy to modify and make."
        </p>
      </div>
      <div className="text flex items-center justify-center">
        <p>I'm currently working on</p>
      </div>
    </main>
  );
}
