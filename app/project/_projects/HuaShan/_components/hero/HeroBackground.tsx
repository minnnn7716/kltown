import styles from "./Hero.module.css";

export function HeroBackground() {
  return (
    <div className={styles.heroBackground} aria-hidden="true">
      <div className={styles.backgroundBase} />
      <div className={`${styles.glowBlob} ${styles.glowBlobTopRight}`} />
      <div className={`${styles.glowBlob} ${styles.glowBlobBottomLeft}`} />
      <div className={`${styles.glowBlob} ${styles.glowBlobCenter}`} />
    </div>
  );
}
