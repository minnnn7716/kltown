"use client"

import { ImgCarousel, type ImgCarouselHandle } from "@/components/imgCarousel/ImgCarousel"
import type { ImageListItem } from "@/components/imgCarousel/ImgCarousel"
import { useState, useRef } from "react"

// A 戶圖片
const imageListA: ImageListItem[] = [
  {
    imagePath: "/images/HuaShan/interior/Hua Shan-A-01.jpg",
    description: "A 戶實拍照"
  },
  {
    imagePath: "/images/HuaShan/interior/Hua Shan-A-02.jpg",
    description: "A 戶實拍照"
  },
  {
    imagePath: "/images/HuaShan/interior/Hua Shan-A-03.jpg",
    description: "A 戶實拍照"
  },
  {
    imagePath: "/images/HuaShan/interior/Hua Shan-A-04.jpg",
    description: "A 戶實拍照"
  },
  {
    imagePath: "/images/HuaShan/interior/Hua Shan-A-05.jpg",
    description: "A 戶實拍照"
  },
];

// B 戶圖片
const imageListB: ImageListItem[] = [
  {
    imagePath: "/images/HuaShan/interior/Hua Shan-B-01.jpg",
    description: "B 戶實拍照"
  },
  {
    imagePath: "/images/HuaShan/interior/Hua Shan-B-02.jpg",
    description: "B 戶實拍照"
  },
  {
    imagePath: "/images/HuaShan/interior/Hua Shan-B-03.jpg",
    description: "B 戶實拍照"
  },
  {
    imagePath: "/images/HuaShan/interior/Hua Shan-B-04.jpg",
    description: "B 戶實拍照"
  },
  {
    imagePath: "/images/HuaShan/interior/Hua Shan-B-05.jpg",
    description: "B 戶實拍照"
  },
];

// 合併所有圖片（A 戶在前 5 張，B 戶在後 5 張）
const allImages: ImageListItem[] = [...imageListA, ...imageListB];

// A 戶資訊
const unitAInfo = {
  title: "A 戶現代輕奢",
  area: "15.7 坪",
  details: {
    "玄關": "0.7 坪",
    "客餐廳": "5.7 坪",
    "主臥房": "3 坪",
    "次臥房": "2.7 坪",
    "廚房": "1.1 坪",
    "浴室": "1.1 坪",
    "工作陽台": "0.7 坪",
    "前陽台": "0.7 坪",
  }
};

// B 戶資訊
const unitBInfo = {
  title: "B 戶人文雅緻",
  area: "15.3 坪",
  details: {
    "玄關": "1.2 坪",
    "客餐廳": "4 坪",
    "主臥房": "3.2 坪",
    "次臥房": "3 坪",
    "廚房": "1.1 坪",
    "浴室": "1.2 坪",
    "工作陽台": "0.9 坪",
    "前陽台": "0.7 坪",
  }
};

export function Interior() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const carouselRef = useRef<ImgCarouselHandle>(null);

  // 根據 selectedImageIndex 判斷應該顯示哪一戶
  const displayUnit = selectedImageIndex < 5 ? 'A' : 'B';
  const displayInfo = displayUnit === 'A' ? unitAInfo : unitBInfo;

  // 切換戶型
  const switchUnit = (unit: 'A' | 'B') => {
    const targetIndex = unit === 'A' ? 0 : 5;
    carouselRef.current?.scrollTo(targetIndex);
  }

  return (
    <section className="overflow-x-clip container mx-auto md:max-w-[80vw] 2xl:max-w-[65vw] md:pt-20 pb-10 md:pb-40 grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-y-10 gap-x-10 items-center">
      {/* 左側：資訊區域 */}
      <div className="order-2 md:order-1 flex flex-col gap-8 py-4 px-8 md:px-0 pt-10 md:pt-0" data-aos="fade-right" data-aos-offset="200" data-aos-duration="1000">
        {/* 主要標題與圖片同步 */}
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-3xl font-bold mb-2 font-serif text-brand-700">{displayInfo.title}</h2>
          <div className="h-px flex-1 bg-brand-700"></div>
          <p className="text-xl text-brand-700">{displayInfo.area}</p>
        </div>

        {/* 戶型詳情 */}
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(displayInfo.details).map(([room, size]) => (
            <div key={room} className="border-b pb-2">
              <p className="text-sm text-gray-800">{room}</p>
              <p className="text-lg font-semibold text-brand-700">{size}</p>
            </div>
          ))}
        </div>

        {/* 戶型切換按鈕 */}
        <div className="flex gap-4 mt-3">
          <button
            onClick={() => switchUnit('A')}
            className={`flex-1 py-2 px-4 font-semibold transition-all ${
              displayUnit === 'A'
                ? 'bg-brand-600 text-white'
                : 'bg-white text-brand-600 hover:bg-brand-200 cursor-pointer'
            }`}
          >
            {unitAInfo.title}
          </button>
          <button
            onClick={() => switchUnit('B')}
            className={`flex-1 py-2 px-4 font-semibold transition-all ${
              displayUnit === 'B'
                ? 'bg-brand-600 text-white'
                : 'bg-white text-brand-600 hover:bg-brand-200 cursor-pointer'
            }`}
          >
            {unitBInfo.title}
          </button>
        </div>
      </div>

      {/* 右側：圖片輪播 */}
      <ImgCarousel
        ref={carouselRef}
        className="order-1 md:order-2 relative w-full h-[30svh] md:h-[80svh] 2xl:h-[60svh]"
        imageList={allImages}
        onSelect={setSelectedImageIndex}
      />
    </section>
  )
}