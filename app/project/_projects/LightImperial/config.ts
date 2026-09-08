import type { ProjectConfig } from "@/app/project/[projectCode]/_data/projectTypes";

import Page from "./page";
import projectDetail from "./data";
import theme from "./theme.module.css";

export const lightImperialConfig = {
  name: "宜蘭光御墅",
  themeClassName: theme.theme,
  googleMapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.5376826578718!2d121.73513090900562!3d24.77703567789199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3467fb741edd072f%3A0x4f0d1d58e973d26c!2z5YWJ5b6h5aKFVmlsbGE!5e0!3m2!1sen!2stw!4v1787640060040!5m2!1sen!2stw",
  projectDetail: projectDetail,
  page: Page,
} satisfies ProjectConfig;