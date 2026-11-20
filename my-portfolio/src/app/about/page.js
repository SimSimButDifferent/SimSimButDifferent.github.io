import Image from "next/image";
import Link from "next/link";
import JsonLd, { aboutPageSchema } from "@/components/JsonLd";
import ServiceReel from "@/components/ServiceReel";
import SnapScroll from "@/components/SnapScroll";
import { slides } from "./sceneConfig";

const description =
  "Simeon Campbell's SolidWorks CAD consultancy in Kent: DFM, 3D models and drawing packs for UK product businesses, with supplier liaison in Thailand and Vietnam.";

const formats = ["SLDPRT", "SLDASM", "STEP", "DXF", "PDF"];

export const metadata = {
  title: "About Dream InReality | SolidWorks 3D CAD Consultant, Kent",
  description,
  openGraph: {
    title: "About Dream InReality | SolidWorks 3D CAD Consultant, Kent",
    description,
    url: "/about",
    siteName: "Dream InReality",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/favicon-512.png", width: 512, height: 512 }],
  },
  alternates: {
    canonical: "/about",
  },
};

function Eyebrow({ children }) {
  return (
    <p className="eyebrow mb-4">
      <span className="text-accent-visual">{children}</span>
    </p>
  );
}

// Each panel's width is set so its text and photo end up the same height.
const frame =
  "snap-frame mx-auto flex flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-screen";

export default function About() {
  return (
    <main className="page-dark snap-page min-h-screen">
      <JsonLd schema={aboutPageSchema({ description, url: "/about" })} />
      <SnapScroll />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:grid lg:min-h-screen lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-8">
        <div className="lg:col-span-5">
          <Eyebrow>01 · About</Eyebrow>
          <h1 className="mb-6 text-display font-light lg:text-display-lg">
            About{" "}
            <span className="whitespace-nowrap font-semibold text-accent-visual">
              Dream InReality
            </span>
          </h1>
          <p className="max-w-[70ch]">
            Dream InReality is the SolidWorks CAD practice of Simeon
            Campbell. It takes a product from a sketch, sample or existing
            model to files a factory can quote against: native SLDPRT/SLDASM
            models, STEP and DXF exports, PDF drawing packs and{" "}
            <Link
              href="/services/photorealistic-rendering"
              className="link-inverse"
            >
              photorealistic renders
            </Link>
            . Clients are UK product businesses, from inventors with a first
            prototype to manufacturers taking on a client&apos;s design.
          </p>
          <ul
            aria-label="File formats delivered"
            className="mt-6 flex flex-wrap gap-2"
          >
            {formats.map((format) => (
              <li key={format} className="chip">
                {format}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/contact" className="btn-inverse">
              Send your brief
            </Link>
          </div>
        </div>
        <div className="mt-12 lg:col-span-7 lg:mt-0">
          <ServiceReel slides={slides} />
        </div>
      </section>

      <section className={`${frame} max-w-[62rem]`}>
        <div className="panel md:grid md:grid-cols-[15.5rem_minmax(0,1fr)] md:items-center md:gap-8">
          <Image
            src="/images/about/simeon-campbell.jpg"
            alt="Simeon Campbell"
            width={1200}
            height={1500}
            sizes="(min-width: 768px) 248px, 320px"
            className="mb-6 h-auto w-full max-w-xs rounded-lg border border-line md:mb-0"
          />
          <div>
            <Eyebrow>02 · Background</Eyebrow>
            <h2 className="mb-4 text-title font-light">
              From 3D printing to production drawings
            </h2>
            <div className="space-y-4">
              <p>
                From 2018 to 2021 Simeon was a CAD design engineer at
                Microworkshops, a 3D printing company in London. The work
                covered products from garden furniture to musical equipment:
                modelling parts that print reliably, and producing the
                construction drawings that take a design into mass production.
              </p>
              <p>
                Recent projects include a modular heavy-duty dumbbell system
                for Halo Gym and hardware visualisation for a trading desk.
                Microworkshops and Bambrella / ShadeSpecialists have both given
                testimonials, which are on the{" "}
                <Link href="/" className="link-inverse">
                  home page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${frame} max-w-4xl`}>
        <div className="panel md:grid md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <Eyebrow>03 · Suppliers abroad</Eyebrow>
            <h2 className="mb-4 text-title font-light">
              Manufacturing in Thailand and Vietnam
            </h2>
            <p className="max-w-[70ch]">
              For UK clients whose parts are made in South-East Asia, Simeon
              also handles supplier liaison in Thailand and Vietnam: sending
              drawings and technical questions to the factory, coordinating
              prototypes and samples, and reporting back on what arrives.
            </p>
          </div>
          <Image
            src="/images/about/thailand-factory-visit.jpg"
            alt="Simeon Campbell and a manufacturing contact outside a vacuum forming factory in Thailand"
            width={1260}
            height={840}
            sizes="(min-width: 768px) 400px, 100vw"
            className="mt-6 h-auto w-full rounded-lg border border-line md:mt-0"
          />
        </div>
        <div className="pt-12 text-center">
          <Link href="/contact" className="btn-inverse">
            Send your brief
          </Link>
        </div>
      </section>
    </main>
  );
}
