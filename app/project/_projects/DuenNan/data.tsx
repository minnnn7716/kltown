import type { IntroContent, ProjectDetailItem } from "@/app/project/[projectCode]/_data/projectTypes";

export const projectDetail: ProjectDetailItem[] = [
  { label: "基地位置", value: "台北市大安區敦化南路一段 177 巷 46 號" },
  { label: "棟戶規劃", value: "1 幢；1 棟；18 戶住家；2 戶店面" },
  { label: "樓層規劃", value: "地上 8 層 / 地下 3 層" },
  { label: "住宅坪數", value: "18 坪 - 34 坪" },
  { label: "店舖坪數", value: "31.42 坪 / 41.33 坪" },
  { label: "車位規劃", value: "機械倉儲式 13 個" },
  { label: "建築設計", value: "奧宇國際聯合建築師事務所" },
  { label: "營造團隊", value: "遠碩營造股份有限公司" },
  { label: "目前進度", value: "109 年 04 月已完工", fullWidth: true },
];

export const introContent: IntroContent = {
  title: "敦南一席 都會核心",
  content: (
    <>
      步行約 250 公尺即達忠孝敦化站，<br />
      快速串聯小巨蛋、松山機場與台北城市動脈。<br />
      <br />
      坐落敦南東區精華地段，<br />
      時尚、藝文、美食與商業能量近在日常，<br />
      在城市最繁華的軸線上，掌握便利與從容。<br />
      <br />
      榮獲第 27 屆中華建築金石獎，<br />
      以深淺石材與俐落線條勾勒低調質感，<br />
      日夜光影交替，成就東區醒目的城市建築。
    </>
  ),
  images: [
    {
      imagePath: "/images/DuenNan/intro/duenNan-ai-render.webp",
      description: "敦南 SOHO 結合 AI 模擬"
    },
  ]
};


export const interiorItems = [
  {
    title: "敦南 SOHO 內裝",
    buttonName: null,
    area: null,
    details: null,
    images: [
      {
        imagePath: "/images/DuenNan/interior/01.webp",
        description: "敦南 SOHO 內裝"
      },
      {
        imagePath: "/images/DuenNan/interior/02.webp",
        description: "敦南 SOHO 內裝"
      },
      {
        imagePath: "/images/DuenNan/interior/03.webp",
        description: "敦南 SOHO 內裝"
      },
      {
        imagePath: "/images/DuenNan/interior/04.webp",
        description: "敦南 SOHO 內裝"
      },
      {
        imagePath: "/images/DuenNan/interior/05.webp",
        description: "敦南 SOHO 內裝"
      },
      {
        imagePath: "/images/DuenNan/interior/06.webp",
        description: "敦南 SOHO 內裝"
      },
      {
        imagePath: "/images/DuenNan/interior/07.webp",
        description: "敦南 SOHO 內裝"
      },
      {
        imagePath: "/images/DuenNan/interior/08.webp",
        description: "敦南 SOHO 內裝"
      },
    ]
  },
];