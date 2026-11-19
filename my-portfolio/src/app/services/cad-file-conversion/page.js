import Link from "next/link";
import JsonLd, { serviceSchema, faqPageSchema } from "@/components/JsonLd";
import ScrollScene from "@/components/ScrollScene";
import ScrollPane from "@/components/ScrollPane";
import SnapScroll from "@/components/SnapScroll";
import ProcessPath from "@/components/ProcessPath";
import { beats, label, stills } from "./sceneConfig";

const description =
  "CAD file conversion between STEP, IGES, DXF and native SolidWorks formats, checked before delivery so parts open cleanly in your supplier's software.";

// Route from design to production for the "Who it is for" figure. Clients sit
// at the stage they usually arrive at, matching the paragraph above it.
const route = [
  { name: "Design", href: "/services/solidworks-design" },
  { name: "DFM review", href: "/services/dfm-consultancy" },
  { name: "Drawings", href: "/services/construction-drawings" },
  {
    name: "File conversion",
    current: true,
    clients: ["Businesses", "Teams"],
  },
  { name: "Production" },
];

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
    <main className="page-dark snap-page min-h-screen">
      <JsonLd
        schema={serviceSchema({
          name: "CAD File Conversion Services",
          description,
          url: "/services/cad-file-conversion",
        })}
      />
      <JsonLd schema={faqPageSchema(faqs)} />
      <SnapScroll />

      <ScrollScene
        slug="cad-file-conversion"
        beats={beats}
        stills={stills}
        label={label}
      >
        <ScrollPane
          step="01 · CAD file conversion"
          still={stills[0]}
          snap={false}
        >
          <h1 className="mb-6 text-display font-light lg:text-display-lg">
            <span className="font-semibold text-accent-visual">CAD</span> File
            Conversion Services UK
          </h1>
          <p className="max-w-[70ch]">
            Conversion between native SolidWorks formats (SLDPRT/SLDASM/SLDDRW)
            and the neutral formats suppliers ask for — STEP, IGES, Parasolid
            and DXF. Every file is opened and checked before delivery, because
            a conversion that fails on your supplier&apos;s machine means
            another round of back-and-forth before anything gets cut.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn-inverse">
              Send your file list
            </Link>
          </div>
        </ScrollPane>

        <ScrollPane step="02 · The conversion" still={stills[1]}>
          <h2 className="mb-4 text-title font-light">How it works</h2>
          <ol className="max-w-[70ch] list-decimal space-y-3 pl-6 marker:text-accent-visual">
            <li>
              Send your files and the formats you need through the{" "}
              <Link href="/contact" className="link-inverse">
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
        </ScrollPane>

        <ScrollPane step="03 · The files" still={stills[2]}>
          <h2 className="mb-4 text-title font-light">What is delivered</h2>
          <ul className="max-w-[70ch] list-disc space-y-3 pl-6 marker:text-accent-visual">
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
          <ul
            aria-label="File formats delivered"
            className="mt-6 flex flex-wrap gap-2"
          >
            <li className="chip">STEP</li>
            <li className="chip">IGES</li>
            <li className="chip">DXF</li>
          </ul>
          <p className="mt-6 max-w-[70ch] text-muted-inverse first-letter:uppercase">
            opened and inspected before delivery
          </p>
        </ScrollPane>
      </ScrollScene>

      <section className="snap-frame mx-auto flex max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-screen">
        <div className="panel text-center">
          <h2 className="mb-4 text-title font-light">Who it is for</h2>
          <p className="mx-auto max-w-[70ch]">
            Businesses whose supplier needs a format their CAD system cannot
            produce, teams consolidating legacy files into a current format,
            and anyone who has been sent geometry they cannot open. If what you
            actually need is an editable parametric model rather than converted
            geometry,{" "}
            <Link href="/services/solidworks-design" className="link-inverse">
              SolidWorks design
            </Link>{" "}
            or{" "}
            <Link href="/services/reverse-engineering" className="link-inverse">
              reverse engineering
            </Link>{" "}
            is the right service.
          </p>
          <ProcessPath stages={route} caption="Where file conversion sits" />
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
            Send your file list
          </Link>
        </div>
      </section>
    </main>
  );
}
