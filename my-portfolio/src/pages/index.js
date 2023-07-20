import Image from "next/image";
import { Poppins } from "next/font/google";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "600", "900"],
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dream InReality</title>
        <meta
          name="description"
          content="Fluid Alteration - Seamless Development"
        ></meta>
      </Head>
      <main>
        <div className="h-screen bg-[url('/images/bambrella-umbrella-hr.jpg')] bg-cover bg-no-repeat bg-center bg-fixed">
          <div className="flex flex-row pl-5">
            <div className="flex">
              <Image
                className="animate-fadeIn"
                src="/images/dir_logo-01.svg"
                height={150}
                width={150}
                alt="Dream InReality Logo - An illusion of a 3D cube overlapping with the Company name and Hook underneath"
              />
            </div>
            <div className="flex flex-col pt-6 pl-10">
              <div>
                <h1 className="headings text-black animate-fadeIn">
                  Dream InReality
                </h1>
              </div>
              <div className="flex flex-row">
                <h2 className="subheadings text-black pl-12 animate-fadeIn transitionDelay-4000">
                  Fluid Alteration - Seamless Development
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-screen">
          <div className="flex mx-auto items-center">
            <Image
              className=""
              src="/images/dir_logo-01.svg"
              height={400}
              width={400}
              alt="Dream InReality Logo - An illusion of a 3D cube overlapping"
            />
          </div>
          <div className="text-black text flex flex-col items-center justify-center max-w-xl text-justify mx-auto text-center">
            <h2 className="sub-headings pb-5 htags">
              3D Cad modelling Service
            </h2>
            <p>
              At DreamIn Reality we understand the need for an efficient 3D cad
              modelling, in the product design process. We achieve this by
              optimising our cad modeling process for swift and seamless
              alteration.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
