import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer textsm py-5">
      <div className="flex flex-col lg:flex-row md:flex-row justify-center justify-evenly">
        <div className="footersect">
          <h3 className="font-bold pb-3">Pages</h3>
          <div>
            <ul className="text-center">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              {/* Add more page links as needed */}
            </ul>
          </div>
        </div>
        <div className="footersect">
          <h3 className="pb-3 font-bold">Contact Info</h3>
          <div className="justify-center">
            <p className="py-1">Email: info@company.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="footersect">
          <h3 className="pb-3 font-bold">Company Location:</h3>
          <div>
            <p className="py-1">Sellindge, Ashford</p>
            <p>Kent, United Kingdom</p>
          </div>
        </div>
        <div className="footersect">
          <Image
            src="/images/dream_inreality_logo_footer.png"
            height={300}
            width={300}
            alt="Dream InReality Logo - An illusion of a 3D cube overlapping with the Company name"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
