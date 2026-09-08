import { chingJeConfig } from "../../_projects/ChingJe/config";
import { duenNanConfig } from "../../_projects/DuenNan/config";
import { huaShanConfig } from "../../_projects/HuaShan/config";
import { oneParkConfig } from "../../_projects/OnePark/config";
import { lightImperialConfig } from "../../_projects/LightImperial/config";

export const projectRegistry = {
  ChingJe: chingJeConfig,
  HuaShan: huaShanConfig,
  DuenNan: duenNanConfig,
  OnePark: oneParkConfig,
  LightImperial: lightImperialConfig,
} as const;

export type ProjectCode = keyof typeof projectRegistry;

// 路由參數可由使用者直接修改，存取 Registry 前必須驗證 projectCode 是否存在於 projectRegistry 中。
export function isProjectCode(projectCode: string): projectCode is ProjectCode {
  return Object.hasOwn(projectRegistry, projectCode);
}