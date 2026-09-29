import type { ProjectDetailItem } from "@/app/project/[projectCode]/_components/ProjectDetail"
import type { IntroContent } from "@/app/project/[projectCode]/_components/Intro";

export const projectDetail: ProjectDetailItem[] = [
  { label: "基地位置", value: "台北市市民大道二段 67 巷 29 號" },
  { label: "基地面積", value: "109.20 坪" },
  { label: "使用分區", value: "第三種商業區" },
  { label: "建案類型", value: "電梯華廈" },
  { label: "建築規模", value: "地上 8 層、地下 2 層；RC 造；共 12 戶" },
  { label: "總樓地板面積", value: "482.15 坪" },
  { label: "總銷售面積", value: "443.16 坪" },
  { label: "總車位數", value: "汽車 12 位；機械昇降、平面式及機械停車式" },
  { label: "建築設計", value: "奧宇國際設計集團" },
  { label: "施工團隊", value: "國合營造事業有限公司" },
  { label: "目前進度", value: "建造執照已核准，工程進行中", fullWidth: true },
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
    area: 15.7,
    details: {
      "玄關": 0.7,
      "客餐廳": 5.7,
      "主臥房": 3,
      "次臥房": 2.7,
      "廚房": 1.1,
      "浴室": 1.1,
      "工作陽台": 0.7,
      "前陽台": 0.7,
    },
    images: [
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
    ]
  },
  {
    title: "B 戶人文雅緻",
    buttonName: "B 戶",
    area: 15.3,
    details: {
      "玄關": 1.2,
      "客餐廳": 4,
      "主臥房": 3.2,
      "次臥房": 3,
      "廚房": 1.1,
      "浴室": 1.2,
      "工作陽台": 0.9,
      "前陽台": 0.7,
    },
    images: [
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