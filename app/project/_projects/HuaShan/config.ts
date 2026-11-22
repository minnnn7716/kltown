import type { ProjectConfig } from "@/app/project/[projectCode]/_data/projectTypes";

import Hero from "./_components/hero/Hero";
import { projectDetail, introContent, interiorItems, surroundingDetail } from "./data";
import theme from "./theme.module.css";

export const huaShanConfig = {
  name: "華山藝邸",
  type: "全案委託管理",
  themeClassName: theme.theme,
  introContent: introContent,
  surroundingDetail: surroundingDetail,
  interiorItems: interiorItems,
  projectDetail: projectDetail,
  googleMapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7229.217632864586!2d121.52873260000001!3d25.047346200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9003efc9997%3A0xcb3624c71e5e89f1!2z6I-v5bGx6Jed6YK4!5e0!3m2!1sen!2stw!4v1784697128437!5m2!1sen!2stw",
  hero: Hero,
} satisfies ProjectConfig;