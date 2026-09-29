import type { ComponentType } from "react"
import type { ProjectDetailItem } from "@/app/project/[projectCode]/_components/ProjectDetail"
import type { IntroContent } from "@/app/project/[projectCode]/_components/Intro";
import { InteriorItem } from "@/app/project/[projectCode]/_components/Interior";
import { SurroundingDetail } from "../_components/Surrounding";

type ProjectPage = ComponentType;

export type ProjectConfig = {
  name: string;
  type: "自地自建" | "全案委託管理" | "危老重建";
  themeClassName: string;
  introContent: IntroContent;
  surroundingDetail: SurroundingDetail | null;
  interiorItems: InteriorItem[] | null;
  projectDetail: ProjectDetailItem[];
  googleMapSrc: string;
  hero: ProjectPage;
}