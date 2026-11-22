import type { IntroContent, ProjectDetailItem } from "@/app/project/[projectCode]/_data/projectTypes";

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
  { label: "目前進度", value: "全新完工，成屋銷售中", fullWidth: true },
];

export const introContent: IntroContent = {
  title: "森居城市 建築成景",
  content: (
    <>
      坐擁單元五萬坪公園綠意，<br />
      讓建築與自然，在城市之間從容相遇。<br />
      <br />
      俐落線條交織溫潤格柵，<br />
      石材質地與層層陽台，勾勒深淺有致的立面表情。<br />
      <br />
      取東方的含蓄，融入西方的比例秩序，<br />
      於公園第一排，留下歷久彌新的建築風景。<br />
    </>
  ),
  images: [
    {
      imagePath: "/images/OnePark/intro/onePark-ai-render.webp",
      description: "台中 One Park 結合 AI 模擬"
    },
  ]
};

export const interiorItems = [
  {
    title: "台中 One Park 內裝",
    buttonName: null,
    area: null,
    details: null,
    images: [
      {
        imagePath: "/images/OnePark/interior/01.webp",
        description: "台中 One Park 內裝"
      },
      {
        imagePath: "/images/OnePark/interior/02.webp",
        description: "台中 One Park 內裝"
      },
      {
        imagePath: "/images/OnePark/interior/03.webp",
        description: "台中 One Park 內裝"
      },
      {
        imagePath: "/images/OnePark/interior/04.webp",
        description: "台中 One Park 內裝"
      },
      {
        imagePath: "/images/OnePark/interior/05.webp",
        description: "台中 One Park 內裝"
      },
            {
        imagePath: "/images/OnePark/interior/06.webp",
        description: "台中 One Park 內裝"
      },
    ]
  },
];