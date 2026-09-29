import type { ProjectDetailItem } from "@/app/project/[projectCode]/_components/ProjectDetail"
import type { IntroContent } from "@/app/project/[projectCode]/_components/Intro";

export const projectDetail: ProjectDetailItem[] = [
  { label: "基地位置", value: "臺中市南屯區新生里龍富十路 223 號" },
  { label: "基地面積", value: "344.44 坪" },
  { label: "使用分區", value: "第 1-1 種住宅區" },
  { label: "建案類型", value: "住商混合" },
  { label: "建築規模", value: "1 棟；地下 3；地上 12，住商混合住宅" },
  { label: "總樓地板面積", value: "1,694.43 坪" },
  { label: "總銷售面積", value: "1,235.97 坪" },
  { label: "總車位數", value: "汽車 51 位" },
  { label: "建築設計", value: "初樸建築師事務所" },
  { label: "施工團隊", value: "崴正營造股份有限公司" },
  { label: "目前進度", value: "建造執照已核准，興建中", fullWidth: true },
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
      imagePath: "/images/LightImperial/intro/lightImperial-ai-render.jpg",
      description: "宜蘭光御墅結合 AI 模擬"
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
        imagePath: "/images/LightImperial/interior/01.jpg",
        description: "宜蘭光御墅內裝"
      },
      {
        imagePath: "/images/LightImperial/interior/02.jpg",
        description: "宜蘭光御墅內裝"
      },
      {
        imagePath: "/images/LightImperial/interior/03.jpg",
        description: "宜蘭光御墅內裝"
      },
    ]
  },
];