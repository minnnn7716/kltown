import type { ProjectConfig } from "@/app/project/[projectCode]/_data/projectTypes";

import Page from "./page";
import projectDetail from "./data";
import theme from "./theme.module.css";

export const duenNanConfig = {
  name: "敦南 SOHO",
  themeClassName: theme.theme,
  googleMapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7396622133388!2d121.54879470901842!3d25.042907577718044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abc455bc3715%3A0xb36c873989d963ac!2z5pWm5Y2XU09ITyDlpKflu4g!5e0!3m2!1sen!2stw!4v1787639957368!5m2!1sen!2stw",
  projectDetail: projectDetail,
  page: Page,
} satisfies ProjectConfig;