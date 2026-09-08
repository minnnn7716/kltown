import type { Metadata } from "next";
import type { ReactNode } from "react";

import AOSInit from "@/components/AOSInit";
import { Noto_Sans_TC, Noto_Serif_TC, Zen_Old_Mincho } from "next/font/google";

const zenOldMincho = Zen_Old_Mincho({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-zen-old-mincho",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  subsets: ["latin"],
});

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "共同建設",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="zh-Hant" className={`${zenOldMincho.variable} ${notoSansTC.variable} ${notoSerifTC.variable}`}>
      <body>
        <AOSInit />

        {/* 用於顯示 FloatingNavigation 的茅點 */}
        <div
          data-nav-trigger
          className="absolute top-[50svh] h-px w-px pointer-events-none"
          aria-hidden="true"
        />

        {children}
      </body>
    </html>
  );
}