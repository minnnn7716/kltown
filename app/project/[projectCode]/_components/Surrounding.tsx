import Image from "next/image";
import { Fragment } from "react";

export type SurroundingDetail = {
  title: string;
  subTitle: string;
  locationHighlights: {
    distance: string;
    name: string;
    description: string;
  }[];
  aerialImage: string;
  aerialHighlightsImage: string;
}

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
    <section className="overflow-x-clip">
      <div className="mx-auto md:max-w-[80vw] 2xl:max-w-[65vw] flex flex-col md:flex-row items-center justify-between gap-y-10 md:gap-y-0 pt-15 -mb-15 md:mb-0 md:py-20 text-brand">
        <div
          className="font-title text-center"
          data-aos="fade-right"
          data-aos-offset="200"
        >
          <h2 className="text-[2.8rem] mb-4 font-bold tracking-[.4em] md:tracking-[.2em]">
            {renderHeading(surroundingDetail.title)}
          </h2>
          <h3 className="text-xl font-medium tracking-[.4em] md:tracking-[.8em]">
            {renderHeading(surroundingDetail.subTitle)}
          </h3>
        </div>

        <ul
          className="space-y-5 md:space-y-2 text-xl md:text-lg"
          data-aos="fade-left"
          data-aos-offset="200"
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
        </ul>
      </div>

      <div className="relative w-full min-h-screen">
        <Image
          src={surroundingDetail.aerialHighlightsImage}
          alt="地標文字"
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover z-5"
          style={{ objectPosition: 'calc(100% - 20%) center' }}
          data-aos="fade-up"
          data-aos-offset="300"
          data-aos-duration="800"
        />
        <Image
          src={surroundingDetail.aerialImage}
          alt="模擬空拍圖"
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
          style={{ objectPosition: 'calc(100% - 20%) center' }}
        />
      </div>
    </section>
  )
}