import Image from "next/image";

export function Surrounding() {
  return (
    <section className="overflow-x-clip">
      <div className="mx-auto md:max-w-[80vw] 2xl:max-w-[65vw] flex flex-col md:flex-row items-center justify-between gap-y-10 md:gap-y-0 pt-15 -mb-15 md:mb-0 md:py-20 text-brand">
        <div
          className="font-title text-center"
          data-aos="fade-right"
          data-aos-offset="200"
        >
          <h2 className="text-[2.8rem] mb-4 font-bold tracking-[.4em] md:tracking-[.2em]">城心藏藝<br className="md:hidden" /> 生活成<span className="md:tracking-normal">景</span></h2>
          <h3 className="text-xl font-medium tracking-[.4em] md:tracking-[.8em]">繁華與靜謐之間<br className="md:hidden" /> 恰好的從<span className="md:tracking-normal">容</span></h3>
        </div>

        <ul
          className="space-y-5 md:space-y-2 text-xl md:text-lg"
          data-aos="fade-left"
          data-aos-offset="200"
        >
          <li className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 md:grid-cols-[.6fr_1.2fr_2fr] md:items-baseline">
            <span>500m</span>
            <span className="font-medium">三創生活園區</span>
            <span className="font-light col-span-2 md:col-span-1 hidden md:block">科技與創意，在日常裡交會</span>
          </li>
          <li className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 md:grid-cols-[.6fr_1.2fr_2fr] md:items-baseline">
            <span>650m</span>
            <span className="font-medium">中央藝文公園</span>
            <span className="font-light col-span-2 md:col-span-1 hidden md:block">在城市中心，收藏一片綠意</span>
          </li>
          <li className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 md:grid-cols-[.6fr_1.2fr_2fr] md:items-baseline">
            <span>700m</span>
            <span className="font-medium">華山文創園區</span>
            <span className="font-light col-span-2 md:col-span-1 hidden md:block">讓藝文成為每日風景</span>
          </li>
          <li className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 md:grid-cols-[.6fr_1.2fr_2fr] md:items-baseline">
            <span>800m</span>
            <span className="font-medium">捷運忠孝新生站</span>
            <span className="font-light col-span-2 md:col-span-1 hidden md:block">板南、松山新店線雙捷交會</span>
          </li>
          <li className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 md:grid-cols-[.6fr_1.2fr_2fr] md:items-baseline">
            <span>800m</span>
            <span className="font-medium">捷運善導寺站</span>
            <span className="font-light col-span-2 md:col-span-1 hidden md:block">一站台北車站，串聯城市樞紐</span>
          </li>
        </ul>
      </div>

      <div className="relative w-full min-h-screen">
        <Image
          src="/images/HuaShan/aerial_photo_text.webp"
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
          src="/images/HuaShan/aerial_photo.webp"
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