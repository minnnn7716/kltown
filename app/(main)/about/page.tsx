import Image from "next/image";
import PageBanner from "@/components/PageBanner";

export default function Page() {
  return (
    <>
      <PageBanner
        title="About Us"
        subtitle="關於我們"
        backgroundImage="/images/main/about-banner.jpg"
      />

      <section className="mx-auto grid w-[90%] max-w-7xl gap-8 py-16 md:w-[75%] md:py-20">
        <section className="border-b border-gray-600 pb-8">
          <h2 className="mb-4 font-serif text-3xl font-semibold text-red-900">創建理念</h2>
          <p className="font-light leading-loose">
            共同建設為光隆實業（股票代碼 8916） 轉投資挹注成立的新創公司。秉持董事長的經營理念，以打造一個最溫暖的住所，帶給地主（消費者）幸福的生活氛圍為目標。
            <br />
            共同建設的由來係因董事長在求學時期研讀了《Our Common Future-我們的共同未來》這篇文獻後，十分認同永續發展的理念，又鑒於坊間建商只在乎獲利，不在意人與建築及環境相容的本質，故雖處房地產不景氣的時期，仍毅然決然在以共同創造永續生活價值為目標成立共同建設。
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-3xl font-semibold text-red-900">經營理念</h2>
          <p className="font-light leading-loose">
            精耕細節，打造永恆價值承諾，集眾人智慧，齊心協力打造美好生活家園。一群懷抱著建築理想的人，用建築的初心，攜手以人為本、腳踏實地的精神創立共同建設。
            <br /><br />
            因為相信理想建築不僅是追求美感，更應融合土地文化、環保健康、科技安全，承襲母公司將品質要求到好的實業精神，打造全方位的好宅，給每位主人最貼心恆久的承諾。
          </p>
        </section>
      </section>

      <section className="noiseBackground bg-brand-200">
        <div className="mx-auto grid w-[90%] max-w-7xl gap-8 py-16 md:w-[75%] md:pt-15 md:pb-20">
          <h2 className="font-serif text-3xl font-semibold text-red-900">組織架構</h2>
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/images/main/about_organization_sm.svg"
              width="748"
              height="464"
            />
            <Image
              src="/images/main/about_organization.svg"
              width="650"
              height="496"
              alt="組織架構"
              className="mx-auto"
            />
          </picture>
        </div>
      </section>
    </>);
}