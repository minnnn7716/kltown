import type { ReactNode } from "react";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import MainNavigation from "@/components/MainNavigation";

export default function IndexLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainNavigation />

      {children}

      <Footer />
      <BackToTop />
    </>
  );
}