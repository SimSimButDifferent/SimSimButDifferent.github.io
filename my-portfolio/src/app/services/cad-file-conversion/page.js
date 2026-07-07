import Link from "next/link";
import JsonLd, { serviceSchema, faqPageSchema } from "@/components/JsonLd";

const description =
  "CAD file conversion between STEP, IGES, DXF and native SolidWorks formats, checked before delivery so parts open cleanly in your supplier's software.";

const faqs = [
  {
    question: "Which formats do you convert between?",
    answer:
      "Native SolidWorks (SLDPRT/SLDASM/SLDDRW), STEP, IGES, Parasolid and DXF for flat geometry. If your supplier needs something else, ask — most requests are workable.",
  },
  {
    question: "Does a converted file keep its feature history?",
    answer:
      "No — that is a limit of the formats, not the service. Neutral formats such as STEP and IGES carry geometry only. If you need an editable parametric model from neutral geometry, that is a rebuild: see the SolidWorks design service.",
  },
  {
    question: "How do I know the conversion is good?",
    answer:
      "Every converted file is opened and inspected before delivery — checked for missing faces, broken surfaces and scale errors, not just batch-exported and sent.",
  },
  {
    question: "Can you handle a batch of files?",
    answer:
      "Yes. Send the file list with formats needed and you get a quote for the batch.",
  },
];

export const metadata = {
  title: "CAD File Conversion Services UK: STEP, DXF | Dream InReality",
  description,
  openGraph: {
    title: "CAD File Conversion Services UK: STEP, DXF | Dream InReality",
    description,
    url: "/services/cad-file-conversion",
    siteName: "Dream InReality",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/favicon-512.png", width: 512, height: 512 }],
  },
  alternates: {
    canonical: "/services/cad-file-conversion",
  },
};

export default function CadFileConversion() {
  return (
    <main className="min-h-screen bg-white py-10">
      <JsonLd
        schema={serviceSchema({
          name: "CAD File Conversion Services",
          description,
          url: "/services/cad-file-conversion",
        })}
      />
      <JsonLd schema={faqPageSchema(faqs)} />

      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="phoneheadings lg:text-2xl xl:text-4xl text-center mb-8">
          CAD File Conversion Services UK
        </h1>

        <p className="textsm lg:text-base pb-4">
          Conversion between native SolidWorks formats (SLDPRT/SLDASM/SLDDRW)
          and the neutral formats suppliers ask for — STEP, IGES, Parasolid
          and DXF. Every file is opened and checked before delivery, because
          a conversion that fails on your supplier&apos;s machine means
          another round of back-and-forth before anything gets cut.
        </p>

        <h2 className="htags-light pt-6 pb-3">What is delivered</h2>
        <ul className="textsm lg:text-base list-disc pl-6 space-y-2 pb-4">
          <li>
            Converted files in the formats your suppliers and partners need:
            STEP, IGES, Parasolid, DXF or native SolidWorks.
          </li>
          <li>
            DXF flat patterns and profiles from sheet-metal parts, ready for
            laser or plasma cutting.
          </li>
          <li>
            A note of anything found and fixed during checking — missing
            faces, broken surfaces, wrong units — so you know the state of
            what was sent.
          </li>
        </ul>

        <h2 className="htags-light pt-6 pb-3">How it works</h2>
        <ol className="textsm lg:text-base list-decimal pl-6 space-y-2 pb-4">
          <li>
            Send your files and the formats you need through the{" "}
            <Link href="/contact" className="text-sky-500 hover:text-sky-600">
              contact page
            </Link>
            .
          </li>
          <li>You receive a quote — for one file or a batch.</li>
          <li>
            Files are converted, then opened and inspected for geometry
            errors before anything is sent back.
          </li>
          <li>You receive the checked files with the inspection note.</li>
        </ol>

        <h2 className="htags-light pt-6 pb-3">Who it is for</h2>
        <p className="textsm lg:text-base pb-4">
          Businesses whose supplier needs a format their CAD system cannot
          produce, teams consolidating legacy files into a current format,
          and anyone who has been sent geometry they cannot open. If what you
          actually need is an editable parametric model rather than converted
          geometry,{" "}
          <Link
            href="/services/solidworks-design"
            className="text-sky-500 hover:text-sky-600"
          >
            SolidWorks design
          </Link>{" "}
          or{" "}
          <Link
            href="/services/reverse-engineering"
            className="text-sky-500 hover:text-sky-600"
          >
            reverse engineering
          </Link>{" "}
          is the right service.
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
            Send your file list
          </Link>
        </div>
      </div>
    </main>
  );
}
