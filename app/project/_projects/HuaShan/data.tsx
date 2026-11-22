import type { IntroContent, ProjectDetailItem } from "@/app/project/[projectCode]/_data/projectTypes";

export const projectDetail: ProjectDetailItem[] = [
  { label: "基地位置", value: "台北市市民大道二段 67 巷 29 號" },
  { label: "基地面積", value: "109.20 坪" },
  { label: "使用分區", value: "第三種商業區" },
  { label: "建案類型", value: "電梯華廈" },
  { label: "建築規模", value: "地上 8 層、地下 2 層；RC 造；共 12 戶" },
  { label: "總樓地板面積", value: "482.15 坪" },
  { label: "總銷售面積", value: "436.95 坪" },
  { label: "總車位數", value: "汽車 12 位；機械昇降、平面式及機械停車式" },
  { label: "建築設計", value: "奧宇國際設計集團" },
  { label: "施工團隊", value: "國合營造事業有限公司" },
  { label: "目前進度", value: "已完工取得使用執照，僅剩3戶，即將完銷", fullWidth: true },
];

export const introContent: IntroContent = {
  title: "台北新藝境 華山靜巷心",
  content: (
    <>
      從善導寺一站直抵台北車站，<br />
      接軌高鐵、台鐵、捷運城市樞紐。<br />
      <br />
      漫步華山萬坪藝文綠帶，<br />
      讓創意與日常自在相遇。<br />
      <br />
      靜藏市民大道二段巷弄，串聯善導寺、忠孝新生雙站生活圈，<br />
      轉身即享三創、光華與西區門戶繁華。
    </>
  ),
images: [
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
]
}

export const interiorItems = [
  {
    title: "A 戶現代輕奢",
    buttonName: "A 戶",
    area: "15.45 坪",
    details: {
      "共有部分": "約 11.04 - 11.74 坪",
      "登記面積": "約 28.81 - 30.64 坪",
      "公設佔比": "約 37.95%",
      "陽台": "約 1.53 坪",
      "雨遮": "約 0.79 - 1.92 坪",
      "得房率": "約 61.7%",
    },
    images: [
      {
        imagePath: "/images/HuaShan/interior/A-01.webp",
        description: "A 戶實拍照"
      },
      {
        imagePath: "/images/HuaShan/interior/A-02.webp",
        description: "A 戶實拍照"
      },
      {
        imagePath: "/images/HuaShan/interior/A-03.webp",
        description: "A 戶實拍照"
      },
      {
        imagePath: "/images/HuaShan/interior/A-04.webp",
        description: "A 戶實拍照"
      },
      {
        imagePath: "/images/HuaShan/interior/A-05.webp",
        description: "A 戶實拍照"
      },
      {
        imagePath: "/images/HuaShan/interior/A-06.webp",
        description: "A 戶傢俱擺置圖"
      },
    ]
  },
  {
    title: "B 戶人文雅緻",
    buttonName: "B 戶",
    area: "14.67 坪",
    details: {
      "共有部分": "約 10.25 - 11.05 坪",
      "登記面積": "約 26.77 - 28.84 坪",
      "公設佔比": "約 37.95%",
      "陽台": "約 1.85 坪",
      "雨遮": "約 1.28 坪",
      "得房率": "約 61.7%",
    },
    images: [
      {
        imagePath: "/images/HuaShan/interior/B-01.webp",
        description: "B 戶實拍照"
      },
      {
        imagePath: "/images/HuaShan/interior/B-02.webp",
        description: "B 戶實拍照"
      },
      {
        imagePath: "/images/HuaShan/interior/B-03.webp",
        description: "B 戶實拍照"
      },
      {
        imagePath: "/images/HuaShan/interior/B-04.webp",
        description: "B 戶實拍照"
      },
      {
        imagePath: "/images/HuaShan/interior/B-05.webp",
        description: "B 戶實拍照"
      },
      {
        imagePath: "/images/HuaShan/interior/B-06.webp",
        description: "B 戶傢俱擺置圖"
      },
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
  aerialImage: "/images/HuaShan/aerial_photo.webp",
  aerialHighlightsImage: "/images/HuaShan/aerial_photo_text.webp",
}