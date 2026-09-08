"use client"

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { type ProjectCode } from "@/data/projectList";

const LandingContext = createContext<LandingContextValue | undefined>(undefined);

type LandingContextValue = {
  projectCode: ProjectCode;
  themeClassName: string;
}

type LandingProviderProps = LandingContextValue & {
  children: ReactNode
}

export default function LandingInfoProvider({
  projectCode,
  themeClassName,
  children
}: LandingProviderProps) {
  return (
    <LandingContext.Provider value={{
      projectCode,
      themeClassName
    }}>
      <div className={themeClassName}>{children}</div>
    </LandingContext.Provider>
  )
}

export function useLandingInfo() {
  return useContext(LandingContext)
}