import { Hero } from "./_components/hero/Hero";
import { Intro } from "@/app/project/_projects/HuaShan/_components/Intro";
import { Surrounding } from "@/app/project/_projects/HuaShan/_components/Surrounding";
import { Interior } from "@/app/project/_projects/HuaShan/_components/Interior";

export default async function Page() {
  return (
    <>
      <Hero />

      <main className="noiseBackground bg-linear-to-b from-brand-200 to-brand-100">
        <Intro />
        <Surrounding />
        <Interior />
      </main>
    </>
  );
}