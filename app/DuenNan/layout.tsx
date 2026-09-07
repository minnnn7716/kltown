import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "共同建設 - 敦南 SOHO",
};

type ChingJeLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function ChingJeLayout({ children }: ChingJeLayoutProps) {
  return (
    <div>
      {children}
    </div>
  );
}