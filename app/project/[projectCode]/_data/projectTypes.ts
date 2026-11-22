import type { ComponentType, ReactNode } from "react"

type ProjectPage = ComponentType;

export type ImageListItem = {
  imagePath: string;
  description: string;
}

export type ProjectDetailItem = {
  label: string;
  value: string;
  fullWidth?: boolean;
}

export type IntroContent = {
  title: string;
  content: ReactNode;
  images: ImageListItem[];
}

export type SurroundingDetail = {
  title: string;
  subTitle: string;
  locationHighlights: {
    distance: string;
    name: string;
    description: string;
  }[];
  aerialImage: string;
  aerialHighlightsImage: string;
}

export type InteriorItem = {
  title: string;
  buttonName: string | null;
  area: string | null;
  details: Record<string, string> | null;
  images: ImageListItem[];
}

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