import Link from "next/link";
import JsonLd, { serviceSchema, faqPageSchema } from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import ExplodedView from "@/components/ExplodedView";

const description =
  "Reverse engineering for UK businesses: measured or scanned parts rebuilt as parametric SolidWorks models, with STEP exports and dimensioned PDF drawings.";

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
    <main className="min-h-screen bg-white py-10">
      <JsonLd
        schema={serviceSchema({
          name: "Reverse Engineering CAD Services",
          description,
          url: "/services/reverse-engineering",
        })}
      />
      <JsonLd schema={faqPageSchema(faqs)} />

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pb-6">
          <div>
            <h1 className="phoneheadings lg:text-2xl xl:text-4xl text-center lg:text-left mb-8">
              Reverse Engineering CAD Services UK
            </h1>
            <p className="textsm lg:text-base pb-4">
              A physical part rebuilt as a parametric SolidWorks model — for
              parts whose drawings are lost, suppliers who have disappeared,
              or legacy components that need remanufacturing or modifying.
              You send the part, measurements or scan data; you get back
              native SLDPRT/SLDASM files, STEP exports and drawings you own
              outright.
            </p>
          </div>
          <ScrollReveal variant="fadeInRight">
            <div className="bg-sky-300 p-4 rounded-2xl shadow-xl">
              <div className="bg-white rounded-2xl shadow-xl p-4">
                <ExplodedView />
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
              Parametric SLDPRT part models (and SLDASM assemblies where
              multiple parts are involved), rebuilt with editable features
              rather than dumb solids — so the design can be modified, not
              just reproduced.
            </li>
            <li>STEP exports for any CAD system or supplier.</li>
            <li>
              Dimensioned PDF drawings for remanufacture, where the goal is
              putting the part back into production — the same output as the{" "}
              <Link
                href="/services/construction-drawings"
                className="text-sky-400 hover:text-sky-600"
              >
                construction drawings
              </Link>{" "}
              service.
            </li>
          </ul>
        </ScrollReveal>

        <ScrollReveal variant="fadeInUp">
          <h2 className="htags-light pt-6 pb-3">How it works</h2>
          <ol className="textsm lg:text-base list-decimal pl-6 space-y-2 pb-4">
            <li>
              Describe the part and what source material you have (the part
              itself, measurements, scan data, old drawings) through the{" "}
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
              Accuracy targets for the features that matter are agreed before
              modelling starts.
            </li>
            <li>
              The model is rebuilt parametrically, checked against the
              source, and delivered with its exports and any drawings.
            </li>
          </ol>
        </ScrollReveal>

        <ScrollReveal variant="fadeInUp">
          <h2 className="htags-light pt-6 pb-3">Who it is for</h2>
          <p className="textsm lg:text-base pb-4">
            Small manufacturers keeping legacy products in production,
            workshops replacing an obsolete component, and product businesses
            that inherited a design with no usable CAD. Where the rebuilt
            part is heading back to a factory, a{" "}
            <Link
              href="/services/dfm-consultancy"
              className="text-sky-400 hover:text-sky-600"
            >
              DFM review
            </Link>{" "}
            of the rebuilt model is a sensible next step — original parts
            often carry compromises worth removing.
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
            Describe your part
          </Link>
        </div>
      </div>
    </main>
  );
}
