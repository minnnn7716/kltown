import type { Metadata } from "next";
import type { ReactNode } from "react";

import AOSInit from "@/components/AOSInit";
import { Noto_Sans_TC, Noto_Serif_TC, Zen_Old_Mincho, Aboreto } from "next/font/google";

const zenOldMincho = Zen_Old_Mincho({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-zen-old-mincho",
  display: "swap",
});

const aboreto = Aboreto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-aboreto",
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
    <html lang="zh-Hant" className={`${zenOldMincho.variable} ${notoSansTC.variable} ${notoSerifTC.variable} ${aboreto.variable}`}>
      <body>
        <AOSInit />

        {children}
      </body>
    </html>
  );
}