import Link from "next/link";
import Image from "next/image";
import { services } from "../data/services";

const linkClass =
  "focus-ring inline-block rounded py-1 transition-colors duration-150 hover:text-ink-inverse";
const headingClass = "pb-3 text-base font-semibold text-ink-inverse";

const Footer = () => {
  return (
    <footer className="border-t border-line bg-navy px-4 py-12 text-sm font-light leading-normal text-muted-inverse sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-5">
        <div className="flex items-start justify-center sm:justify-start">
          {/* Black-on-white wordmark: invert + screen leaves white line-art on navy. */}
          <Image
            src="/images/dream_inreality_logo_footer.png"
            height={180}
            width={600}
            alt="Dream InReality"
            className="h-auto w-48 mix-blend-screen invert"
          />
        </div>
        <div>
          <h2 className={headingClass}>Pages</h2>
          <ul>
            <li>
              <Link className={linkClass} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={linkClass} href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className={linkClass} href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className={headingClass}>Services</h2>
          <ul>
            {services.map(({ slug, title }) => (
              <li key={slug}>
                <Link className={linkClass} href={slug}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={headingClass}>Contact</h2>
          <p>
            <a className={linkClass} href="mailto:dreaminrealitycad@gmail.com">
              dreaminrealitycad@gmail.com
            </a>
          </p>
          <p>
            <a
              className={linkClass}
              href="https://wa.me/447428422450"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp +44 7428 422 450
            </a>
          </p>
          <p>
            <a className={linkClass} href="tel:+441233234583">
              +44 (0)1233 234583
            </a>
          </p>
          <p>
            <a
              className={linkClass}
              href="https://www.linkedin.com/in/simeon-campbell-cad/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </p>
        </div>
        <div>
          <h2 className={headingClass}>Location</h2>
          <p>Swan Lane</p>
          <p>Sellindge, Ashford</p>
          <p>Kent, United Kingdom</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
