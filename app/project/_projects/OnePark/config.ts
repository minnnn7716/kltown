import type { ProjectConfig } from "@/app/project/[projectCode]/_data/projectTypes";

import Page from "./page";
import projectDetail from "./data";
import theme from "./theme.module.css";

export const oneParkConfig = {
  name: "台中 One Park",
  themeClassName: theme.theme,
  googleMapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3641.0213541754715!2d120.62498519999998!3d24.1358882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d0027a6d10f%3A0xf47946728cbbdd6c!2z5YWJ6ZqGIE9ORSBQQVJL!5e0!3m2!1sen!2stw!4v1787640027847!5m2!1sen!2stw",
  projectDetail: projectDetail,
  page: Page,
} satisfies ProjectConfig;