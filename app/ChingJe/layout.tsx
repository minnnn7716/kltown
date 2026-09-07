import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import { withBasePath } from "@/lib/withBasePath";
import themes from "./_styles/theme.module.css";
import { LandingInfoProvider } from "@/components/provider/LandingInfoProvider";

export const metadata: Metadata = {
  title: "共同建設 - 青喆 SOHO",
};

type ChingJeLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function ChingJeLayout({ children }: ChingJeLayoutProps) {
  return (
    <LandingInfoProvider themeClassName={themes.theme} projectCode="ChingJe">
      <div
        className={themes.theme}
        style={
          {
            "--texture-windowGrilles": `url("${withBasePath("/textures/window-grilles.png")}")`
          } as React.CSSProperties
        }
      >
        {children}
        <Footer />
      </div>
    </LandingInfoProvider>
  );
}