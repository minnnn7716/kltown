import { HeroBackground } from "./HeroBackground";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <HeroBackground />
      <div className={styles.content}>
        <h1 className={styles.title}>
          華山藝邸
        </h1>

        <p className={styles.subtitle}>
          公園靜巷
          <span aria-hidden="true">｜</span>
          創意兩房
          <span aria-hidden="true">｜</span>
          26 / 30 / 43坪
        </p>

        <div className={styles.wordImage}>
          <p className={styles.handwritingText}>
            有藝思的家
          </p>
        </div>
      </div>
    </section>
  );
}