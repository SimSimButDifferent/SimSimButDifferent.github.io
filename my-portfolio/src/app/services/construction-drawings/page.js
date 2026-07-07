import Link from "next/link";
import JsonLd, { serviceSchema, faqPageSchema } from "@/components/JsonLd";

const description =
  "Dimensioned PDF drawing packs for manufacture: tolerances, weld and finish callouts, DXF profiles and a bill of materials. For UK product businesses.";

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
    images: [{ url: "/favicon-512.png", width: 512, height: 512 }],
  },
  alternates: {
    canonical: "/services/construction-drawings",
  },
};

export default function ConstructionDrawings() {
  return (
    <main className="min-h-screen bg-white py-10">
      <JsonLd
        schema={serviceSchema({
          name: "Construction Drawings for Manufacturing",
          description,
          url: "/services/construction-drawings",
        })}
      />
      <JsonLd schema={faqPageSchema(faqs)} />

      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="phoneheadings lg:text-2xl xl:text-4xl text-center mb-8">
          Construction Drawings for Manufacturing
        </h1>

        <p className="textsm lg:text-base pb-4">
          A manufacturer works from drawings, not models. This service turns
          your CAD models into dimensioned PDF drawing packs a factory or
          workshop can quote against and build from — with tolerances, weld
          and finish callouts, and a bill of materials. It is for product
          businesses and workshops that have a design and need it on paper,
          correctly, before a production order.
        </p>

        <h2 className="htags-light pt-6 pb-3">What is delivered</h2>
        <ul className="textsm lg:text-base list-disc pl-6 space-y-2 pb-4">
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

        <h2 className="htags-light pt-6 pb-3">How it works</h2>
        <ol className="textsm lg:text-base list-decimal pl-6 space-y-2 pb-4">
          <li>
            Send your CAD files and the intended manufacturing process
            through the{" "}
            <Link href="/contact" className="text-sky-500 hover:text-sky-600">
              contact page
            </Link>
            . No model yet?{" "}
            <Link
              href="/services/reverse-engineering"
              className="text-sky-500 hover:text-sky-600"
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

        <h2 className="htags-light pt-6 pb-3">Who it is for</h2>
        <p className="textsm lg:text-base pb-4">
          Product startups placing a first production order, small
          manufacturers that need CAD support without hiring, and workshop
          businesses formalising a design that has so far lived in
          someone&apos;s head. If the design itself still needs checking against the
          process, a{" "}
          <Link
            href="/services/dfm-consultancy"
            className="text-sky-500 hover:text-sky-600"
          >
            DFM review
          </Link>{" "}
          before the drawing pack catches problems while they are still cheap
          to fix.
        </p>

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

        <div className="text-center pt-4 pb-8">
          <Link
            href="/contact"
            className="contactText button bg-sky-300 p-4 text-black font-light hover:bg-sky-500 rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            Send your model or brief
          </Link>
        </div>
      </div>
    </main>
  );
}
