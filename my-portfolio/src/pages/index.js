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
        <meta name="description" content="3D CAD Modelling Services UK"></meta>
      </Head>
      <main>
        <div className="h-screen bg-[url('/images/header-assembly-blue.png')] bg-contain bg-no-repeat bg-origin-content pb-20 bg-bottom-25 sm:bg-right sm:bg-70% lg:bg-right-bottom lg:bg-70% xl:bg-80%">
          <div className="flex flex-col">
            <div className="px-5 pt-10 lg:pb-10">
              <Image
                className="animate-fadeIn lg:pt-0 md:pt-0"
                src="/images/dream_inreality_logo_lg_logo.svg"
                height={500}
                width={500}
                alt="Dream InReality Logo - An illusion of a 3D cube overlapping with the Company name on the right."
              />
            </div>
            <div className="flex flex-col pt-none pl-5 htags animate-fadeIn">
              <p className="headertext max-w-xl rounded-lg pt-2 pt-10 md:pt-20">
                We produce
              </p>
              <h1 className="headertext font-bold py-2 text-sky-400">
                3D CAD Models
              </h1>
              <p className="headertext">for mass-production</p>
              <div className="lg:pt-5">
                <Link
                  href="/contact"
                  className="headertext text-white font-bold bg-sky-400 rounded-lg px-2 hover:bg-sky-600"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 bg-[url('/images/bambrella-umbrella-hr.jpg')] bg-fixed bg-no-repeat bg-center p-4 lg:py-10 xl:py-15 2xl:py-20">
          <div className="flex mx-auto outerBox place-content-center bg-white rounded-2xl shadow-xl p-10">
            <Image
              className="bg-white rounded-xl"
              src="/images/dir-logo-01.svg"
              height={350}
              width={350}
              alt="Dream InReality Logo - An illusion of a 3D cube overlapping"
            />
          </div>
          <div className="flex justify-center items-center text-justify lg:max-w-xl p-4">
            <div className="outerBox">
                <div className="bg-white rounded-2xl p-4 shadow-xl ">
                <h2 className="pb-5 htags">3D Cad modelling Services UK</h2>
                <div className="bg-sky-200 p-4 rounded-2xl shadow-xl">
                  <p className="textsm lg:text-xl  pb-4">
                    Welcome to Dream InReality 3D CAD modelling services. We help
                    people create consumer products by creating 3D models
                    that are parametric, easy to modify and make.
                  </p>
                  <p className="textsm lg:text-xl  pb-4"> Whether electronic or
                    mechanical, we can take you through the product development
                    process, with our 3D CAD modelling services.</p>
                  <p className="textsm lg:text-xl">
                    Our 3D CAD modelling services begin with your idea, through the
                    prototyping and testing, with 3D printing. Then finalise
                    designs, outputting construction drawings and bill of materials
                    for manufacturers. We can also output photorealistic renders to
                    bring your product to life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center shadow-xl justify-center background-origin-content bg-[url('/images/bambrella-umbrella-hr.jpg')] bg-fixed bg-no-repeat bg-center">
          <div className="p-10 py-10 outerBox">
            <h2 className="phoneheadings bg-white md:text-2xl lg:text-4xl xl:5xl text-center p-5 rounded-2xl shadow-xl">
              Our 3D CAD Design Services
            </h2>
          </div>
          <div className="grid grid-cols-1 px-10 pt-4 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            <div className="outerBox">
              <div className="gridboxes">
                <div className="flex justify-center">
                  <Image
                    className="icons"
                    src="/images/parametric_icon.svg"
                    height={80}
                    width={80}
                    alt="A square with a small square on each corner, with a capital A in the middle, in black"
                  />
                </div>
                <h3 className="text-xl">
                  Parametric 3D Models
                </h3>
                <p className="textboxes">
                  Parametric 3D CAD modelling techniques to create 3D models that
                  allow easy alterations, saving time in the design process.
                </p>
              </div>
            </div>
            <div className="outerBox">
              <div className="gridboxes">
                <div className="flex justify-center">
                  <Image
                    className="icons"
                    src="/images/prototyping_icon.svg"
                    height={80}
                    width={80}
                    alt="3d model icon in black"
                  />
                </div>
                <h3 className="text-xl">Rapid Prototyping</h3>
                <p className="textboxes">
                  Develop and build functional prototypes to test and validate
                  your product design concepts, through 3D printing.
                </p>
              </div>
            </div>
            <div className="outerBox">
              <div className="gridboxes">
                <div className="flex justify-center">
                  <Image
                    className="icons"
                    src="/images/render_icon.svg"
                    height={80}
                    width={80}
                    alt="Camera shutter icon"
                  />
                </div>
                <h3 className="text-xl">Photo Realistic Rendering</h3>
                <p className="textboxes">
                  Generate stunning, life-like visualizations of your product
                  using advanced rendering techniques.
                </p>
              </div>
            </div>
            <div className="outerBox">
              <div className="gridboxes">
                <div className="flex justify-center background-white">
                  <Image
                    className="icons"
                    src="/images/drawings_icon.svg"
                    height={80}
                    width={80}
                    alt="A factory icon"
                  />
                </div>
                <h3 className="text-xl">Construction Drawings</h3>
                <p className="textboxes">
                  Prepare detailed and accurate construction drawings to provide
                  the information needed to produce at scale.
                </p>
              </div>
            </div>
            <div className="outerBox">
              <div className="gridboxes">
                <div className="flex justify-center pt-2 pb-4">
                  <Image
                    className="icons"
                    src="/images/assembly_icon.svg"
                    height={60}
                    width={60}
                    alt="two rings interlinking in black"
                  />
                </div>
                <h3 className="text-xl">Assembly Modelling</h3>
                <p className="textboxes">
                  Construct complex assembly models by integrating multiple
                  components into a single 3D model, ensuring proper fit and
                  functionality.
                </p>
              </div>
            </div>
            <div className="outerBox">
              <div className="gridboxes">
                <div className="flex justify-center">
                  <Image
                    className="icons"
                    src="/images/reverse_engineering_icon.svg"
                    height={80}
                    width={80}
                    alt="3d model icon in black"
                  />
                </div>
                <h3 className="text-xl">Reverse Engineering</h3>
                <p className="textboxes">
                  Create 3D models from existing physical objects or scanned data.
                  Reverse engineering is valuable for reproducing parts with
                  complex geometries.
                </p>
              </div>
            </div>
            <div className="outerBox">
              <div className="gridboxes">
                <div className="flex justify-center">
                  <Image
                    className="icons"
                    src="/images/file_conversion.svg"
                    height={80}
                    width={80}
                    alt="folder icon with an arrow in black"
                  />
                </div>
                <h3 className="text-xl">CAD File Conversion</h3>
                <p className="textboxes">
                  Convert CAD files between formats to ensure compatibility with
                  different software. Streamlining collaboration and exchange with
                  suppliers, and partners.
                </p>
              </div>
            </div>
            <div className="outerBox">
              <div className="gridboxes">
                <div className="flex justify-center">
                  <Image
                    className="icons"
                    src="/images/design_optimization.svg"
                    height={80}
                    width={80}
                    alt="Upwards arrow in black"
                  />
                </div>
                <h3 className="text-xl">Design Optimization</h3>
                <p className="textboxes">
                  Analyze and refine existing designs to enhance performance,
                  reduce material usage, or optimize manufacturing processes.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-col shadow-xl justify-center items-center px-4 py-10">
          <div className="bg-sky-100 rounded-2xl p-10 shadow-xl">
            <div className="pb-10">
              <h3 className="phoneheadings bg-white md:text-3xl lg:text-4xl text-center p-5 rounded-2xl shadow-xl">
                Testemonials
              </h3>
            </div>
            <div className="flex flex-col justify-between bg-sky-300 rounded-2xl shadow-xl">
              <div className="flex">
                <div className="p-5">
                  <div className="bg-white p-5 rounded-2xl shadow-xl">
                    <div className="flex justify-start pl-10">
                      <Image
                        className="icons rounded-full"
                        src="/images/mws_logo.png"
                        height={200}
                        width={200}
                        alt="Microworkshops 3D printing ninja's logo. A cartoon ninja next to the company name in 3d text."
                      />
                    </div>
                    <h4 className="flex textlg rounded-2xl p-5">
                      Elliot @ Microworkshops
                    </h4>
                    <div className="textsm italic bg-sky-200 rounded-2xl shadow-xl">
                      <p className="p-4">
                        {
                          '"After doing several smaller jobs he was then responsible for the company\'s two main CAD accounts which worked really well. This happened faster than my own progression which proved to me he is a fast learner."'
                        }
                      </p>
                      <p className="p-4">
                        {
                          '"Simeon has tons of good qualities but the ones I appreciate the most are his consistency, honesty and sense of decency. True team player."'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="p-5">
                  <div className="bg-white p-5 rounded-2xl shadow-xl">
                    <div className="flex justify-end pr-20">
                      <Image
                        className="icons rounded-full"
                        src="/images/shade_spec.png"
                        height={150}
                        width={150}
                        alt="Shade Specialists Logo"
                      />
                    </div>
                    <h4 className="flex textlg justify-end rounded-2xl p-5">
                      Rupert @ Bambrella / ShadeSpecialists
                    </h4>
                    <div className="textsm italic bg-sky-200 rounded-2xl shadow-xl">
                      <p className="p-4">
                        {
                          '"We have worked with Simeon Campbell on a number of design projects. Simeon completed any design work we sent to him quickly and to a consistently high standard."'
                        }
                      </p>
                      <p className="p-4">
                        {
                          '"We would certainly recommend him and would be happy to work with him again."'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
