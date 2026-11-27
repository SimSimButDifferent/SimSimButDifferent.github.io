import Image from "next/image";

// One client testimonial, led by a pull quote: one of the client's own
// sentences, verbatim, set large under a cyan quote mark, with the rest of
// the reference below it. Logo (linked to the client's site) sits on a light
// plate beside the name, because the logos are dark artwork on transparent PNGs.
export default function TestimonialCard({
  logo,
  logoAlt,
  logoWidth,
  logoHeight,
  website,
  name,
  pull,
  quotes,
}) {
  return (
    <figure className="flex flex-col gap-5 rounded-r-lg border border-l-2 border-line border-l-accent-visual bg-surface p-6 lg:p-8">
      <blockquote className="space-y-4">
        <span
          aria-hidden="true"
          className="block h-8 font-serif text-7xl leading-none text-accent-visual"
        >
          &ldquo;
        </span>
        <p className="text-title-sm font-semibold leading-snug">{pull}</p>
        {quotes.map((quote) => (
          <p key={quote} className="text-sm text-muted-inverse">
            {quote}
          </p>
        ))}
      </blockquote>
      <figcaption className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
        <span className="text-sm font-semibold">{name}</span>
        <a
          href={website}
          className="focus-ring inline-block shrink-0 rounded bg-ink-inverse px-2 py-1.5"
        >
          <Image
            src={logo}
            alt={logoAlt}
            width={logoWidth}
            height={logoHeight}
            className="h-7 w-auto"
          />
        </a>
      </figcaption>
    </figure>
  );
}
