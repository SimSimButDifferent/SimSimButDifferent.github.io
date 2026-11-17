import Link from "next/link";
import JsonLd, { serviceSchema, faqPageSchema } from "@/components/JsonLd";
import SnapScroll from "@/components/SnapScroll";
import ProcessPath from "@/components/ProcessPath";

// No scroll scene yet. The canvas and still frames wait on two assets from
// Sim: product.glb (the product model) and render.jpg (a real SolidWorks
// Visualize still of the same product). Until both exist, frames 01 to 03
// are full-height panels, and nothing stands in for the product or the render.

const description =
  "Photorealistic product renders from your CAD models: high-resolution images for listings, packaging and pitches, with material and colour variants included.";

// Route from model to market for the "Who it is for" figure. Clients sit at
// the stage this service covers, matching the paragraph above it.
const route = [
  { name: "Design", href: "/services/solidworks-design" },
  {
    name: "Rendering",
    current: true,
    clients: ["Startups", "Established businesses", "Manufacturers"],
  },
  { name: "Marketing" },
];

const faqs = [
  {
    question: "What do you need to produce renders?",
    answer:
      "A CAD model (native SolidWorks or STEP) plus reference for materials, colours and finish — photographs of similar products work well. No model yet? SolidWorks modelling can build one from your sketch or sample first.",
  },
  {
    question: "What resolution are the images?",
    answer:
      "Sized to where they will be used — web listing, print packaging or presentation slide — and agreed in the brief. Higher-resolution re-renders of an agreed scene are straightforward because the scene is kept.",
  },
  {
    question: "Can I get colour and material variants?",
    answer:
      "Yes. Once a scene is set up, variants of colour, material and finish are re-renders rather than new work, so product ranges and options are cheap to cover.",
  },
  {
    question: "Who owns the images?",
    answer:
      "You do. Use them in listings, packaging, pitches and advertising without restriction.",
  },
];

export const metadata = {
  title: "Photorealistic Product Rendering UK | Dream InReality",
  description,
  openGraph: {
    title: "Photorealistic Product Rendering UK | Dream InReality",
    description,
    url: "/services/photorealistic-rendering",
    siteName: "Dream InReality",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/favicon-512.png", width: 512, height: 512 }],
  },
  alternates: {
    canonical: "/services/photorealistic-rendering",
  },
};

export default function PhotorealisticRendering() {
  return (
    <main className="page-dark snap-page min-h-screen">
      <JsonLd
        schema={serviceSchema({
          name: "Photorealistic Product Rendering",
          description,
          url: "/services/photorealistic-rendering",
        })}
      />
      <JsonLd schema={faqPageSchema(faqs)} />
      <SnapScroll />

      <section className="mx-auto flex max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-screen">
        <div className="panel">
          <p className="eyebrow mb-4">
            <span className="text-accent-visual">
              01 · Photorealistic rendering
            </span>
          </p>
          <h1 className="mb-6 text-display font-light lg:text-display-lg">
            <span className="font-semibold text-accent-visual">
              Photorealistic
            </span>{" "}
            Product Rendering UK
          </h1>
          <p className="max-w-[70ch]">
            High-resolution product images rendered directly from your CAD
            model — before a single unit exists. Product businesses use
            them for online listings, packaging artwork, investor pitches
            and pre-launch marketing, with material and colour variants
            covered from the same scene.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn-inverse">
              Send your model and references
            </Link>
          </div>
        </div>
      </section>

      <section className="snap-frame mx-auto flex max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-screen">
        <div className="panel">
          <p className="eyebrow mb-4">
            <span className="text-accent-visual">02 · The scene</span>
          </p>
          <h2 className="mb-4 text-title font-light">How it works</h2>
          <ol className="max-w-[70ch] list-decimal space-y-3 pl-6 marker:text-accent-visual">
            <li>
              Send your CAD files and material references through the{" "}
              <Link href="/contact" className="link-inverse">
                contact page
              </Link>
              . No CAD model yet?{" "}
              <Link
                href="/services/solidworks-design"
                className="link-inverse"
              >
                SolidWorks modelling
              </Link>{" "}
              builds one first.
            </li>
            <li>You receive a quote and an agreed delivery date.</li>
            <li>
              Camera angles, materials and backgrounds are agreed from draft
              previews before final rendering time is spent.
            </li>
            <li>You receive the final image set, sized for use.</li>
          </ol>
        </div>
      </section>

      <section className="snap-frame mx-auto flex max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-screen">
        <div className="panel">
          <p className="eyebrow mb-4">
            <span className="text-accent-visual">03 · The files</span>
          </p>
          <h2 className="mb-4 text-title font-light">What is delivered</h2>
          <ul className="max-w-[70ch] list-disc space-y-3 pl-6 marker:text-accent-visual">
            <li>
              High-resolution PNG or JPEG images at the sizes your listing,
              packaging or presentation needs, from agreed camera angles.
            </li>
            <li>
              Material, colour and finish variants of the same scene,
              covering a product range without re-shooting anything.
            </li>
            <li>
              The updated SolidWorks model with appearances applied, if
              modelling adjustments were part of the work.
            </li>
          </ul>
          <ul
            aria-label="File formats delivered"
            className="mt-6 flex flex-wrap gap-2"
          >
            <li className="chip">PNG</li>
            <li className="chip">JPEG</li>
            <li className="chip">Colour variants</li>
          </ul>
        </div>
      </section>

      <section className="snap-frame mx-auto flex max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-screen">
        <div className="panel text-center">
          <h2 className="mb-4 text-title font-light">Who it is for</h2>
          <p className="mx-auto max-w-[70ch]">
            Product startups that need listing and pitch images before
            production, established businesses refreshing packaging or
            marketing for an existing range, and manufacturers who want a
            product visualised in context ahead of a trade show. Renders also
            pair with a{" "}
            <Link
              href="/services/construction-drawings"
              className="link-inverse"
            >
              construction drawing pack
            </Link>{" "}
            when a product is heading to manufacture and market at the same
            time.
          </p>
          <ProcessPath stages={route} caption="Where rendering sits" />
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
            Send your model and references
          </Link>
        </div>
      </section>
    </main>
  );
}
