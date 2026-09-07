import { ImgCarousel } from "@/components/imgCarousel/ImgCarousel"
import type { ImageListItem } from "@/components/imgCarousel/ImgCarousel"

const imageList: ImageListItem[] = [
  {
    imagePath: "/images/HuaShan/intro/huashan-ai-render.webp",
    description: "華山藝邸實景結合 AI 模擬"
  },
  {
    imagePath: "/images/HuaShan/intro/huashan-1914-creative-park.webp",
    description: "華山文創園區實景照"
  },
  {
    imagePath: "/images/HuaShan/intro/syntrend-creative-park.webp",
    description: "三創園區實景照"
  },
  {
    imagePath: "/images/HuaShan/intro/mrt-station.webp",
    description: "捷運站內實景照"
  },
  {
    imagePath: "/images/HuaShan/intro/park-scene.webp",
    description: "公園模擬情境"
  },
];

export function Intro() {
  return (
    <section className="overflow-x-clip container mx-auto py-20 grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-y-20 items-center">
      <div className="px-10">
        <h2
          className="font-title text-[1.7rem] text-brand font-medium mb-6 tracking-wide"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          台北新藝境 華山靜巷心
        </h2>
        <p
          className="font-light leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          從善導寺一站直抵台北車站，<br />
          接軌高鐵、台鐵、捷運城市樞紐。<br /><br />

          漫步華山萬坪藝文綠帶，<br />
          讓創意與日常自在相遇。<br /><br />

          靜藏市民大道二段巷弄，串聯善導寺、忠孝新生雙站生活圈，<br />
          轉身即享三創、光華與西區門戶繁華。<br />
        </p>
      </div>

      <ImgCarousel
        className="relative w-full h-[70svh] md:h-[80svh]"
        imageList={imageList}
      />
    </section>
  )
}