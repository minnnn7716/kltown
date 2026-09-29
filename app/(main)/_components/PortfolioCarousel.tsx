"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { projectRegistry, type ProjectCode } from "@/app/project/[projectCode]/_data/projectRegistry";
import { useSelectedSnapDisplay } from "@/components/imgCarousel/CarouselSelectedSnapDisplay";
import styles from "./PortfolioCarousel.module.css";

type PortfolioCarouselProps = {
  projectCodes: readonly ProjectCode[];
  controlsTargetId?: string;
};

const subscribeToStaticTarget = () => () => { };

export function PortfolioCarousel({ projectCodes, controlsTargetId }: PortfolioCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true, slidesToScroll: 1 },
    [
      Autoplay({
        delay: 6000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      }),
    ],
  );
  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);
  const controlsTarget = useSyncExternalStore(
    subscribeToStaticTarget,
    () => (controlsTargetId ? document.getElementById(controlsTargetId) : null),
    () => null,
  );
  const currentProject = String(selectedSnap + 1).padStart(2, "0");
  const totalProjects = String(snapCount).padStart(2, "0");

  const scrollPrev = () => {
    emblaApi?.plugins().autoplay?.reset();
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.plugins().autoplay?.reset();
    emblaApi?.scrollNext();
  };

  const controls = (
    <div className="flex justify-between items-center">
      <p className={`${styles.counter} font-aboreto text-3xl`} aria-live="polite">
        <span>{currentProject}</span>
        <span aria-hidden="true"> / </span>
        <span>{totalProjects}</span>
        <span className="sr-only">建案</span>
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          className={styles.control}
          onClick={scrollPrev}
          aria-label="上一個建案"
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={scrollNext}
          aria-label="下一個建案"
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport} ref={emblaRef}>
        <ul className={styles.container}>
          {projectCodes.map((projectCode) => {
            const project = projectRegistry[projectCode];

            return (
              <li key={projectCode} className={styles.slide}>
                <Link
                  href={`/project/${projectCode}`}
                  scroll
                  className={styles.link}
                >

                  <Image
                    src={`/images/main/portfolio_${projectCode}.jpg`}
                    width={460}
                    height={560}
                    alt={project.name}
                    className={styles.image}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {controlsTarget ? createPortal(controls, controlsTarget) : controls}
    </div>
  );
}