"use client"

import { ImgCarousel, type ImgCarouselHandle } from "@/components/imgCarousel/ImgCarousel"
import type { ImageListItem } from "@/components/imgCarousel/ImgCarousel"
import { useState, useRef } from "react"

export type InteriorItem = {
  title: string;
  buttonName: string | null;
  area: number | null;
  details: Record<string, number> | null;
  images: ImageListItem[];
}

export default function Interior({
  interiorItems
}: {
  interiorItems: InteriorItem[]
}) {
  // 合併所有戶型圖片
  const allImages: ImageListItem[] = interiorItems.flatMap(items => [...items.images]);
  // 每一戶都有 details 才顯示詳情（任一戶沒有就不顯示）
  const showDetail = interiorItems.every(item => item.details);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const carouselRef = useRef<ImgCarouselHandle>(null);

  const unitStartIndexes = interiorItems.map((_, unitIndex) =>
    interiorItems
      .slice(0, unitIndex)
      .reduce((imageCount, unit) => imageCount + unit.images.length, 0)
  );
  const displayUnitIndex = unitStartIndexes.findIndex((startIndex, unitIndex) =>
    selectedImageIndex >= startIndex &&
    selectedImageIndex < startIndex + interiorItems[unitIndex].images.length
  );
  const activeUnitIndex = displayUnitIndex === -1 ? 0 : displayUnitIndex;
  const displayInfo = interiorItems[activeUnitIndex];

  // 切換戶型
  const switchUnit = (unitIndex: number) => {
    carouselRef.current?.scrollTo(unitStartIndexes[unitIndex]);
  }

  return (
    <section className={`overflow-x-clip container mx-auto md:max-w-[80vw] 2xl:max-w-[65vw] md:py-20 pb-10 md:pb-30 grid grid-cols-1 ${interiorItems.length === 1 ? 'md:grid-cols-[2fr_5fr]' : 'md:grid-cols-[4fr_6fr]'} gap-y-10 gap-x-10 items-center`}>
      {/* 左側：資訊區域 */}
      <div className={`${interiorItems.length === 1 ? 'order-1' : 'order-2'} md:order-1 flex flex-col gap-8 py-4 px-8 md:px-0 pt-10 md:pt-0`} data-aos="fade-right" data-aos-offset="200" data-aos-duration="1000">
        {/* 主要標題與圖片同步 */}
        <div className={`flex ${interiorItems.length === 1 ? 'flex-col justify-between' : 'items-center justify-between gap-3'}`}>
          <h2 className="text-3xl font-bold mb-2 font-serif text-brand-700">{displayInfo.title}</h2>
          {
            displayInfo.area && (<>
              <div className="h-px flex-1 bg-brand-700"></div>
              <p className="text-xl text-brand-700">{displayInfo.area} 坪</p>
            </>)
          }

        </div>

        {/* 戶型詳情 */}
        {showDetail && displayInfo.details && (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(displayInfo.details).map(([room, size]) => (
              <div key={room} className="border-b pb-2">
                <p className="text-sm text-gray-800">{room}</p>
                <p className="text-lg font-semibold text-brand-700">{size} 坪</p>
              </div>
            ))}
          </div>
        )}

        {/* 戶型切換按鈕 */}
        {interiorItems.length > 1 && (
          <div className="flex gap-4 mt-3">
            {interiorItems.map((item, unitIndex) => (
              <button
                key={item.buttonName}
                onClick={() => switchUnit(unitIndex)}
                className={`flex-1 py-2 px-4 font-semibold transition-all ${activeUnitIndex === unitIndex
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-brand-600 hover:bg-brand-200 cursor-pointer'
                  }`}
              >
                {item.buttonName}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 右側：圖片輪播 */}
      <ImgCarousel
        ref={carouselRef}
        className={`${interiorItems.length === 1 ? 'order-2' : 'order-1'} md:order-2 relative w-full h-[30svh] md:h-[80svh] 2xl:h-[60svh]`}
        imageList={allImages}
        onSelect={setSelectedImageIndex}
      />
    </section>
  )
}