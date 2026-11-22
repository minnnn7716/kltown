import type { Metadata } from "next";
import type { ReactNode } from "react";

import { projectRegistry, isProjectCode } from "./_data/projectRegistry";
import FloatingNavigation from "@/app/project/[projectCode]/_components/FloatingNavigation";
import Intro from "@/app/project/[projectCode]/_components/Intro";
import Interior from "@/app/project/[projectCode]/_components/Interior";
import Surrounding from "@/app/project/[projectCode]/_components/Surrounding";
import ProjectDetail from "@/app/project/[projectCode]/_components/ProjectDetail";
import ScrollToProjectTop from "@/app/project/[projectCode]/_components/ScrollToProjectTop";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/Footer";

import { notFound } from "next/navigation";

export async function generateMetadata({
  params
}: {
  params: Promise<{ projectCode: string }>
}): Promise<Metadata> {
  const { projectCode } = await params;

  if (!isProjectCode(projectCode)) {
    return {
      title: "共同建設"
    }
  }

  const project = projectRegistry[projectCode];

  return {
    title: `共同建設 - ${project.name}`
  }
}

type ProjectLayoutProps = Readonly<{
  params: Promise<{ projectCode: string }>;
  children: ReactNode;
}>;

export default async function ProjectLayout({
  params,
}: ProjectLayoutProps) {
  const { projectCode } = await params;

  if (!isProjectCode(projectCode)) {
    notFound();
  }

  const project = projectRegistry[projectCode];

  const { introContent, surroundingDetail, interiorItems, projectDetail } = project;
  const Hero = project.hero;

  return (
    <div className={project.themeClassName}>
      <ScrollToProjectTop projectCode={projectCode} />
      <FloatingNavigation />

      {/* 用於顯示 FloatingNavigation 的茅點 */}
      <div
        data-nav-trigger
        className="absolute top-[50svh] h-px w-px pointer-events-none"
        aria-hidden="true"
      />

      <Hero />
      
      <div className="noiseBackground bg-linear-to-b from-brand-bg-200 to-brand-bg-100">
        <Intro introContent={introContent}/>
        { surroundingDetail && <Surrounding surroundingDetail={surroundingDetail} /> }
        <ProjectDetail projectDetails={projectDetail} />
        { interiorItems && <Interior interiorItems={interiorItems} />}
        <Contact projectCode={projectCode} />
      </div>
      <Footer />
    </div>
  );
}