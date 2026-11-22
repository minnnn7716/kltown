import styles from "./Hero.module.css";
import AOSReveal from "@/components/AOSReveal";

export default function Hero() {
  return (
    <section className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 min-h-svh">
      <div className={`bg-brand text-white content-center pl-[clamp(32px,8vw,150px)] ${styles.primarySection}`}>
        <div className={styles.title}>
          <h1 className="font-title font-bold">
            <span className="text-[5.8rem]/[130%] flex justify-between">
              <span>青</span>
              <span>喆</span>
            </span>
            <span className="text-[2.8rem]/none flex justify-between px-3">
              {
                "SOHO".split("").map((text, index) => <span key={`${text}${index}`}>{text}</span>)
              }
            </span>
          </h1>

          <p className="py-1 mt-4 bg-brand-900 font-serif text-lg text-center">
            15<span className="mx-2">/</span>24<span className="mx-2">/</span>37 坪
          </p>
        </div>
      </div>

      <div className={`${styles.secondarySection} noiseBackground bg-brand-secondary-100 flex items-center justify-end pr-[clamp(24px,3vw,80px)] relative overflow-hidden`}>
        <div className={`${styles.glowBlob} ${styles.glowBlobTopRight}`}></div>
        <AOSReveal
          as="p"
          className="text-brand font-serif text-xl/loose tracking-[.4em] [writing-mode:vertical-rl]"
          animation="fade-left"
          delay={600}
          duration={1200}
        >
          雙學園日式一巷宅，<br />
          繁華市心從容相伴；<br />
          一巷謙退收藏靜謐，<br />
          日常自成雅緻風景。
        </AOSReveal>
      </div>
    </section>
  );
}