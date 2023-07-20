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
          <div className="flex">
            <div className="px-5">
              <Image
                className="animate-fadeIn"
                src="/images/dir_logo_full-01.svg"
                height={800}
                width={800}
                alt="Dream InReality Logo - An illusion of a 3D cube overlapping with the Company name and Hook underneath"
              />
            </div>
          </div>
        </div>
        <div className="h-screen grid lg:grid-cols-2 md:grid-cols-1 text-center">
          <div className="flex mx-auto items-center p-10">
            <Image
              className=""
              src="/images/dir_logo-01.svg"
              height={400}
              width={400}
              alt="Dream InReality Logo - An illusion of a 3D cube overlapping"
            />
          </div>
          <div className="text-black flex flex-col items-center justify-center text-justify max-w-xl p-10 mx-auto">
            <h1 className="textlg pb-5 htags lg:text-4xl">
              3D Cad modelling Service
            </h1>
            <p className="textsm lg:text-xl">
              At DreamIn Reality we understand the need for efficient 3D cad
              modelling in the product design process. We achieve this by
              optimising our cad modelling process for swift and seamless
              alteration. All of our models are built with the desired
              manufacture process in mind. Whether you need a rapid prototype or
              detailed construction drawings for mass-production. We are here to
              bring your Dream InReality
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
