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
        <div className="h-screen bg-[url('/images/header-assembly-render.jpg')] p-none bg-pr-20 bg-contain bg-no-repeat bg-center sm:bg-bottomright lg:bg-topright lg:bg-70%">
          <div className="flex flex-col">
            <div className="px-5 lg:pb-10">
              <Image
                className="animate-fadeIn lg:pt-0 md:pt-0"
                src="/images/dream_inreality_logo_lg_logo.svg"
                height={500}
                width={500}
                alt="Dream InReality Logo - An illusion of a 3D cube overlapping with the Company name on the right."
              />
            </div>
            <div className="flex flex-col pt-none pl-5 sm:pt-10 lg:pt-10 htags animate-fadeIn">
              <p className="max-w-xl rounded-lg pt-2 lg:pt-20">We produce</p>
              <h1 className="font-bold py-2 text-sky-400">3D CAD Models</h1>
              <p>for mass-production</p>
              <div className="lg:pt-5">
                <Link
                  href="/contact"
                  className="text-white text-2xl font-bold bg-sky-400 rounded-lg px-2 hover:bg-sky-600 lg:text-4xl md:3xl"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 lg:h-screen xl:h-screen 2xl:h-screen md:grid-cols-1 bg-[url('/images/bambrella-umbrella-hr.jpg')] bg-fixed bg-no-repeat bg-center p-4 lg:py-10 xl:py-15 2xl:py-20">
          <div className="flex mx-auto place-content-center bg-slate-100 bg-opacity-95 rounded-2xl shadow-xl p-10">
            <Image
              className=""
              src="/images/dir-logo-01.svg"
              height={350}
              width={350}
              alt="Dream InReality Logo - An illusion of a 3D cube overlapping"
            />
          </div>
          <div className="flex flex-col items-center justify-center text-justify max-w-xl p-4">
            <div className="bg-slate-100 bg-opacity-95 rounded-2xl p-10 shadow-xl ">
              <h2 className="pb-5 htags">3D Cad modelling Services UK</h2>
              <p className="textsm lg:text-xl  pb-4">
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
        <div className="flex flex-col items-center shadow-xl justify-center background-origin-content bg-[url('/images/bambrella-umbrella-hr.jpg')] bg-fixed bg-no-repeat bg-center">
          <div className="p-10 py-10">
            <h2 className="phoneheadings bg-white md:text-2xl lg:text-4xl xl:5xl text-center p-5 rounded-2xl shadow-xl">
              Our 3D CAD Design Services
            </h2>
          </div>
          <div className="grid grid-cols-1 px-10 pb-10 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
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
              <h3 className="text-xl lg:text-md 2xl:text-2xl">
                Parametric 3D Models
              </h3>
              <p className="textboxes p-2 text-justify xl:text-sm 2xl:text-xl">
                Parametric 3D CAD modelling techniques to create 3D models that
                allow easy alterations, saving time in the design process.
              </p>
            </div>
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
              <p className="textboxes p-2 text-justify text-xl">
                Develop and build functional prototypes to test and validate
                your product design concepts, through 3D printing.
              </p>
            </div>
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
              <p className="textboxes p-2 text-justify text-xl">
                Generate stunning, life-like visualizations of your product
                using advanced rendering techniques.
              </p>
            </div>
            <div className="gridboxes">
              <div className="flex justify-center">
                <Image
                  className="icons"
                  src="/images/drawings_icon.svg"
                  height={80}
                  width={80}
                  alt="Camera shutter icon"
                />
              </div>
              <h3 className="text-xl">Construction Drawings</h3>
              <p className="textboxes p-2 text-justify text-xl">
                Prepare detailed and accurate construction drawings to provide
                the information needed to produce at scale.
              </p>
            </div>
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
              <p className="textboxes p-2 text-justify text-xl">
                Construct complex assembly models by integrating multiple
                components into a single 3D model, ensuring proper fit and
                functionality.
              </p>
            </div>
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
              <p className="textboxes p-2 text-justify text-xl">
                Create 3D models from existing physical objects or scanned data.
                Reverse engineering is valuable for reproducing parts with
                complex geometries.
              </p>
            </div>
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
              <p className="textboxes p-2 text-justify text-xl">
                Convert CAD files between formats to ensure compatibility with
                different software. Streamlining collaboration and exchange with
                suppliers, and partners.
              </p>
            </div>
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
              <p className="textboxes p-2 text-justify text-xl">
                Analyze and refine existing designs to enhance performance,
                reduce material usage, or optimize manufacturing processes.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-col shadow-xl justify-center items-center px-4 py-10">
          <div className="bg-gray-300 rounded-2xl p-10 shadow-xl">
            <div className="pb-10">
              <h3 className="phoneheadings bg-white md:text-3xl lg:text-4xl text-center p-5 rounded-2xl shadow-xl">
                Testemonials
              </h3>
            </div>
            <div className="flex flex-col justify-between bg-slate-200 rounded-2xl shadow-xl">
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
                    <div className="textsm italic bg-slate-200 rounded-2xl shadow-xl">
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
                    <div className="textsm italic bg-slate-200 rounded-2xl shadow-xl">
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
