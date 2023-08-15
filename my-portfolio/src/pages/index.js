import Image from "next/image";
import { Poppins } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

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
        <div className="h-screen bg-[url('/images/header-assembly-render.jpg')] p-none bg-pr-20 bg-contain bg-no-repeat bg-center lg:bg-topright lg:bg-70%">
          <div className="flex flex-col">
            <div className="px-5 lg:pb-10">
              <Image
                className="animate-fadeIn lg:pt-0 md:pt-0"
                src="/images/dream_inreality_logo_lg_logo.svg"
                height={500}
                width={500}
                alt="Dream InReality Logo - An illusion of a 3D cube overlapping with the Company name and Hook underneath"
              />
            </div>
            <div className="flex flex-col pt-none pl-5 lg:pt-10 htags animate-fadeIn">
              <p className="max-w-xl rounded-lg pt-2 md:py-5 lg:pt-20">
                We produce
              </p>
              <h1 className="font-bold py-2 md:pb-5 lg:pb-5 text-sky-400">
                3D CAD Models
              </h1>
              <p>for mass-production</p>
              <a className="lg:pt-4 md:pt-4">
                <Link
                  href="/contact"
                  className=" text-white text-2xl font-bold bg-sky-400 rounded-lg px-2 hover:bg-sky-600 lg:text-4xl md:3xl"
                >
                  Contact
                </Link>
              </a>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 lg:h-screen md:grid-cols-1 bg-[url('/images/bambrella-umbrella-hr.jpg')] bg-fixed bg-no-repeat bg-center p-40">
          <div className="flex mx-auto place-content-center bg-white rounded-2xl px-10 shadow-xl">
            <Image
              className=""
              src="/images/dir-logo-01.svg"
              height={400}
              width={400}
              alt="Dream InReality Logo - An illusion of a 3D cube overlapping"
            />
          </div>
          <div className="flex flex-col items-center justify-center text-justify max-w-xl p-4">
            <div className="bg-white rounded-2xl p-10 shadow-xl ">
              <h2 className="textlg pb-5 htags lg:text-4xl sm:text-2xl">
                3D Cad modelling Services
              </h2>
              <p className="textsm lg:text-xl pb-4">
                Welcome to Dream InReality 3D CAD modelling services. Our
                expertise lies in designing parametric 3D models that allow
                effortless modifications, saving you valuable time and
                resources. With advanced 3D CAD Design techniques, our experts
                ensure precision and adaptability, in all our 3D CAD Models.
                Each tailored to your projects unique needs.
              </p>
              <p className="textsm lg:text-xl">
                Experience fast paced timelines and cost efficiency for product
                development. From prototypes to construction drawings all the
                way to mass production. Leverage our 3D CAD modelling services
                today, to unleash the full potential of parametric modelling and
                bring your dreams into reality.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gridboxes items-center justify-center bg-gradient-to-r from-sky-200 to-sky-500 rounded-2xl background-origin-content lg:h-screen">
          <div className="p-10 py-10">
            <h2 className="phoneheadings bg-white md:text-5xl lg:text-6xl text-center p-5 rounded-2xl shadow-xl">
              3D CAD Design Services UK
            </h2>
          </div>
          <div className="grid grid-cols-1 px-10 pb-10 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center textlg">
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
      </main>
    </div>
  );
}
