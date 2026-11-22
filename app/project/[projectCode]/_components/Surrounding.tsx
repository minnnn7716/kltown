import Image from "next/image";
import { Fragment } from "react";
import type { SurroundingDetail } from "../_data/projectTypes"
import AOSReveal from "@/components/AOSReveal";

function renderHeading(text: string) {
  const finalCharacter = text.at(-1)
  const textBeforeFinalCharacter = text.slice(0, -1)

  return (
    <>
      {textBeforeFinalCharacter.split(" ").map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          {index > 0 && <><br className="md:hidden" /> {" "}</>}
          {part}
        </Fragment>
      ))}
      <span className="md:tracking-normal">{finalCharacter}</span>
    </>
  )
}

export default function Surrounding({ surroundingDetail }: {
  surroundingDetail: SurroundingDetail;
}) {
  return (
    <section className="overflow-x-clip mb-20">
      <div className="mx-8 xl:mx-auto xl:max-w-[80vw] 2xl:max-w-[65vw] flex flex-col md:flex-row items-center justify-between gap-y-10 md:gap-y-0 pt-15 -mb-10 md:mb-0 md:pt-20 md:pb-15 text-brand">
        <AOSReveal
          as="div"
          className="font-title text-center"
          animation="fade-right"
          offset={200}
        >
          <h2 className="text-[2.8rem] md:text-[2.5rem] xl:text-[2.8rem] mb-4 font-bold tracking-[.4em] md:tracking-[.2em]">
            {renderHeading(surroundingDetail.title)}
          </h2>
          <h3 className="text-xl md:text-lg xl:text-xl font-medium tracking-[.4em] md:tracking-[.8em]">
            {renderHeading(surroundingDetail.subTitle)}
          </h3>
        </AOSReveal>

        <AOSReveal
          as="ul"
          className="space-y-5 md:space-y-2 text-xl md:text-lg"
          animation="fade-left"
          offset={200}
        >
          {
            surroundingDetail.locationHighlights.map(highlight => (
              <li key={highlight.name} className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 md:grid-cols-[.6fr_1.2fr_2fr] md:items-baseline">
                <span>{highlight.distance}</span>
                <span className="font-medium">{highlight.name}</span>
                <span className="font-light col-span-2 md:col-span-1 hidden md:block">{highlight.description}</span>
              </li>
            ))
          }
        </AOSReveal>
      </div>

      <div className="relative w-full min-h-[60svh] md:min-h-[90svh] 2xl:min-h-auto overflow-x-clip xl:aspect-1684/529">
        <AOSReveal
          as="div"
          className="absolute inset-0 z-10"
          animation="fade-up"
          offset={300}
          duration={800}
        >
          <Image
            src={surroundingDetail.aerialHighlightsImage}
            alt="地標文字"
            fill
            sizes="100vw"
            className="object-cover z-5"
            style={{ objectPosition: 'center' }}
          />
        </AOSReveal>
        <Image
          src={surroundingDetail.aerialImage}
          alt="模擬空拍圖"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>
    </section>
  )
}