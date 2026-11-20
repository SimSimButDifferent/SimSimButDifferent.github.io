// Shared JSON-LD structured data component.
// Server-component safe: no hooks, no browser APIs, works in both
// the Pages Router and App Router.

const SITE_URL = "https://dreaminreality.co.uk";

const BUSINESS = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "Dream InReality",
  url: SITE_URL,
  email: "dreaminrealitycad@gmail.com",
  telephone: "+441233234583",
  founder: {
    "@type": "Person",
    name: "Simeon Campbell",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Swan Lane, Sellindge",
    addressLocality: "Ashford",
    addressRegion: "Kent",
    addressCountry: "GB",
  },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
};

// Homepage schema: the business itself.
export function professionalServiceSchema({ description }) {
  return {
    "@context": "https://schema.org",
    ...BUSINESS,
    description,
  };
}

// Service-page schema: one per service page, linked back to the business.
export function serviceSchema({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${url}`,
    serviceType: name,
    provider: BUSINESS,
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
  };
}

// About page schema: the page, the business it describes, and its founder.
export function aboutPageSchema({ description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Dream InReality",
    description,
    url: `${SITE_URL}${url}`,
    about: { "@id": BUSINESS["@id"] },
    mainEntity: {
      "@type": "Person",
      name: "Simeon Campbell",
      jobTitle: "CAD design engineer",
      worksFor: { "@id": BUSINESS["@id"] },
      knowsAbout: [
        "SolidWorks",
        "Design for manufacture",
        "Construction drawings",
        "Reverse engineering",
        "CAD file conversion",
      ],
    },
  };
}

// Contact page schema: the page, and the business it reaches.
export function contactPageSchema({ description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Dream InReality",
    description,
    url: `${SITE_URL}${url}`,
    about: { "@id": BUSINESS["@id"] },
    // The business record itself: it is only output in full on the
    // homepage, so an @id reference alone would point at nothing here.
    mainEntity: BUSINESS,
  };
}

// FAQ schema: for pages with a FAQ section.
// faqs: [{ question, answer }]
export function faqPageSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export default function JsonLd({ schema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
