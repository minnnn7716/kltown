import type { CSSProperties } from "react";
import styles from "./PageBanner.module.css";

type PageBannerProps = {
  title: string;
  subtitle: string;
  backgroundImage: string;
};

export default function PageBanner({
  title,
  subtitle,
  backgroundImage,
}: PageBannerProps) {
  const bannerStyle = {
    "--banner-image": `url("${backgroundImage}")`,
  } as CSSProperties;

  return (
    <section className={styles.banner} style={bannerStyle}>
      <div className={styles.content} data-aos="fade-up">
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </section>
  );
}