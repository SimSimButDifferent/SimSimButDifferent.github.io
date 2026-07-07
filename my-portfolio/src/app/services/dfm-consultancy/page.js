import Link from "next/link";
import JsonLd, { serviceSchema, faqPageSchema } from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import DfmReviewSketch from "@/components/DfmReviewSketch";

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
    <main className="min-h-screen bg-white py-10">
      <JsonLd
        schema={serviceSchema({
          name: "DFM Consultancy",
          description,
          url: "/services/dfm-consultancy",
        })}
      />
      <JsonLd schema={faqPageSchema(faqs)} />

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pb-6">
          <div>
            <h1 className="phoneheadings lg:text-2xl xl:text-4xl text-center lg:text-left mb-8">
              DFM Consultancy UK
            </h1>
            <p className="textsm lg:text-base pb-4">
              A design for manufacture (DFM) review examines your CAD models
              and drawings against the process that will make them — injection
              moulding, CNC machining, sheet metal or 3D printing — and
              returns a written report of the changes that will reduce tooling
              cost, unit cost and scrap. It is for product businesses that
              have a design and want it checked before committing to tooling
              or a production order.
            </p>
          </div>
          <ScrollReveal variant="fadeInRight">
            <div className="bg-sky-300 p-4 rounded-2xl shadow-xl">
              <div className="bg-white rounded-2xl shadow-xl p-4">
                <DfmReviewSketch />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollReveal variant="fadeInUp">
          <h2 className="htags-light pt-6 pb-3">What is delivered</h2>
          <ul className="textsm lg:text-base list-disc pl-6 space-y-2 pb-4">
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
        </ScrollReveal>

        <ScrollReveal variant="fadeInUp">
          <h2 className="htags-light pt-6 pb-3">How it works</h2>
          <ol className="textsm lg:text-base list-decimal pl-6 space-y-2 pb-4">
            <li>
              Send your CAD files (SolidWorks or STEP), drawings and intended
              manufacturing process through the{" "}
              <Link
                href="/contact"
                className="text-sky-400 hover:text-sky-600"
              >
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
        </ScrollReveal>

        <ScrollReveal variant="fadeInUp">
          <h2 className="htags-light pt-6 pb-3">Who it is for</h2>
          <p className="textsm lg:text-base pb-4">
            Product startups preparing for a first production run, small
            manufacturers taking on a design from a client, workshop
            businesses moving a one-off into batch production, and inventors
            who have a working prototype and need it made repeatably. If the
            design work itself is still to be done,{" "}
            <Link
              href="/services/solidworks-design"
              className="text-sky-400 hover:text-sky-600"
            >
              SolidWorks design
            </Link>{" "}
            covers the modelling, and a{" "}
            <Link
              href="/services/construction-drawings"
              className="text-sky-400 hover:text-sky-600"
            >
              construction drawing pack
            </Link>{" "}
            takes the reviewed design to the factory.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fadeInUp">
          <h2 className="htags-light pt-6 pb-3">Frequently asked questions</h2>
          <div className="space-y-4 pb-8">
            {faqs.map(({ question, answer }) => (
              <div key={question}>
                <h3 className="textsm lg:text-base font-bold pb-1">
                  {question}
                </h3>
                <p className="textsm lg:text-base">{answer}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="text-center pt-4 pb-8">
          <Link
            href="/contact"
            className="contactText button bg-sky-400 px-4 py-2 text-white font-bold hover:bg-sky-600 rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            Send your brief
          </Link>
        </div>
      </div>
    </main>
  );
}
