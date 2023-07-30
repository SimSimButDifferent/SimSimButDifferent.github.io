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
        <title>Dream InReality - 3D Cad Modelling Services</title>
        <meta
          name="description"
          content="Fluid Alteration - Seamless Development"
        ></meta>
      </Head>
      <main>
        <div className="h-screen bg-[url('/images/header-assembly-render.jpg')] bg-contain bg-no-repeat bg-center bg-fixed">
          <div className="flex">
            <div className="px-5">
              <Image
                className="animate-fadeIn sm: pt-10 lg:pt-0 md:pt-0"
                src="/images/dir-logo-full-01.svg"
                height={600}
                width={600}
                alt="Dream InReality Logo - An illusion of a 3D cube overlapping with the Company name and Hook underneath"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-screen ">
          <div className="headings text-center text-black pb-10">
            3D CAD Modelling Services
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 text-center textlg">
            <div className="bg-gray-400 p-4">Column 1</div>
            <div className="bg-gray-400 p-4">Column 2</div>
            <div className="bg-gray-400 p-4">Column 3</div>
            <div className="bg-gray-400 p-4">Column 4</div>
            <div className="bg-gray-400 p-4">Column 1</div>
            <div className="bg-gray-400 p-4">Column 2</div>
            <div className="bg-gray-400 p-4">Column 3</div>
            <div className="bg-gray-400 p-4">Column 4</div>
          </div>
        </div>
        <div className="h-screen grid lg:grid-cols-2 md:grid-cols-1 text-center">
          <div className="flex mx-auto items-center p-10">
            <Image
              className=""
              src="/images/dir-logo-01.svg"
              height={400}
              width={400}
              alt="Dream InReality Logo - An illusion of a 3D cube overlapping"
            />
          </div>
          <div className="text-black flex flex-col items-center justify-center text-justify max-w-xl p-10 mx-auto">
            <h1 className="textlg pb-5 htags lg:text-4xl sm:text-2xl">
              3D Cad modelling Services
            </h1>
            <ul className="textsm lg:text-xl text-center">
              <li>Parametric 3D cad modelling</li>
              <li>Fluid design flow</li>
              <li>Intuitive version control</li>
            </ul>
            <br></br>
            <p className="textsm lg:text-xl">
              Parametric 3D cad models. Highly efficient 3d cad modelling
              service. Optimised for fluid alteration and intuitive version
              control.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
