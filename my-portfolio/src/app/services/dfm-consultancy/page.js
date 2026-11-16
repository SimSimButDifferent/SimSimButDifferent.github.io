import Link from "next/link";
import JsonLd, { serviceSchema, faqPageSchema } from "@/components/JsonLd";
import ScrollScene from "@/components/ScrollScene";
import ScrollPane from "@/components/ScrollPane";
import { label, stills, stops } from "./sceneConfig";

const description =
  "DFM reviews for UK product businesses: manufacturability checks on your CAD models, with a written report and revised SLDPRT/SLDASM files and PDF drawings.";

const faqs = [
  {
    question: "What do I need to send for a DFM review?",
    answer:
      "Your CAD files (native SolidWorks or STEP), any existing drawings, and a note of the intended manufacturing process, material and production volume. If some of that is undecided, say so — process selection can be part of the review.",
  },
  {
    question: "How long does a DFM review take?",
    answer:
      "It depends on part count and complexity. A delivery date is agreed with the quote before any work starts.",
  },
  {
    question: "Who owns the files afterwards?",
    answer:
      "You do. Everything delivered — the report, revised native SLDPRT/SLDASM files and drawings — is yours, with no licence conditions.",
  },
  {
    question: "Will you sign an NDA?",
    answer:
      "NDAs are routinely signed — send yours with your enquiry, before sharing any files.",
  },
  {
    question: "What if my parts were designed in other CAD software?",
    answer:
      "STEP or IGES exports work for review. Revised geometry is returned as SolidWorks files plus STEP, so your own CAD system can read the changes.",
  },
];

export const metadata = {
  title: "DFM Consultancy UK for Product Businesses | Dream InReality",
  description,
  openGraph: {
    title: "DFM Consultancy UK for Product Businesses | Dream InReality",
    description,
    url: "/services/dfm-consultancy",
    siteName: "Dream InReality",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/favicon-512.png", width: 512, height: 512 }],
  },
  alternates: {
    canonical: "/services/dfm-consultancy",
  },
};

export default function DfmConsultancy() {
  return (
    <main className="page-dark min-h-screen">
      <JsonLd
        schema={serviceSchema({
          name: "DFM Consultancy",
          description,
          url: "/services/dfm-consultancy",
        })}
      />
      <JsonLd schema={faqPageSchema(faqs)} />

      <ScrollScene
        slug="dfm-consultancy"
        stops={stops}
        stills={stills}
        label={label}
      >
        <ScrollPane step="01 · DFM consultancy" still={stills[0]}>
          <h1 className="mb-6 text-display font-light lg:text-display-lg">
            <span className="font-semibold text-accent-visual">DFM</span>{" "}
            Consultancy UK
          </h1>
          <p className="max-w-[70ch]">
            A design for manufacture (DFM) review examines your CAD models
            and drawings against the process that will make them — injection
            moulding, CNC machining, sheet metal or 3D printing — and
            returns a written report of the changes that will reduce tooling
            cost, unit cost and scrap. It is for product businesses that
            have a design and want it checked before committing to tooling
            or a production order.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn-inverse">
              Send your brief
            </Link>
          </div>
        </ScrollPane>

        <ScrollPane step="02 · The review" still={stills[1]}>
          <h2 className="mb-4 text-title font-light">How it works</h2>
          <ol className="max-w-[70ch] list-decimal space-y-3 pl-6 marker:text-accent-visual">
            <li>
              Send your CAD files (SolidWorks or STEP), drawings and intended
              manufacturing process through the{" "}
              <Link href="/contact" className="link-inverse">
                contact page
              </Link>
              .
            </li>
            <li>You receive a quote and an agreed delivery date.</li>
            <li>
              The review runs against your chosen process and volume;
              questions are raised as they arise, not saved for the end.
            </li>
            <li>
              You receive the report, revised models and updated drawings,
              with a call to walk through the findings if you want one.
            </li>
          </ol>
        </ScrollPane>

        <ScrollPane step="03 · The files" still={stills[2]}>
          <h2 className="mb-4 text-title font-light">What is delivered</h2>
          <ul className="max-w-[70ch] list-disc space-y-3 pl-6 marker:text-accent-visual">
            <li>
              A written DFM report (PDF) listing each issue found — wall
              thickness, draft angles, undercuts, tolerance stack-ups,
              fastener and assembly problems — with a recommended fix for
              each.
            </li>
            <li>
              Revised part and assembly models as native SLDPRT/SLDASM files,
              with STEP exports for other CAD systems.
            </li>
            <li>
              Updated dimensioned PDF drawings where the changes affect an
              existing drawing pack, with DXF profiles for sheet-metal or
              flat-cut parts.
            </li>
          </ul>
          <ul
            aria-label="File formats delivered"
            className="mt-6 flex flex-wrap gap-2"
          >
            <li className="chip">PDF report</li>
            <li className="chip">SLDPRT</li>
            <li className="chip">STEP</li>
          </ul>
        </ScrollPane>
      </ScrollScene>

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-16 sm:px-6 lg:py-24">
        <section className="panel">
          <h2 className="mb-4 text-title font-light">Who it is for</h2>
          <p className="max-w-[70ch]">
            Product startups preparing for a first production run, small
            manufacturers taking on a design from a client, workshop
            businesses moving a one-off into batch production, and inventors
            who have a working prototype and need it made repeatably. If the
            design work itself is still to be done,{" "}
            <Link href="/services/solidworks-design" className="link-inverse">
              SolidWorks design
            </Link>{" "}
            covers the modelling, and a{" "}
            <Link
              href="/services/construction-drawings"
              className="link-inverse"
            >
              construction drawing pack
            </Link>{" "}
            takes the reviewed design to the factory.
          </p>
        </section>

        <section className="panel">
          <h2 className="mb-6 text-title font-light">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-line">
            {faqs.map(({ question, answer }) => (
              <div key={question} className="py-6 first:pt-0 last:pb-0">
                <h3 className="mb-2 pb-0 text-title-sm font-semibold">
                  {question}
                </h3>
                <p className="max-w-[70ch] text-muted-inverse">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-8 text-center">
          <Link href="/contact" className="btn-inverse">
            Send your brief
          </Link>
        </div>
      </div>
    </main>
  );
}
