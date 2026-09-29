import { ImgCarousel } from "@/components/imgCarousel/ImgCarousel"
import type { ImageListItem } from "@/components/imgCarousel/ImgCarousel"
import Image from "next/image";
import type { ReactNode } from "react";

export type IntroContent = {
  title: string;
  content: ReactNode;
  images: ImageListItem[];
}

export default function Intro({
  introContent
}: {
  introContent: IntroContent
}) {
  const { title, content, images } = introContent;

  return (
    <section className="overflow-x-clip container mx-auto py-20 grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-y-20 items-center">
      <div className="px-10">
        <h2
          className="font-title text-[1.7rem] text-brand font-medium mb-6 tracking-wide"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {title}
        </h2>
        <p
          className="font-light leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          {content}
        </p>
      </div>

      {images.length === 1 ? (
        <div
          className="relative w-full h-[70svh] md:h-[80svh]"
          data-aos="fade-left"
          data-aos-duration="2000"
        >
          <Image
            src={images[0].imagePath}
            alt={images[0].description}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
          />
          <span className="absolute right-0 bottom-0 rounded-tl-2xl border-l border-t border-brand-200 bg-brand px-4 py-2 text-xs text-white">
            {images[0].description}
          </span>
        </div>
      ) : (
        <ImgCarousel
          className="relative w-full h-[70svh] md:h-[80svh]"
          imageList={images}
        />
      )}
    </section>
  )
}