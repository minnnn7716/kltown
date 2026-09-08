import type { Metadata } from "next";
import type { ReactNode } from "react";

import { projectRegistry, isProjectCode } from "./_data/projectRegistry";
import FloatingNavigation from "@/app/project/[projectCode]/_components/FloatingNavigation";
import ProjectDetail from "@/app/project/[projectCode]/_components/ProjectDetail";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/Footer";

import "@/styles/globals.css";
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
  children,
}: ProjectLayoutProps) {
  const { projectCode } = await params;

  if (!isProjectCode(projectCode)) {
    notFound();
  }

  const project = projectRegistry[projectCode];

  return (
    <div className={project.themeClassName}>
      <FloatingNavigation />

      {/* 用於顯示 FloatingNavigation 的茅點 */}
      <div
        data-nav-trigger
        className="absolute top-[50svh] h-px w-px pointer-events-none"
        aria-hidden="true"
      />

      <div className="noiseBackground bg-brand-secondary-100">
        {children}

        <ProjectDetail projectDetails={project.projectDetail} />
        <Contact projectCode={projectCode} />
      </div>
      <Footer />
    </div>
  );
}