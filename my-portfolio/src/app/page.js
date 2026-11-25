import HeroCube from "@/components/HeroCube";
import Link from "next/link";
import JsonLd, { professionalServiceSchema } from "@/components/JsonLd";
import SnapScroll from "@/components/SnapScroll";
import DesignFlow from "@/components/DesignFlow";
import IntroFigure from "@/components/IntroFigure";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { stages } from "@/data/designFlow.mjs";

const description =
  "SolidWorks 3D CAD modelling for UK product businesses: native SLDPRT/SLDASM models, STEP and DXF exports, PDF drawing packs and photorealistic renders.";

const formats = ["SLDPRT", "SLDASM", "STEP", "DXF", "PDF"];

const testimonials = [
  {
    logo: "/images/mws_logo.png",
    logoAlt: "Microworkshops website",
    logoWidth: 300,
    logoHeight: 83,
    website: "https://microworkshops.co.uk/",
    name: "Elliot @ Microworkshops",
    quotes: [
      '"After doing several smaller jobs he was then responsible for the company\'s two main CAD accounts which worked really well. This happened faster than my own progression which proved to me he is a fast learner."',
      '"Simeon has tons of good qualities but the ones I appreciate the most are his consistency, honesty and sense of decency. True team player."',
    ],
  },
  {
    logo: "/images/shade_spec.png",
    logoAlt: "Shade Specialists website",
    logoWidth: 186,
    logoHeight: 70,
    website: "https://shadespecialists.co.uk/",
    name: "Rupert @ Bambrella / ShadeSpecialists",
    quotes: [
      '"We have worked with Simeon Campbell on a number of design projects. Simeon completed any design work we sent to him quickly and to a consistently high standard."',
      '"We would certainly recommend him and would be happy to work with him again."',
    ],
  },
];

export const metadata = {
  title: "3D CAD Modelling Services UK: SLDPRT, STEP | Dream InReality",
  description,
  openGraph: {
    title: "3D CAD Modelling Services UK: SLDPRT, STEP | Dream InReality",
    description,
    url: "/",
    siteName: "Dream InReality",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/favicon-512.png",
        width: 512,
        height: 512,
        alt: "Dream InReality logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "3D CAD Modelling Services UK: SLDPRT, STEP | Dream InReality",
    description,
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

      {/* 01 · Hero: grid, glow, light sweep and dimensions around the cube.
          The render itself stays still (turning it breaks the illusion). */}
      <section className="relative min-h-screen overflow-hidden bg-navy">
        <HeroCube />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pb-[30vh] text-center sm:items-start sm:px-10 sm:pb-0 sm:text-left lg:px-16">
          <p className="eyebrow mb-2 text-sm">Dream InReality</p>
          <h1>
            <span
              className={`block ${headline} py-2 font-semibold text-accent-visual`}
            >
              3D CAD models
            </span>
            <span className={`block ${headline}`}>
              built for mass production
            </span>
          </h1>
          <div className="mt-8">
            <Link href="/contact" className="btn-inverse">
              Send your brief
            </Link>
          </div>
        </div>
      </section>

      {/* 02 · Intro */}
      <section className={`${frame} max-w-6xl`}>
        <div className="panel lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow>01 · The practice</Eyebrow>
            <h2 className="mb-6 text-display font-light lg:text-display-lg">
              <span className="font-semibold text-accent-visual">3D CAD</span>{" "}
              Modelling Services UK
            </h2>
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
          <div className="lg:col-span-5">
            <IntroFigure />
          </div>
        </div>
      </section>

      {/* 03–10 · Product development timeline */}
      <DesignFlow stages={stages} />

      {/* 11 · Services, in timeline order */}
      <section id="services" className={`${frame} max-w-7xl`}>
        <Eyebrow>03 · Services</Eyebrow>
        <h2 className="mb-8 text-title font-light">3D CAD design services</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage) => (
            <li key={stage.number}>
              <ServiceCard
                title={stage.card.title}
                description={stage.card.description}
                href={stage.href}
                icon={stage.icon}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* 12 · Testimonials */}
      <section className={`${frame} max-w-5xl`}>
        <Eyebrow>04 · References</Eyebrow>
        <h2 className="mb-8 text-title font-light">Testimonials</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
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
