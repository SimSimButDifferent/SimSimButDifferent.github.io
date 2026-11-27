import Link from "next/link";
import ContactScene from "@/components/ContactScene";
import GoogleMap from "@/components/Map";
import JsonLd, { contactPageSchema } from "@/components/JsonLd";

const description =
  "Contact Dream InReality about SolidWorks models, DFM reviews and PDF drawing packs for manufacture. Phone or email; based in Sellindge, Ashford, Kent.";

export const metadata = {
  title: "Contact Dream InReality | 3D CAD Design Enquiries, Kent UK",
  description,
  openGraph: {
    title: "Contact Dream InReality | 3D CAD Design Enquiries, Kent UK",
    description,
    url: "/contact",
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
    canonical: "/contact",
  },
};

const PHONE = { href: "tel:+441233234583", label: "+44 (0)1233 234583" };
const WHATSAPP = {
  href: "https://wa.me/447428422450",
  label: "+44 7428 422 450",
};
const EMAIL = "dreaminrealitycad@gmail.com";
const ADDRESS = "Swan Lane, Sellindge, Ashford, Kent";

const detailLink =
  "link-inverse inline-flex min-h-[44px] items-center rounded-sm [overflow-wrap:anywhere]";

export default function Contact() {
  return (
    <main className="page-dark min-h-screen pb-16">
      <JsonLd schema={contactPageSchema({ description, url: "/contact" })} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl pt-4 lg:pt-6">
          <ContactScene />
        </div>

        <div className="mt-8 lg:mt-10 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-8">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">
              <span className="text-accent-visual">Sellindge, Kent</span>
            </p>
            <h1 className="mb-6 text-display font-light lg:text-display-lg">
              Contact{" "}
              <span className="font-semibold text-accent-visual sm:whitespace-nowrap">
                Dream InReality
              </span>
            </h1>
            <p className="max-w-[70ch]">
              Send a sketch, photos of a sample or an existing model, and say
              what you need back:{" "}
              <Link href="/services/solidworks-design" className="link-inverse">
                native SLDPRT/SLDASM models
              </Link>
              ,{" "}
              <Link href="/services/dfm-consultancy" className="link-inverse">
                a DFM review
              </Link>
              ,{" "}
              <Link
                href="/services/cad-file-conversion"
                className="link-inverse"
              >
                STEP or DXF exports
              </Link>
              , or{" "}
              <Link
                href="/services/construction-drawings"
                className="link-inverse"
              >
                a PDF drawing pack
              </Link>{" "}
              for manufacture.
            </p>

            <address className="not-italic">
              <dl className="mt-8 space-y-4">
                <div>
                  <dt className="eyebrow">WhatsApp</dt>
                  <dd>
                    <a
                      href={WHATSAPP.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={detailLink}
                    >
                      {WHATSAPP.label}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Email</dt>
                  <dd>
                    <a href={`mailto:${EMAIL}`} className={detailLink}>
                      {EMAIL}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Phone</dt>
                  <dd>
                    <a href={PHONE.href} className={detailLink}>
                      {PHONE.label}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Address</dt>
                  <dd className="mt-1">{ADDRESS}</dd>
                </div>
              </dl>
            </address>

            <div className="mt-8">
              <a href={`mailto:${EMAIL}`} className="btn-inverse">
                Email your brief
              </a>
            </div>
          </div>

          <div className="mt-12 lg:col-span-5 lg:mt-0">
            <GoogleMap address={`Dream InReality, ${ADDRESS}`} />
          </div>
        </div>
      </div>
    </main>
  );
}
