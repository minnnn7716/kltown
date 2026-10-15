import type { IntroContent, ProjectDetailItem } from "@/app/project/[projectCode]/_data/projectTypes";

export const projectDetail: ProjectDetailItem[] = [
  { label: "基地位置", value: "宜蘭縣宜蘭市梅洲一路" },
  { label: "基地面積", value: "928.37 坪" },
  { label: "使用分區", value: "甲種建築用地" },
  { label: "建案類型", value: "住商混合" },
  { label: "建築規模", value: "1 棟 4 層開發中心；26 棟 3.5 層透天戶" },
  { label: "總樓地板面積", value: "1,741.99 坪" },
  { label: "總銷售面積", value: "1,922.44 坪" },
  { label: "總車位數", value: "汽車 26 位" },
  { label: "建築設計", value: "向登群建築師事務所" },
  { label: "施工團隊", value: "凱達營造" },
  { label: "目前進度", value: "110 年 09 月已完工", fullWidth: true },
];

export const introContent: IntroContent = {
  title: "蘭陽山水間 悠然墅居",
  content: (
    <>
      依偎雪山山脈與蘭陽田野，<br />
      收藏清澈水質、豐富生態與四季自然風景。<br />
      <br />
      低密度 Villa 聚落，以「建築即風景」為設計理念，<br />
      戶戶迎光納風、頂樓大露臺開展遼闊視野，<br />
      讓陽光、綠意與山景成為生活日常。<br />
      <br />
      離塵而居，卻不離城市便利，<br />
      宜蘭市區、車站、交流道與生活採買皆在短程車距，<br />
      在好山好水之間，享有一方從容自在。
    </>
  ),
  images: [
    {
      imagePath: "/images/LightImperial/intro/lightImperial-ai-render.webp",
      description: "宜蘭光御墅結合 AI 模擬"
    },
    {
      imagePath: "/images/LightImperial/intro/lightImperial-appearance-01.webp",
      description: "宜蘭光御墅實拍照"
    },
    {
      imagePath: "/images/LightImperial/intro/lightImperial-appearance-02.webp",
      description: "宜蘭光御墅實拍照"
    },
  ]
};

export const interiorItems = [
  {
    title: "宜蘭光御墅內裝",
    buttonName: null,
    area: null,
    details: null,
    images: [
      {
        imagePath: "/images/LightImperial/interior/01.webp",
        description: "宜蘭光御墅內裝"
      },
      {
        imagePath: "/images/LightImperial/interior/02.webp",
        description: "宜蘭光御墅內裝"
      },
      {
        imagePath: "/images/LightImperial/interior/03.webp",
        description: "宜蘭光御墅內裝"
      },
      {
        imagePath: "/images/LightImperial/interior/04.webp",
        description: "宜蘭光御墅內裝"
      },
      {
        imagePath: "/images/LightImperial/interior/05.webp",
        description: "宜蘭光御墅內裝"
      },
    ]
  },
];