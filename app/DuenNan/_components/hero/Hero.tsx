import Image from "next/image";

import { withBasePath } from "@/lib/withBasePath";
import { Dela_Gothic_One } from "next/font/google";
import styles from "./Hero.module.css";

const delaGothicOne = Dela_Gothic_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dela_Gothic_One",
  display: "swap",
});

export function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden">
      {/* 梯形背景 */}
      <div
        className={
          `${styles.mainImageAnimation}
          ${styles.trapezoidShadow}
          -z-1 md:z-15
          absolute inset-y-0 left-1/2
          w-full md:w-[60vw]
          -translate-x-1/2
          md:[clip-path:polygon(38%_0,62%_0,100%_100%,0_100%)]
          blur-xs
          `
        }
      ></div>
      <div
        className={
          `${styles.mainImageAnimation}
          -z-1 md:z-10
          absolute inset-y-0 left-1/2
          w-full md:w-[60vw]
          -translate-x-1/2
          md:[clip-path:polygon(38%_0,62%_0,100%_100%,0_100%)]`
        }
      >
        <Image
          src={withBasePath("/images/DuenNan/banner.webp")}
          alt=""
          fill
          className="object-cover"
          loading="eager"
        />
      </div>

      <div
        className="
          grid
          grid-rows-4
          md:grid-rows-1
          md:grid-cols-3
          min-h-svh
        ">
        <h1 className={`${styles.title} row-span-2 text-center md:text-right content-center text-shadow-lg/40`}>
          <span className={`${styles['title-primary']} inline-block font-sans font-black text-[6rem] text-white`}>
            敦<span className="tracking-normal">南</span>
          </span>
          <div className={`${styles.divideAnimation} h-px flex-1 bg-slate-400`} />
          <span className={`${styles['title-secondary']} relative md:pr-8 ${delaGothicOne.className} inline-block text-[4.5rem] text-[#D9D9D9] z-20`}>
            S<span className="text-brand-secondary-600">O</span>H<span className="tracking-normal">O</span>
          </span>
        </h1>

        <div className={`${styles.subtitleAnimation} md:col-start-3 text-center md:text-right content-center font-sans text-white`}>
          <h2 className="text-2xl font-bold tracking-[.2em] mb-4 md:mr-6 text-shadow-lg/40">城市軸心關鍵核心位置</h2>
          <div className={`${styles.divideAnimation} hidden md:block h-px flex-1 bg-slate-400`} />
          <h3 className="mt-4 md:mr-6 py-1 px-6 inline-block font-medium text-xl tracking-widest bg-brand-secondary-600 shadow-lg">18 - 34 坪</h3>
        </div>
      </div>
    </section>
  );
}