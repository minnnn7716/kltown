import Image from "next/image";

import { Imperial_Script } from "next/font/google";
import styles from "./Hero.module.css";

const imperialScript = Imperial_Script({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export default function Hero() {
  return (
    <div className="noiseBackground bg-brand-200">
      <section className="relative h-svh overflow-hidden text-olive-800 text-center content-center ">
        <div className="-z-1 decorationImages absolute left-0 top-0 h-full w-full">
          <Image
            src="/images/OnePark/hero/hero-deco-left.webp"
            alt=""
            width={500}
            height={500}
            loading="eager"
            className={`${styles['deco-left']} h-full w-auto absolute left-[-65%] md:left-0 top-0 pointer-events-none`}
          />

          <Image
            src="/images/OnePark/hero/hero-deco-middle.webp"
            alt=""
            width={190}
            height={189}
            loading="eager"
            className={`${styles['deco-flower']} absolute h-35 w-auto left-[22vw] bottom-[10vh] pointer-events-none`}
          />

          <Image
            src="/images/OnePark/hero/hero-deco-right.webp"
            alt=""
            width={500}
            height={500}
            loading="eager"
            className={`${styles['deco-right']} h-full w-auto absolute right-0 top-0 object-cover`}
          />
        </div>

        <div className={styles.title}>
          <h3 className="font-serif text-3xl md:text-xl">台　中</h3>
          <h1 className={`${imperialScript.className} text-[6.8rem] md:text-[9rem] md:leading-tight`}>One Park</h1>
          <h2 className="font-serif text-2xl md:text-xl font-light tracking-[.5em] leading-relaxed">
            國際足球園<span className="tracking-normal md:tracking-[.5em]">區</span>
            <span className="hidden md:inline-block">×</span><br className="md:hidden" />
            萬坪森態公
            <span className="tracking-normal">園</span>
          </h2>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-1/2 w-[55vh] md:w-[65vh] aspect-square bg-brand-secondary-100 rounded-full -z-1 blur-3xl md:2xl"></div>
      </section>
    </div>
  );
}