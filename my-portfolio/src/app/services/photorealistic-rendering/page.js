import Link from "next/link";
import JsonLd, { serviceSchema, faqPageSchema } from "@/components/JsonLd";

const description =
  "Photorealistic product renders from your CAD models: high-resolution images for listings, packaging and pitches, with material and colour variants included.";

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
    <main className="min-h-screen bg-white py-10">
      <JsonLd
        schema={serviceSchema({
          name: "Photorealistic Product Rendering",
          description,
          url: "/services/photorealistic-rendering",
        })}
      />
      <JsonLd schema={faqPageSchema(faqs)} />

      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="phoneheadings lg:text-2xl xl:text-4xl text-center mb-8">
          Photorealistic Product Rendering UK
        </h1>

        <p className="textsm lg:text-base pb-4">
          High-resolution product images rendered directly from your CAD
          model — before a single unit exists. Product businesses use them
          for online listings, packaging artwork, investor pitches and
          pre-launch marketing, with material and colour variants covered
          from the same scene.
        </p>

        <h2 className="htags-light pt-6 pb-3">What is delivered</h2>
        <ul className="textsm lg:text-base list-disc pl-6 space-y-2 pb-4">
          <li>
            High-resolution PNG or JPEG images at the sizes your listing,
            packaging or presentation needs, from agreed camera angles.
          </li>
          <li>
            Material, colour and finish variants of the same scene, covering
            a product range without re-shooting anything.
          </li>
          <li>
            The updated SolidWorks model with appearances applied, if
            modelling adjustments were part of the work.
          </li>
        </ul>

        <h2 className="htags-light pt-6 pb-3">How it works</h2>
        <ol className="textsm lg:text-base list-decimal pl-6 space-y-2 pb-4">
          <li>
            Send your CAD files and material references through the{" "}
            <Link href="/contact" className="text-sky-500 hover:text-sky-600">
              contact page
            </Link>
            . No CAD model yet?{" "}
            <Link
              href="/services/solidworks-design"
              className="text-sky-500 hover:text-sky-600"
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

        <h2 className="htags-light pt-6 pb-3">Who it is for</h2>
        <p className="textsm lg:text-base pb-4">
          Product startups that need listing and pitch images before
          production, established businesses refreshing packaging or
          marketing for an existing range, and manufacturers who want a
          product visualised in context ahead of a trade show. Renders also
          pair with a{" "}
          <Link
            href="/services/construction-drawings"
            className="text-sky-500 hover:text-sky-600"
          >
            construction drawing pack
          </Link>{" "}
          when a product is heading to manufacture and market at the same
          time.
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
            Send your model and references
          </Link>
        </div>
      </div>
    </main>
  );
}
