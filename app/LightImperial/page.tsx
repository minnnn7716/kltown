import { LandingInfoProvider } from "@/components/provider/LandingInfoProvider";
import { Hero } from "./_components/hero/Hero";
import { ProjectDetail } from "@/components/ProjectDetail";
import { Contact } from "@/components/contact/Contact";

import { projectDetails } from "./_data";
import themes from "./_styles/theme.module.css";

export default async function Page() {
  return (
    <LandingInfoProvider themeClassName={themes.theme} projectCode="LightImperial">
      <div className={themes.theme}>
        <header>
          <Hero />
        </header>

        <main className="noiseBackground bg-linear-to-b from-gray-200 to-gray-100">
          <ProjectDetail projectDetails={projectDetails} />
          <Contact />
        </main>
      </div>
    </LandingInfoProvider>
  );
}