import { ImgCarousel } from "@/components/imgCarousel/ImgCarousel"
import type { IntroContent } from "../_data/projectTypes"
import Image from "next/image";
import AOSReveal from "@/components/AOSReveal";

export default function Intro({
  introContent
}: {
  introContent: IntroContent
}) {
  const { title, content, images } = introContent;

  return (
    <section className="overflow-x-clip container mx-auto pt-20 mb-20 grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-y-20 items-center">
      <div className="px-10">
        <AOSReveal
          as="h2"
          className="font-title text-[1.7rem] text-brand font-medium mb-6 tracking-wide"
          animation="fade-up"
          delay={100}
        >
          {title}
        </AOSReveal>
        <AOSReveal
          as="p"
          className="font-light leading-relaxed"
          animation="fade-up"
          delay={500}
        >
          {content}
        </AOSReveal>
      </div>

      {images.length === 1 ? (
        <AOSReveal
          as="div"
          className="relative w-full h-[50svh] md:h-[50svh] xl:h-[80svh] 2xl:h-[60svh]"
          animation="fade-left"
          duration={2000}
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
        </AOSReveal>
      ) : (
        <ImgCarousel
          className="relative w-full h-[50svh] md:h-[50svh] xl:h-[80svh] 2xl:h-[60svh]"
          imageList={images}
        />
      )}
    </section>
  )
}