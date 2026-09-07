import { LandingInfoProvider } from "@/components/provider/LandingInfoProvider";
import { Hero } from "./_components/hero/Hero";
import { Intro } from "@/app/HuaShan/_components/Intro";
import { Surrounding } from "@/app/HuaShan/_components/Surrounding";
import { Interior } from "@/app/HuaShan/_components/Interior";
import { ProjectDetail } from "@/components/ProjectDetail";
import { Contact } from "@/components/contact/Contact";

import { withBasePath } from "@/lib/withBasePath";
import { projectDetails } from "./_data";
import themes from "./_styles/theme.module.css";

export default async function Page() {
  return (
    <LandingInfoProvider themeClassName={themes.theme} projectCode="HuaShan">
      <div
        className={themes.theme}
        style={
          {
            "--hero-underline-url": `url("${withBasePath("/images/HuaShan/hero/handwriting_underline.svg")}")`,
          } as React.CSSProperties
        }
      >
        <header>
          <Hero />
        </header>

        <main className="noiseBackground bg-linear-to-b from-brand-200 to-brand-100">
          <Intro />
          <Surrounding />
          <ProjectDetail projectDetails={projectDetails} />
          <Interior />
          <Contact />
        </main>
      </div>
    </LandingInfoProvider>
  );
}