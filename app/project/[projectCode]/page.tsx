import { notFound } from "next/navigation";
import { isProjectCode, projectRegistry } from "./_data/projectRegistry"

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(projectRegistry).map((projectCode) => ({
    projectCode,
  }));
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ projectCode: string }>
}) {
  const { projectCode } = await params;

  if (!isProjectCode(projectCode)) {
    notFound();
  }
  
  const ProjectPage = projectRegistry[projectCode].page

  return ProjectPage ? <ProjectPage /> : <></>
}