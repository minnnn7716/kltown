"use client"

import AOS from 'aos';
import Image from 'next/image';

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay
} from './CarouselSelectedSnapDisplay'

import { useEffect, useRef, forwardRef } from 'react';

import { ChevronRight, ChevronLeft } from 'lucide-react';
import styles from "./ImgCarousel.module.css";
import type { EmblaCarouselType } from 'embla-carousel';
import type { ImageListItem } from "@/app/project/[projectCode]/_data/projectTypes";

export type ImgCarouselProps = {
  className?: string,
  imageList: ImageListItem[],
  onSelect?: (selectedSnap: number) => void
}

export type ImgCarouselHandle = {
  getEmblaApi: () => EmblaCarouselType | undefined;
  scrollTo: (index: number) => void;
}

export const ImgCarousel = forwardRef<ImgCarouselHandle, ImgCarouselProps>(
  function ImgCarousel({ className, imageList, onSelect }, ref) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 6000, playOnInit: false })]
  );

  const scrollPrev = () => {
    const autoplay = emblaApi?.plugins().autoplay;
    autoplay?.stop();
    emblaApi?.scrollPrev()
  }

  const scrollNext = () => {
    const autoplay = emblaApi?.plugins().autoplay;
    autoplay?.stop();
    emblaApi?.scrollNext()
  }

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

  useEffect(() => {
    if (onSelect) {
      onSelect(selectedSnap)
    }
  }, [selectedSnap, onSelect])

  useEffect(() => {
    if (imageList.length < 2) return;

    const preloadImage = (index: number) => {
      const image = new window.Image();
      image.src = imageList[index].imagePath;
    };

    const nextIndex = (selectedSnap + 1) % imageList.length;
    const previousIndex = (selectedSnap - 1 + imageList.length) % imageList.length;

    preloadImage(nextIndex);
    preloadImage(previousIndex);
  }, [imageList, selectedSnap]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const applyAosDirection = () => {
      const el = rootRef.current;
      if (!el) return;
      el.setAttribute(
        "data-aos",
        mediaQuery.matches ? "fade-left" : "fade-up"
      );

      el.setAttribute(
        "data-aos-duration",
        mediaQuery.matches ? "2000" : "800"
      );

      AOS.refreshHard();
    }

    applyAosDirection();

    mediaQuery.addEventListener("change", applyAosDirection);
    return () => { mediaQuery.removeEventListener("change", applyAosDirection) };
  }, [])

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = emblaApi.plugins().autoplay;
    const rootEl = rootRef.current;
    if (!autoplay || !rootEl) return;

    if (rootEl.classList.contains("aos-animate")) {
      autoplay.play();
      return;
    }

    const onAosIn = (event: Event) => {
      const target = (event as CustomEvent<HTMLElement>).detail;
      if (!(target instanceof HTMLElement)) return;

      if (target === rootEl || rootEl.contains(target)) {
        autoplay.play();
        document.removeEventListener("aos:in", onAosIn as EventListener);
      }
    };

    document.addEventListener("aos:in", onAosIn as EventListener);
    return () => {
      document.removeEventListener("aos:in", onAosIn as EventListener);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (typeof ref !== 'function' && ref) {
      ref.current = {
        getEmblaApi: () => emblaApi,
        scrollTo: (index: number) => {
          emblaApi?.scrollTo(index, true);
        }
      };
    }
  }, [emblaApi, ref]);

  return (
    <div className={`embla ${className}`} ref={rootRef}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {
            imageList.map((item, index) => (
              <div key={`img-${index}`} className={styles.embla__slide}>
                <Image
                  src={item.imagePath}
                  alt={item.description}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
                <span className={styles.embla__imgDescription}>{item.description}</span>
              </div>
            ))
          }
        </div>
      </div>

      <div className="flex justify-between px-3 pt-1 text-brand">
        <SelectedSnapDisplay
          selectedSnap={selectedSnap}
          snapCount={snapCount}
        />

        <div className="flex gap-x-2">
          <button className="cursor-pointer transition-transform duration-300 ease-linear hover:-translate-x-2" onClick={scrollPrev}>
            <ChevronLeft className='w-10 h-10' strokeWidth='0.5' />
          </button>
          <button className="cursor-pointer transition-transform duration-300 ease-linear hover:translate-x-2" onClick={scrollNext}>
            <ChevronRight className='w-10 h-10' strokeWidth='0.5' />
          </button>
        </div>
      </div>
    </div>
  );
});
ImgCarousel.displayName = 'ImgCarousel';