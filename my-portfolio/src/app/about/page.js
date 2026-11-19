import Link from "next/link";
import JsonLd, { aboutPageSchema } from "@/components/JsonLd";
import ScrollScene from "@/components/ScrollScene";
import ScrollPane from "@/components/ScrollPane";
import SnapScroll from "@/components/SnapScroll";
import { beats, label, stills } from "./sceneConfig";

const description =
  "Simeon Campbell's SolidWorks CAD consultancy in Kent: DFM, 3D models and drawing packs for UK product businesses, with supplier liaison in Thailand and Vietnam.";

const services = [
  { name: "DFM consultancy", href: "/services/dfm-consultancy" },
  { name: "SolidWorks design", href: "/services/solidworks-design" },
  { name: "Construction drawings", href: "/services/construction-drawings" },
  { name: "Reverse engineering", href: "/services/reverse-engineering" },
  { name: "CAD file conversion", href: "/services/cad-file-conversion" },
  {
    name: "Photorealistic rendering",
    href: "/services/photorealistic-rendering",
  },
];

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

const frame =
  "snap-frame mx-auto flex max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-screen";

export default function About() {
  return (
    <main className="page-dark snap-page min-h-screen">
      <JsonLd schema={aboutPageSchema({ description, url: "/about" })} />
      <SnapScroll />

      <ScrollScene
        slug="about-reel"
        beats={beats}
        stills={stills}
        label={label}
      >
        <ScrollPane step="01 · About" still={stills[0]} snap={false}>
          <h1 className="mb-6 text-display font-light lg:text-display-lg">
            About{" "}
            <span className="font-semibold text-accent-visual">
              Dream InReality
            </span>
          </h1>
          <p className="max-w-[70ch]">
            Dream InReality is the SolidWorks CAD practice of Simeon
            Campbell. It takes a product from a sketch, sample or existing
            model to files a factory can quote against: native SLDPRT/SLDASM
            models, STEP and DXF exports, PDF drawing packs and
            photorealistic renders. Clients are UK product businesses, from
            inventors with a first prototype to manufacturers taking on a
            client&apos;s design.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn-inverse">
              Send your brief
            </Link>
          </div>
        </ScrollPane>
      </ScrollScene>

      <section className={frame}>
        <div className="panel">
          <Eyebrow>02 · Background</Eyebrow>
          <h2 className="mb-4 text-title font-light">Background</h2>
          <div className="max-w-[70ch] space-y-4">
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
      </section>

      <section className={frame}>
        <div className="panel">
          <Eyebrow>03 · The work</Eyebrow>
          <h2 className="mb-4 text-title font-light">Services</h2>
          <ul className="max-w-[70ch] list-disc space-y-3 pl-6 marker:text-accent-visual">
            {services.map(({ name, href }) => (
              <li key={href}>
                <Link href={href} className="link-inverse">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
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
        </div>
      </section>

      <section className={frame}>
        <div className="panel">
          <Eyebrow>04 · Suppliers abroad</Eyebrow>
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
        <div className="pt-12 text-center">
          <Link href="/contact" className="btn-inverse">
            Send your brief
          </Link>
        </div>
      </section>
    </main>
  );
}
