import type { ProjectConfig } from "@/app/project/[projectCode]/_data/projectTypes";

import Page from "./page";
import projectDetail from "./data";
import theme from "./theme.module.css";

export const chingJeConfig = {
  name: "青喆 SOHO",
  themeClassName: theme.theme,
  googleMapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.9124275471663!2d121.50202920901653!3d25.003091477743922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9007e1c9083%3A0x1a5f8a831e9b3093!2z6Z2S5ZaGU09ITw!5e0!3m2!1sen!2stw!4v1787639910832!5m2!1sen!2stw",
  projectDetail: projectDetail,
  page: Page,
} satisfies ProjectConfig;