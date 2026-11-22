import { notFound } from "next/navigation";
import { isProjectCode, orderedProjectCodes } from "./_data/projectRegistry"

export const dynamicParams = false;

export function generateStaticParams() {
  return orderedProjectCodes.map((projectCode) => ({
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

  return <></>
}