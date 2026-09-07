import { Hero } from "./_components/hero/Hero";
import { ProjectDetail } from "@/components/ProjectDetail";
import { Contact } from "@/components/contact/Contact";

import { projectDetails } from "./_data";


export default async function Page() {

  return (
    <div className="noiseBackground bg-brand-secondary-100">
      <header>
        <Hero />
      </header>

      <main className="noiseBackground bg-brand-secondary-100">
        <ProjectDetail projectDetails={projectDetails} />
        <Contact />
      </main>
    </div>
  );
}