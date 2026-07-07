import Link from "next/link";
import JsonLd, { serviceSchema, faqPageSchema } from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import ParametricFamily from "@/components/ParametricFamily";

const description =
  "SolidWorks design services for UK businesses: parametric part and assembly modelling delivered as native SLDPRT/SLDASM with STEP exports and PDF drawings.";

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
  title: "Parametric SolidWorks Design Services UK | Dream InReality",
  description,
  openGraph: {
    title: "Parametric SolidWorks Design Services UK | Dream InReality",
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
    <main className="min-h-screen bg-white py-10">
      <JsonLd
        schema={serviceSchema({
          name: "SolidWorks Design Services",
          description,
          url: "/services/solidworks-design",
        })}
      />
      <JsonLd schema={faqPageSchema(faqs)} />

      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="phoneheadings lg:text-2xl xl:text-4xl text-center mb-8">
          SolidWorks Design Services UK
        </h1>

        <p className="textsm lg:text-base pb-4">
          Parametric part and assembly modelling in SolidWorks, delivered as
          native SLDPRT/SLDASM files with STEP exports. From a sketch, sample
          or brief, you get a model built for change: dimensions that edit
          cleanly, features that rebuild predictably, and assemblies that
          check fit and clearance between components before anything is made.
        </p>

        <ScrollReveal variant="scale">
          <div className="bg-sky-300 p-4 rounded-2xl shadow-xl my-6">
            <div className="bg-white rounded-2xl shadow-xl p-4">
              <ParametricFamily />
              <p className="textsm text-center pb-2">
                One driving dimension, a family of parts — a parametric model
                absorbs change instead of forcing a redraw.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeInUp">
          <h2 className="htags-light pt-6 pb-3">What is delivered</h2>
          <ul className="textsm lg:text-base list-disc pl-6 space-y-2 pb-4">
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
                className="text-sky-400 hover:text-sky-600"
              >
                construction drawing pack
              </Link>{" "}
              when production is the goal.
            </li>
          </ul>
        </ScrollReveal>

        <ScrollReveal variant="fadeInUp">
          <h2 className="htags-light pt-6 pb-3">How it works</h2>
          <ol className="textsm lg:text-base list-decimal pl-6 space-y-2 pb-4">
            <li>
              Send your sketch, sample, photographs or brief through the{" "}
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
              Key dimensions and functional requirements are confirmed with
              you before modelling starts; questions are raised as they arise.
            </li>
            <li>
              You review the model — as images or a STEP file you can open —
              and agreed changes are made before final delivery.
            </li>
          </ol>
        </ScrollReveal>

        <ScrollReveal variant="fadeInUp">
          <h2 className="htags-light pt-6 pb-3">Who it is for</h2>
          <p className="textsm lg:text-base pb-4">
            Inventors with an idea on paper, product startups without in-house
            CAD, and small manufacturers that need overflow design capacity
            without a hire. If the design is heading for tooling, a{" "}
            <Link
              href="/services/dfm-consultancy"
              className="text-sky-400 hover:text-sky-600"
            >
              DFM review
            </Link>{" "}
            checks it against the manufacturing process; if you need images
            for marketing before production,{" "}
            <Link
              href="/services/photorealistic-rendering"
              className="text-sky-400 hover:text-sky-600"
            >
              photorealistic rendering
            </Link>{" "}
            works directly from the model.
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
