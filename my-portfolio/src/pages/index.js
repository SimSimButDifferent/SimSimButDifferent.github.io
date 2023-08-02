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
          content="3D CAD Modelling Services in the UK"
        ></meta>
      </Head>
      <main>
        <div className="h-screen bg-[url('/images/header-assembly-render.jpg')] bg-contain bg-no-repeat bg-center">
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
        <div className="flex flex-col items-center justify-center md:h-screen lg:h-screen">
          <h1 className="phoneheadings md:text-5xl lg:text-6xl text-center pb-20">
            3D CAD Modelling Services
          </h1>
          <div className="grid grid-cols-1 px-10 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center textlg">
            <div className="gridboxes">
              <div className="flex justify-center">
                <Image
                  className="icons"
                  src="/images/dir-logo-01.svg"
                  height={80}
                  width={80}
                  alt="3d model icon in white"
                />
              </div>
              <h3 className="text-xl">Parametric 3D Models</h3>
              <p className="textsm p-2 text-justify text-xl">
                Parametric 3D CAD modelling techniques to create 3D models that
                allow easy alterations, saving time in the design process.
              </p>
            </div>
            <div className="gridboxes">
              <div className="flex justify-center">
                <Image
                  className="icons"
                  src="/images/dir-logo-01.svg"
                  height={80}
                  width={80}
                  alt="3d model icon in white"
                />
              </div>
              <h3 className="text-xl">Rapid Prototyping</h3>
              <p className="textsm p-2 text-justify text-xl">
                Develop and build functional prototypes to test and validate
                your product design concepts, through 3D printing.
              </p>
            </div>
            <div className="gridboxes">
              <div className="flex justify-center">
                <Image
                  className="icons"
                  src="/images/dir-logo-01.svg"
                  height={80}
                  width={80}
                  alt="3d model icon in white"
                />
              </div>
              <h3 className="text-xl">Photo Realistic Rendering</h3>
              <p className="textsm p-2 text-justify text-xl">
                Generate stunning, life-like visualizations of your product
                using advanced rendering techniques.
              </p>
            </div>
            <div className="gridboxes">
              <div className="flex justify-center">
                <Image
                  className="icons"
                  src="/images/dir-logo-01.svg"
                  height={80}
                  width={80}
                  alt="3d model icon in white"
                />
              </div>
              <h3 className="text-xl">Construction Drawings</h3>
              <p className="textsm p-2 text-justify text-xl">
                Prepare detailed and accurate construction drawings to provide
                the information needed to produce at scale.
              </p>
            </div>
            <div className="gridboxes">
              <div className="flex justify-center">
                <Image
                  className="icons"
                  src="/images/dir-logo-01.svg"
                  height={80}
                  width={80}
                  alt="3d model icon in white"
                />
              </div>
              <h3 className="text-xl">Assembly Modelling</h3>
              <p className="textsm p-2 text-justify text-xl">
                Construct complex assembly models by integrating multiple
                components into a single 3D model, ensuring proper fit and
                functionality.
              </p>
            </div>
            <div className="gridboxes">
              <div className="flex justify-center">
                <Image
                  className="icons"
                  src="/images/dir-logo-01.svg"
                  height={80}
                  width={80}
                  alt="3d model icon in white"
                />
              </div>
              <h3 className="text-xl">Reverse Engineering</h3>
              <p className="textsm p-2 text-justify text-xl">
                Create 3D models from existing physical objects or scanned data.
                Reverse engineering is valuable for reproducing parts with
                complex geometries.
              </p>
            </div>
            <div className="gridboxes">
              <div className="flex justify-center">
                <Image
                  className="icons"
                  src="/images/dir-logo-01.svg"
                  height={80}
                  width={80}
                  alt="3d model icon in white"
                />
              </div>
              <h3 className="text-xl">CAD File Conversion</h3>
              <p className="textsm p-2 text-justify text-xl">
                Convert CAD files between formats to ensure compatibility with
                different software. Streamlining collaboration and exchange with
                suppliers, and partners.
              </p>
            </div>
            <div className="gridboxes">
              <div className="flex justify-center">
                <Image
                  className="icons"
                  src="/images/dir-logo-01.svg"
                  height={80}
                  width={80}
                  alt="3d model icon in white"
                />
              </div>
              <h3 className="text-xl">Design Optimization</h3>
              <p className="textsm p-2 text-justify text-xl">
                Analyze and refine existing designs to enhance performance,
                reduce material usage, or optimize manufacturing processes.
              </p>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 lg:h-screen md:grid-cols-1 text-center">
          <div className="flex mx-auto items-center p-10">
            <Image
              className=""
              src="/images/dir-logo-01.svg"
              height={400}
              width={400}
              alt="Dream InReality Logo - An illusion of a 3D cube overlapping"
            />
          </div>
          <div className="flex flex-col items-center justify-center text-justify max-w-xl p-10 mx-auto">
            <h2 className="textlg pb-5 htags lg:text-4xl sm:text-2xl">
              3D Cad modelling Services
            </h2>
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
