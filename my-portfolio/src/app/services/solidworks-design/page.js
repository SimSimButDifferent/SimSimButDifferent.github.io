import Link from "next/link";
import JsonLd, { serviceSchema, faqPageSchema } from "@/components/JsonLd";
import ScrollScene from "@/components/ScrollScene";
import ScrollPane from "@/components/ScrollPane";
import SnapScroll from "@/components/SnapScroll";
import ProcessPath from "@/components/ProcessPath";
import { beats, label, stills } from "./sceneConfig";

const description =
  "SolidWorks CAD services for UK businesses: parametric part and assembly modelling delivered as native SLDPRT/SLDASM with STEP exports and PDF drawings.";

// Route from design to production for the "Who it is for" figure. Clients sit
// at the stage they usually arrive at, matching the paragraph above it.
const route = [
  {
    name: "Design",
    current: true,
    clients: ["Inventors", "Startups", "Manufacturers"],
  },
  { name: "Prototype" },
  { name: "DFM review", href: "/services/dfm-consultancy" },
  { name: "Drawings", href: "/services/construction-drawings" },
  { name: "Production" },
];

const faqs = [
  {
    question: "Can you work from sketches or photographs?",
    answer:
      "Yes. Hand sketches, photographs, existing samples or a written brief are all workable starting points. Dimensions that matter are confirmed with you before modelling starts.",
  },
  {
    question: "Do I need SolidWorks to use the files?",
    answer:
      "No. Every delivery includes STEP exports that open in any mainstream CAD system. The native SLDPRT/SLDASM files are included so a SolidWorks user can carry on the parametric work.",
  },
  {
    question: "What does parametric actually mean for me?",
    answer:
      "Dimensions and features are defined so they can be changed without rebuilding the model — a 400 mm version of a 300 mm part is an edit, not a redraw. Assemblies update to match.",
  },
  {
    question: "Who owns the design files?",
    answer:
      "You do — native files, exports and drawings, with no licence conditions.",
  },
];

export const metadata = {
  title: "SolidWorks CAD Services UK: SLDPRT, SLDASM | Dream InReality",
  description,
  openGraph: {
    title: "SolidWorks CAD Services UK: SLDPRT, SLDASM | Dream InReality",
    description,
    url: "/services/solidworks-design",
    siteName: "Dream InReality",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/favicon-512.png", width: 512, height: 512 }],
  },
  alternates: {
    canonical: "/services/solidworks-design",
  },
};

export default function SolidworksDesign() {
  return (
    <main className="page-dark snap-page min-h-screen">
      <JsonLd
        schema={serviceSchema({
          name: "SolidWorks CAD Services",
          description,
          url: "/services/solidworks-design",
        })}
      />
      <JsonLd schema={faqPageSchema(faqs)} />
      <SnapScroll />

      <ScrollScene
        slug="solidworks-design"
        beats={beats}
        stills={stills}
        label={label}
      >
        <ScrollPane
          step="01 · SolidWorks design"
          still={stills[0]}
          snap={false}
        >
          <h1 className="mb-6 text-display font-light lg:text-display-lg">
            <span className="font-semibold text-accent-visual">SolidWorks</span>{" "}
            CAD Services UK
          </h1>
          <p className="max-w-[70ch]">
            Parametric part and assembly modelling in SolidWorks, delivered as
            native SLDPRT/SLDASM files with STEP exports. From a sketch, sample
            or brief, you get a model built for change: dimensions that edit
            cleanly, features that rebuild predictably, and assemblies that
            check fit and clearance between components before anything is made.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn-inverse">
              Send your brief
            </Link>
          </div>
        </ScrollPane>

        <ScrollPane step="02 · The model" still={stills[1]}>
          <h2 className="mb-4 text-title font-light">How it works</h2>
          <ol className="max-w-[70ch] list-decimal space-y-3 pl-6 marker:text-accent-visual">
            <li>
              Send your sketch, sample, photographs or brief through the{" "}
              <Link href="/contact" className="link-inverse">
                contact page
              </Link>
              .
            </li>
            <li>You receive a quote and an agreed delivery date.</li>
            <li>
              Key dimensions and functional requirements are confirmed with
              you before modelling starts; questions are raised as they arise.
            </li>
            <li>
              You review the model — as images or a STEP file you can open —
              and agreed changes are made before final delivery.
            </li>
          </ol>
        </ScrollPane>

        <ScrollPane step="03 · The files" still={stills[2]}>
          <h2 className="mb-4 text-title font-light">What is delivered</h2>
          <ul className="max-w-[70ch] list-disc space-y-3 pl-6 marker:text-accent-visual">
            <li>
              Native SLDPRT part files and SLDASM assemblies, modelled
              parametrically with named features and sensible design intent.
            </li>
            <li>
              STEP exports for every part and assembly, so the geometry opens
              in any CAD system your suppliers use.
            </li>
            <li>
              Dimensioned PDF drawings where the work needs them — or a full{" "}
              <Link
                href="/services/construction-drawings"
                className="link-inverse"
              >
                construction drawing pack
              </Link>{" "}
              when production is the goal.
            </li>
          </ul>
          <ul
            aria-label="File formats delivered"
            className="mt-6 flex flex-wrap gap-2"
          >
            <li className="chip">SLDPRT</li>
            <li className="chip">SLDASM</li>
            <li className="chip">STEP</li>
          </ul>
          <p className="mt-6 max-w-[70ch] text-muted-inverse">
            One driving dimension, a family of parts — a parametric model
            absorbs change instead of forcing a redraw.
          </p>
        </ScrollPane>
      </ScrollScene>

      <section className="snap-frame mx-auto flex max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-screen">
        <div className="panel text-center">
          <h2 className="mb-4 text-title font-light">Who it is for</h2>
          <p className="mx-auto max-w-[70ch]">
            Inventors with an idea on paper, product startups without in-house
            CAD, and small manufacturers that need overflow design capacity
            without a hire. If the design is heading for tooling, a{" "}
            <Link href="/services/dfm-consultancy" className="link-inverse">
              DFM review
            </Link>{" "}
            checks it against the manufacturing process; if you need images
            for marketing before production,{" "}
            <Link
              href="/services/photorealistic-rendering"
              className="link-inverse"
            >
              photorealistic rendering
            </Link>{" "}
            works directly from the model.
          </p>
          <ProcessPath stages={route} caption="Where SolidWorks design sits" />
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
                <p className="mx-auto max-w-[70ch] text-muted-inverse">{answer}</p>
              </div>
            ))}
          </div>
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
