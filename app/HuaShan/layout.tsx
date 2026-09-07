import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "共同建設 - 華山藝邸",
};

type HuaShanLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function HuaShanLayout({ children }: HuaShanLayoutProps) {
  return children;
}