import Image from "next/image";
import Link from "next/link";
import JsonLd, { professionalServiceSchema } from "@/components/JsonLd";
import SnapScroll from "@/components/SnapScroll";

const description =
  "SolidWorks 3D CAD modelling for UK product businesses: native SLDPRT/SLDASM models, STEP and DXF exports, PDF drawing packs and photorealistic renders.";

const formats = ["SLDPRT", "SLDASM", "STEP", "DXF", "PDF"];

export const metadata = {
  title: "3D CAD Modelling Services UK | SolidWorks | Dream InReality",
  description,
  openGraph: {
    title: "3D CAD Modelling Services UK | SolidWorks | Dream InReality",
    description,
    url: "/",
    siteName: "Dream InReality",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/favicon-512.png", width: 512, height: 512 }],
  },
  alternates: {
    canonical: "/",
  },
};

function Eyebrow({ children }) {
  return (
    <p className="eyebrow mb-4">
      <span className="text-accent-visual">{children}</span>
    </p>
  );
}

// Full-height frame below the hero. Each one snaps into place from lg up.
const frame =
  "snap-frame mx-auto flex flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-screen lg:px-8";

const headline = "text-title font-light sm:text-display lg:text-display-lg";

export default function Home() {
  return (
    <main className="page-dark snap-page min-h-screen">
      <JsonLd schema={professionalServiceSchema({ description })} />
      <SnapScroll />

      {/* 01 · Hero: the cube render stays still (turning it breaks the illusion). */}
      <section className="relative min-h-screen overflow-hidden bg-navy">
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6 sm:items-center sm:justify-end sm:pb-0 sm:pr-6 lg:pr-10 xl:pr-16">
          <Image
            src="/images/3d-logo/dir-logo-3d-cutout-1200.webp"
            alt="Impossible cube — the Dream InReality logo rendered in 3D"
            width={991}
            height={1200}
            priority
            className="h-[30vh] w-auto sm:h-[42vh] lg:h-[56vh] xl:h-[64vh]"
          />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col justify-center px-5 pb-[30vh] sm:px-10 sm:pb-0 lg:px-16">
          <p className="eyebrow mb-2 text-sm">Dream InReality</p>
          <p className={headline}>We produce</p>
          <p className={`${headline} py-2 font-semibold text-accent-visual`}>
            3D CAD Models
          </p>
          <p className={headline}>for mass production</p>
          <div className="mt-8">
            <Link href="/contact" className="btn-inverse">
              Send your brief
            </Link>
          </div>
        </div>
      </section>

      {/* 02 · Intro */}
      <section className={`${frame} max-w-4xl`}>
        <div className="panel">
          <Eyebrow>01 · The practice</Eyebrow>
          <h1 className="mb-6 text-display font-light lg:text-display-lg">
            <span className="font-semibold text-accent-visual">3D CAD</span>{" "}
            Modelling Services UK
          </h1>
          <div className="max-w-[70ch] space-y-4">
            <p>
              Dream InReality builds SolidWorks 3D CAD models for UK product
              businesses and takes them through to manufacture. Each part is
              modelled parametrically, so a dimension or feature can change
              without a redraw.
            </p>
            <p>
              Projects arrive as a sketch, a physical sample or another
              designer&apos;s files. They leave as native SLDPRT and SLDASM
              models, STEP and DXF exports, a PDF drawing pack with a bill of
              materials, and photorealistic renders for listings and pitches.
            </p>
            <p>
              Clients range from inventors with a first prototype to
              manufacturers taking on a customer&apos;s design. The timeline
              below follows a product from first sketch to production and
              names the service that covers each stage.
            </p>
          </div>
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
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link href="/contact" className="btn-inverse">
              Send your brief
            </Link>
            <Link href="#timeline" className="link-inverse inline-block py-3">
              See the eight stages
            </Link>
          </div>
        </div>
      </section>

      {/* 03–10 · Product development timeline (Task 4) */}

      {/* 11 · Services, 12 · Testimonials (Task 6) */}
    </main>
  );
}
