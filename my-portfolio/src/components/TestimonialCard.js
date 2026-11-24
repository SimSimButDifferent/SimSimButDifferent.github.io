import Image from "next/image";

// One client testimonial: logo (linked to the client's site) on a light
// plate, because the logos are dark artwork on transparent PNGs; the quotes;
// who said them.
export default function TestimonialCard({
  logo,
  logoAlt,
  logoWidth,
  logoHeight,
  website,
  name,
  quotes,
}) {
  return (
    <figure className="panel flex flex-col gap-6">
      <a
        href={website}
        className="focus-ring inline-block w-fit rounded bg-ink-inverse px-3 py-2"
      >
        <Image
          src={logo}
          alt={logoAlt}
          width={logoWidth}
          height={logoHeight}
          className="h-10 w-auto"
        />
      </a>
      <blockquote className="space-y-4">
        {quotes.map((quote) => (
          <p key={quote}>{quote}</p>
        ))}
      </blockquote>
      <figcaption className="mt-auto text-sm font-semibold">{name}</figcaption>
    </figure>
  );
}
