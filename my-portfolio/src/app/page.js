import HomeContent from "@/components/HomeContent";
import JsonLd, { professionalServiceSchema } from "@/components/JsonLd";

const description =
  "SolidWorks 3D CAD modelling for UK product businesses: native SLDPRT/SLDASM models, STEP and DXF exports, PDF drawing packs and photorealistic renders.";

export const metadata = {
  title: "3D CAD Modelling Services UK | SolidWorks | Dream InReality",
  description,
  openGraph: {
    title: "3D CAD Modelling Services UK | SolidWorks | Dream InReality",
    description,
    url: "/",
    siteName: "Dream InReality",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/favicon-512.png", width: 512, height: 512 }],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd schema={professionalServiceSchema({ description })} />
      <HomeContent />
    </>
  );
}
