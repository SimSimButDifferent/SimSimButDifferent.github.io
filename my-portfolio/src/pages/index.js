import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div className="flex items-center justify-center h-screen bg-[./public/images/bambrella-umbrella.jpg]">
        <h1 className="text-4xl font-bold p-10">
          Simeon Campbell - CAD Design
        </h1>
      </div>
      <Image
        className="rounded-full"
        src="/images/profile.jpg"
        height={400}
        width={400}
        alt="Picture of the author"
      />
      <p>
        I'm a software engineer and a student at the University of Waterloo.
      </p>
      <p>I'm currently working on </p>
    </main>
  );
}
