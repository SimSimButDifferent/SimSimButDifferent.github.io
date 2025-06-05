import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  useScrollAnimation,
  animationVariants,
} from "../hooks/useScrollAnimation";

const Footer = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.footer
      ref={ref}
      className="footer textsm p-5"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col lg:flex-row md:flex-row justify-center justify-evenly">
        <motion.div
          className="footersect"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Image
            src="/images/dream_inreality_logo_footer.png"
            height={400}
            width={400}
            alt="Dream InReality Logo - An illusion of a 3D cube overlapping with the Company name"
          />
        </motion.div>
        <motion.div
          className="footersect"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="font-bold pb-3">Pages</h3>
          <div>
            <ul className="text-center">
              <motion.li whileHover={{ scale: 1.05 }}>
                <Link href="/">Home</Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <Link href="/about">About</Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <Link href="/contact">Contact</Link>
              </motion.li>
              {/* Add more page links as needed */}
            </ul>
          </div>
        </motion.div>
        <motion.div
          className="footersect"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="pb-3 font-bold">Contact Info</h3>
          <div className="text-center">
            <motion.p className="py-1" whileHover={{ scale: 1.05 }}>
              <a href="mailto:dreaminrealitycad@gmail.com">
                dreaminrealitycad@gmail.com
              </a>
            </motion.p>
            <motion.p whileHover={{ scale: 1.05 }}>
              <a href="tel:+442476981341">+44 (0) 24-7698-1341</a>
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          className="footersect"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="pb-3 font-bold">Company Location:</h3>
          <div className="text-center">
            <p>Swan Lane</p>
            <p>Sellindge, Ashford</p>
            <p>Kent, United Kingdom</p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
