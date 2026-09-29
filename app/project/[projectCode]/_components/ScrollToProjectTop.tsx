"use client";

import { useEffect } from "react";

type ScrollToProjectTopProps = {
  projectCode: string;
};

export default function ScrollToProjectTop({ projectCode }: ScrollToProjectTopProps) {
  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [projectCode]);

  return null;
}