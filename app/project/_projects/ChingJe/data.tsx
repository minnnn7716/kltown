import type { IntroContent, ProjectDetailItem } from "@/app/project/[projectCode]/_data/projectTypes";

export const projectDetail: ProjectDetailItem[] = [
  { label: "基地位置", value: "新北市中和區水源路 34 巷 12 號、16 號" },
  { label: "棟戶規劃", value: "2 幢；2 棟；82 戶住家；1 戶店面" },
  { label: "樓層規劃", value: "A 棟 14 層；B 棟 13 層" },
  { label: "住宅坪數", value: "1 房 - 15 坪；2 房 - 23/24 坪；3 房 - 32/37 坪" },
  { label: "店舖坪數", value: "39 坪" },
  { label: "車位規劃", value: "平面式 40 個" },
  { label: "建築設計", value: "許義明建築師事務所" },
  { label: "景觀設計", value: "上馥工程有限公司" },
  { label: "公設設計", value: "陳鵬旭空間美學室內裝修有限公司" },
  { label: "營造團隊", value: "金宏營造股份有限公司" },
  { label: "目前進度", value: "已完工，部分住戶入住", fullWidth: true },
];

export const introContent: IntroContent = {
  title: "和風入境 靜居中和",
  content: (
    <>
      退離中和市心主幹道約 30 米，<br />
      以一巷宅的謙退尺度，收藏鬧中取靜的日常。<br />
      <br />
      步行串聯永安市場站，環狀線中和站亦近在生活圈內，<br />
      64 快速道路、華中橋與中山路，從容往返雙北城市動線。<br />
      <br />
      近擁中和國小、漳和國中、南山完全中學，<br />
      轉身即享中和廟口商圈、比漾廣場與成熟生活機能，<br />
      以精緻日式美學，在熟成街廓裡留一方簡約靜好。
    </>
  ),
  images: [
    {
      imagePath: "/images/ChingJe/intro/chingje-ai-render.webp",
      description: "青喆 SOHO 結合 AI 模擬"
    },
    {
      imagePath: "/images/ChingJe/intro/mrt-station.webp",
      description: "永安市場捷運站"
    },
    {
      imagePath: "/images/ChingJe/intro/mall.webp",
      description: "商場示意圖"
    },
    {
      imagePath: "/images/ChingJe/intro/lobby.webp",
      description: "青喆 SOHO 接待大廳"
    }
  ]
};

export const interiorItems = [
  {
    title: "青喆 SOHO 內裝",
    buttonName: null,
    area: null,
    details: null,
    images: [
      {
        imagePath: "/images/ChingJe/interior/01.webp",
        description: "青喆 SOHO 內裝"
      },
      {
        imagePath: "/images/ChingJe/interior/02.webp",
        description: "青喆 SOHO 內裝"
      },
      {
        imagePath: "/images/ChingJe/interior/03.webp",
        description: "青喆 SOHO 內裝"
      },
      {
        imagePath: "/images/ChingJe/interior/04.webp",
        description: "青喆 SOHO 內裝"
      },
      {
        imagePath: "/images/ChingJe/interior/05.webp",
        description: "青喆 SOHO 內裝"
      }
    ]
  },
];


export const surroundingDetail = {
  title: "城心藏藝 生活成景",
  subTitle: "繁華與靜謐之間 恰好的從容",
  locationHighlights: [
    {
      distance: "500m",
      name: "三創生活園區",
      description: "科技與創意，在日常裡交會"
    },
    {
      distance: "650m",
      name: "中央藝文公園",
      description: "在城市中心，收藏一片綠意"
    },
    {
      distance: "700m",
      name: "華山文創園區",
      description: "讓藝文成為每日風景"
    },
    {
      distance: "800m",
      name: "捷運忠孝新生站",
      description: "板南、松山新店線雙捷交會"
    },
    {
      distance: "800m",
      name: "捷運善導寺站",
      description: "一站台北車站，串聯城市樞紐"
    }
  ],
  aerialImage: "/images/ChingJe/aerial_photo.webp",
}