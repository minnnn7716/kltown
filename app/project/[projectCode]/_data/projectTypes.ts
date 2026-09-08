import type { ComponentType } from "react"
import type { ProjectDetailItem } from "@/app/project/[projectCode]/_components/ProjectDetail"

type ProjectPage = ComponentType;

export type ProjectConfig = {
  name: string;
  themeClassName: string;
  googleMapSrc: string;
  projectDetail: ProjectDetailItem[];
  page: ProjectPage | null;
}