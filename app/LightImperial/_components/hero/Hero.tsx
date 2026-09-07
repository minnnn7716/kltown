import localFont from "next/font/local";
import { withBasePath } from "@/lib/withBasePath";
import { Oleo_Script_Swash_Caps } from "next/font/google";
import styles from "./Hero.module.css";

const oleoScriptSwashCaps = Oleo_Script_Swash_Caps({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const mantou = localFont({
  src: "../../../../public/fonts/MANTOUSANS-REGULAR.subset.ttf",
  variable: "--font-chen",
  weight: "400",
  display: "swap",
});

export function Hero() {
  return (
    <section
      className={`${styles.hero} h-svh overflow-hidden grid grid-rows-[1fr_1fr_1fr] text-white text-center before:bg-position-[30%] lg:before:bg-center`}
      style={
        {
          "--hero-banner-url": `url("${withBasePath("/images/LightImperial/banner.webp")}")`,
        } as React.CSSProperties
      }
    >
      <div className="pt-10">
        <h3 className={`${styles.fadeInAnimation} inline-block px-8 lg:px-4 py-2 lg:py-1 text-2xl lg:text-lg font-medium bg-black/15 border border-white`}>
          宜 蘭
        </h3>
      </div>
      <h1>
        <span className={`${mantou.className} ${styles['title-primary']} block text-[6rem] leading-tight`}>
          光御<span className="tracking-normal">墅</span>
        </span>
        <span className={`${oleoScriptSwashCaps.className} ${styles['title-secondary']} block text-[5rem] leading-tight`}>Villa</span>
      </h1>
      <div className="content-center">
        <h2 className={`${styles.fadeInAnimation} text-xl lg:text-lg font-medium leading-loose tracking-[.4em] text-shadow-lg`}>
          好山好水｜離塵不離市<span className="hidden md:inline">｜</span><br className="md:hidden" />透天 53-74 <span className="leading-none">坪</span>
        </h2>
      </div>
    </section>
  );
}