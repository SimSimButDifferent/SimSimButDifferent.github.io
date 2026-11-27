import Link from "next/link";
import JsonLd, { serviceSchema, faqPageSchema } from "@/components/JsonLd";
import ScrollScene from "@/components/ScrollScene";
import ScrollPane from "@/components/ScrollPane";
import SnapScroll from "@/components/SnapScroll";
import ProcessPath from "@/components/ProcessPath";
import { beats, label, stills } from "./sceneConfig";

const description =
  "Dimensioned PDF drawing packs for manufacture: tolerances, weld and finish callouts, DXF profiles and a bill of materials. For UK product businesses.";

// Route from design to production for the "Who it is for" figure. Clients sit
// at the stage they usually arrive at, matching the paragraph above it.
const route = [
  { name: "Design", href: "/services/solidworks-design" },
  { name: "Prototype" },
  { name: "DFM review", href: "/services/dfm-consultancy" },
  {
    name: "Drawings",
    current: true,
    clients: ["Startups", "Manufacturers", "Workshops"],
  },
  { name: "Production" },
];

const faqs = [
  {
    question: "What do you need to produce a drawing pack?",
    answer:
      "A CAD model (native SolidWorks or STEP) and a note of the manufacturing process and any critical dimensions or fits. If you only have a physical part, reverse engineering can produce the model first.",
  },
  {
    question: "How are tolerances decided?",
    answer:
      "Critical fits and functional dimensions are agreed with you; the rest carry general tolerances appropriate to the process. Nothing is toleranced tighter than the function requires, because tighter tolerances cost money at the machine.",
  },
  {
    question: "What happens when the design changes?",
    answer:
      "Drawings are produced from the parametric model, so a design revision updates the drawing views rather than requiring a redraw. Revision handling is agreed in the quote.",
  },
  {
    question: "What formats are delivered?",
    answer:
      "PDF for the drawing pack, DXF for flat profiles, and the native SLDDRW drawing files with the SLDPRT/SLDASM models they reference, so any SolidWorks user can maintain them.",
  },
];

export const metadata = {
  title: "Construction Drawings for Manufacturing | Dream InReality",
  description,
  openGraph: {
    title: "Construction Drawings for Manufacturing | Dream InReality",
    description,
    url: "/services/construction-drawings",
    siteName: "Dream InReality",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dream InReality impossible-cube logo, rendered",
      },
    ],
  },
  alternates: {
    canonical: "/services/construction-drawings",
  },
};

export default function ConstructionDrawings() {
  return (
    <main className="page-dark snap-page min-h-screen">
      <JsonLd
        schema={serviceSchema({
          name: "Construction Drawings for Manufacturing",
          description,
          url: "/services/construction-drawings",
        })}
      />
      <JsonLd schema={faqPageSchema(faqs)} />
      <SnapScroll />

      <ScrollScene
        slug="construction-drawings"
        beats={beats}
        stills={stills}
        label={label}
      >
        <ScrollPane
          step="01 · Construction drawings"
          still={stills[0]}
          snap={false}
        >
          <h1 className="mb-6 text-display font-light lg:text-display-lg">
            Construction{" "}
            <span className="font-semibold text-accent-visual">Drawings</span>{" "}
            for Manufacturing
          </h1>
          <p className="max-w-[70ch]">
            A manufacturer works from drawings, not models. This service
            turns your CAD models into dimensioned PDF drawing packs a
            factory or workshop can quote against and build from — with
            tolerances, weld and finish callouts, and a bill of materials.
            It is for product businesses and workshops that have a design
            and need it on paper, correctly, before a production order.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn-inverse">
              Send your model or brief
            </Link>
          </div>
        </ScrollPane>

        <ScrollPane step="02 · The sheet" still={stills[1]}>
          <h2 className="mb-4 text-title font-light">How it works</h2>
          <ol className="max-w-[70ch] list-decimal space-y-3 pl-6 marker:text-accent-visual">
            <li>
              Send your CAD files and the intended manufacturing process through
              the{" "}
              <Link href="/contact" className="link-inverse">
                contact page
              </Link>
              . No model yet?{" "}
              <Link
                href="/services/reverse-engineering"
                className="link-inverse"
              >
                Reverse engineering
              </Link>{" "}
              can rebuild one from the physical part.
            </li>
            <li>You receive a quote and an agreed delivery date.</li>
            <li>
              Critical dimensions, fits and finishes are agreed with you before
              the views are drawn.
            </li>
            <li>
              You receive the PDF pack, DXF profiles and native files, with a
              revision if your manufacturer&apos;s feedback requires one —
              agreed in the quote.
            </li>
          </ol>
        </ScrollPane>

        <ScrollPane step="03 · The files" still={stills[2]}>
          <h2 className="mb-4 text-title font-light">What is delivered</h2>
          <ul className="max-w-[70ch] list-disc space-y-3 pl-6 marker:text-accent-visual">
            <li>
              A dimensioned and toleranced PDF drawing pack: part drawings,
              assembly drawings with balloons, and a bill of materials.
            </li>
            <li>
              DXF profiles for sheet-metal, laser-cut and CNC-routed parts,
              taken directly from the model geometry.
            </li>
            <li>
              Native SLDDRW drawing files with the SLDPRT/SLDASM models they
              reference, so the pack stays maintainable in SolidWorks.
            </li>
          </ul>
          <ul
            aria-label="File formats delivered"
            className="mt-6 flex flex-wrap gap-2"
          >
            <li className="chip">PDF pack</li>
            <li className="chip">DXF</li>
            <li className="chip">SLDDRW</li>
          </ul>
          <p className="mt-6 max-w-[70ch] text-muted-inverse">
            Drawn in SolidWorks
          </p>
        </ScrollPane>
      </ScrollScene>

      <section className="snap-frame mx-auto flex max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-screen">
        <div className="panel text-center">
          <h2 className="mb-4 text-title font-light">Who it is for</h2>
          <p className="mx-auto max-w-[70ch]">
            Product startups placing a first production order, small
            manufacturers that need CAD support without hiring, and workshop
            businesses formalising a design that has so far lived in
            someone&apos;s head. If the design itself still needs checking
            against the process, a{" "}
            <Link href="/services/dfm-consultancy" className="link-inverse">
              DFM review
            </Link>{" "}
            before the drawing pack catches problems while they are still cheap
            to fix.
          </p>
          <ProcessPath stages={route} caption="Where construction drawings sit" />
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
            Send your model or brief
          </Link>
        </div>
      </section>
    </main>
  );
}
