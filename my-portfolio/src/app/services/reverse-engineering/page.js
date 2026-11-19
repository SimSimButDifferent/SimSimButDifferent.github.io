import Link from "next/link";
import JsonLd, { serviceSchema, faqPageSchema } from "@/components/JsonLd";
import ScrollScene from "@/components/ScrollScene";
import ScrollPane from "@/components/ScrollPane";
import SnapScroll from "@/components/SnapScroll";
import ProcessPath from "@/components/ProcessPath";
import { beats, label, stills } from "./sceneConfig";

const description =
  "Reverse engineering for UK businesses: measured or scanned parts rebuilt as parametric SolidWorks models, with STEP exports and dimensioned PDF drawings.";

// Route from physical part to production for the "Who it is for" figure.
// Clients sit at the stage this service covers, matching the paragraph above
// it; the next two stages are the services a rebuilt part usually goes on to.
const route = [
  { name: "Physical part" },
  {
    name: "Reverse engineering",
    current: true,
    clients: ["Manufacturers", "Workshops", "Product businesses"],
  },
  { name: "DFM review", href: "/services/dfm-consultancy" },
  { name: "Drawings", href: "/services/construction-drawings" },
  { name: "Production" },
];

const faqs = [
  {
    question: "Do you need the physical part?",
    answer:
      "Usually one of: the part itself for measurement, your own measurements with photographs, or scan data (mesh files such as STL). Which is right depends on the part's complexity — raise it in your enquiry and it gets settled before the quote.",
  },
  {
    question: "How accurate is the rebuilt model?",
    answer:
      "Accuracy targets are agreed per feature before work starts — a bearing seat needs more care than a cosmetic surface. The model is checked against the source measurements before delivery.",
  },
  {
    question: "What if I have old drawings but no CAD?",
    answer:
      "Legacy 2D drawings are a good source. The part is rebuilt as a parametric 3D model from the drawing dimensions, and discrepancies between drawing and physical part are flagged rather than resolved silently.",
  },
  {
    question: "What is delivered at the end?",
    answer:
      "Native SLDPRT/SLDASM files, STEP exports, and dimensioned PDF drawings if you need them for remanufacture.",
  },
];

export const metadata = {
  title: "Reverse Engineering CAD Services UK | Dream InReality",
  description,
  openGraph: {
    title: "Reverse Engineering CAD Services UK | Dream InReality",
    description,
    url: "/services/reverse-engineering",
    siteName: "Dream InReality",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/favicon-512.png", width: 512, height: 512 }],
  },
  alternates: {
    canonical: "/services/reverse-engineering",
  },
};

export default function ReverseEngineering() {
  return (
    <main className="page-dark snap-page min-h-screen">
      <JsonLd
        schema={serviceSchema({
          name: "Reverse Engineering CAD Services",
          description,
          url: "/services/reverse-engineering",
        })}
      />
      <JsonLd schema={faqPageSchema(faqs)} />
      <SnapScroll />

      <ScrollScene
        slug="reverse-engineering"
        beats={beats}
        stills={stills}
        label={label}
      >
        <ScrollPane
          step="01 · Reverse engineering"
          still={stills[0]}
          snap={false}
        >
          <h1 className="mb-6 text-display font-light lg:text-display-lg">
            <span className="font-semibold text-accent-visual">
              Reverse Engineering
            </span>{" "}
            CAD Services UK
          </h1>
          <p className="max-w-[70ch]">
            A physical part rebuilt as a parametric SolidWorks model — for parts
            whose drawings are lost, suppliers who have disappeared, or legacy
            components that need remanufacturing or modifying. You send the
            part, measurements or scan data; you get back native SLDPRT/SLDASM
            files, STEP exports and drawings you own outright.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn-inverse">
              Describe your part
            </Link>
          </div>
        </ScrollPane>

        <ScrollPane step="02 · The scan" still={stills[1]}>
          <h2 className="mb-4 text-title font-light">How it works</h2>
          <ol className="max-w-[70ch] list-decimal space-y-3 pl-6 marker:text-accent-visual">
            <li>
              Describe the part and what source material you have (the part
              itself, measurements, scan data, old drawings) through the{" "}
              <Link href="/contact" className="link-inverse">
                contact page
              </Link>
              .
            </li>
            <li>You receive a quote and an agreed delivery date.</li>
            <li>
              Accuracy targets for the features that matter are agreed before
              modelling starts.
            </li>
            <li>
              The model is rebuilt parametrically, checked against the source,
              and delivered with its exports and any drawings.
            </li>
          </ol>
        </ScrollPane>

        <ScrollPane step="03 · The files" still={stills[2]}>
          <h2 className="mb-4 text-title font-light">What is delivered</h2>
          <ul className="max-w-[70ch] list-disc space-y-3 pl-6 marker:text-accent-visual">
            <li>
              Parametric SLDPRT part models (and SLDASM assemblies where
              multiple parts are involved), rebuilt with editable features
              rather than dumb solids — so the design can be modified, not just
              reproduced.
            </li>
            <li>STEP exports for any CAD system or supplier.</li>
            <li>
              Dimensioned PDF drawings for remanufacture, where the goal is
              putting the part back into production — the same output as the{" "}
              <Link
                href="/services/construction-drawings"
                className="link-inverse"
              >
                construction drawings
              </Link>{" "}
              service.
            </li>
          </ul>
          <ul
            aria-label="File formats delivered"
            className="mt-6 flex flex-wrap gap-2"
          >
            <li className="chip">SLDPRT</li>
            <li className="chip">STEP</li>
            <li className="chip">PDF drawing</li>
          </ul>
        </ScrollPane>
      </ScrollScene>

      <section className="snap-frame mx-auto flex max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-screen">
        <div className="panel text-center">
          <h2 className="mb-4 text-title font-light">Who it is for</h2>
          <p className="mx-auto max-w-[70ch]">
            Small manufacturers keeping legacy products in production, workshops
            replacing an obsolete component, and product businesses that
            inherited a design with no usable CAD. Where the rebuilt part is
            heading back to a factory, a{" "}
            <Link href="/services/dfm-consultancy" className="link-inverse">
              DFM review
            </Link>{" "}
            of the rebuilt model is a sensible next step — original parts often
            carry compromises worth removing.
          </p>
          <ProcessPath
            stages={route}
            caption="Where reverse engineering sits"
          />
        </div>
      </section>

      <section className="snap-frame mx-auto flex max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-screen">
        <div className="panel text-center">
          <h2 className="mb-6 text-title font-light">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-line">
            {faqs.map(({ question, answer }) => (
              <div key={question} className="py-6 first:pt-0 last:pb-0">
                <h3 className="mb-2 pb-0 text-title-sm font-semibold">
                  {question}
                </h3>
                <p className="mx-auto max-w-[70ch] text-muted-inverse">
                  {answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-12 text-center">
          <Link href="/contact" className="btn-inverse">
            Describe your part
          </Link>
        </div>
      </section>
    </main>
  );
}
