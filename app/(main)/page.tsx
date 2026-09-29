import { ContactForm } from "@/components/contact/ContactForm";
import { orderedProjectCodes } from "@/app/project/[projectCode]/_data/projectRegistry";
import Image from "next/image";
import styles from "./page.module.css";
import { PortfolioCarousel } from "./_components/PortfolioCarousel";

const portfolioProjectCodes = orderedProjectCodes;

export default function Page() {
  return (
    <div className="noiseBackground bg-linear-to-b from-brand-bg-200 to-brand-bg-100">
      <div
        data-nav-trigger
        className="pointer-events-none absolute top-[50svh] h-px w-px"
        aria-hidden="true"
      />

      <section className={`${styles.hero} bg-brand-700 text-white flex h-svh items-center`}>
        <div className="mx-6 flex flex-1 flex-col items-center justify-center gap-10 md:mx-8 md:flex-row md:justify-between md:gap-0">
          <h2 className={`${styles.title} text-center font-genRyuMin text-6xl md:text-4xl leading-tight md:ml-8 md:text-left md:text-[4.5rem]`}>
            共創珍邸<br />同享榮耀
          </h2>
          <div className="flex flex-col items-center md:items-end">
            <h3 className={`${styles.subTitle} font-handwriting text-center text-3xl leading-normal mb-20 md:text-right md:text-4xl md:mb-0`}>
              精耕細節，<br className="md:hidden" />打造永恆價值承諾<br />
              集眾人智慧，<br className="md:hidden" />齊心協力打造美好生活家園
            </h3>
            <Image
              src="/images/logo_white.svg"
              width={280}
              height={40}
              alt="共同建設股份有限公司"
              className={`${styles.logo} pt-1 md:pb-2 w-70`}
            />
          </div>
        </div>
      </section>

      <div className="noiseBackground bg-linear-to-b from-brand-bg-200 to-brand-bg-100">
        <section
          className="w-[90%] max-w-7xl mx-auto py-16 md:py-25 gap-6 md:gap-x-6 grid grid-cols-1 md:grid-cols-[1fr_4fr]"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="font-aboreto text-5xl md:text-[2.75rem] mb-3 md:mb-2">Projects</h2>
              <p className="font-serif font-medium text-2xl md:text-xl tracking-[.2em]">建案資訊</p>
            </div>
            <div id="portfolio-carousel-controls" className="mt-6 md:mt-12" />
          </div>
          <PortfolioCarousel
            projectCodes={portfolioProjectCodes}
            controlsTargetId="portfolio-carousel-controls"
          />
        </section>

        <section className="noiseBackground bg-brand-300">
          <div className="w-[90%] max-w-7xl mx-auto py-16 md:py-25">
            <div
              className="text-center px-2 mb-8 md:mb-15"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h2 className="font-aboreto text-5xl md:text-6xl mb-2">Awards</h2>
              <p className="font-serif font-medium text-2xl md:text-xl tracking-[.2em]">—— 得獎紀錄 ——</p>
            </div>

            <div className="grid gap-y-10 md:gap-y-25">
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-10"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <Image
                  src="/images/main/award_gstone.png"
                  width={650}
                  height={500}
                  alt="金石獎-敦南 SOHO"
                  className="rounded-tl-4xl rounded-br-4xl shadow-xl"
                />
                <div>
                  <h3 className="mb-4">
                    <span className="font-aboreto text-xl">Golden Stone Award</span>
                    <p className="font-serif font-semibold text-3xl">金石獎</p>
                  </h3>
                  <h4 className="inline-block py-1 bg-brand text-white px-4 mb-4">敦南 SOHO 大廈</h4>
                  <p className="font-light leading-relaxed">共同建設在台北市敦化南路一段 177 巷 46 號的「敦南SOHO」建案，獲得 2019 年第 27 屆中華建築金石獎活動委員會肯定；得到優良建築規劃設計類〈住宅商業大樓中層組〉金石獎。</p>
                </div>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-10"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="order-2 md:order-1">
                  <h3 className="mb-4">
                    <span className="font-aboreto text-xl">French Design Awards</span>
                    <p className="font-serif font-semibold text-3xl">法國設計獎</p>
                  </h3>
                  <p className="font-light mb-5">共同建設在台北市中山區的「華山藝邸」與台中市南屯區的「台中案」，雙雙獲得2025年法國設計獎肯定。</p>
                  <ul>
                    <li className="mb-4 flex flex-col items-start gap-2 md:flex-row md:items-start md:gap-3">
                      <h4 className="w-36 shrink-0 py-1 bg-brand text-white text-center">台中 One Park</h4>
                      <p className="font-light leading-relaxed">
                        強調城市肌理與生態景觀的和諧共存。透過建築退縮和綠化延伸，將建築打造為一個環境友善的城市節點。
                      </p>
                    </li>
                    <li className="flex flex-col items-start gap-2 md:flex-row md:items-start md:gap-3">
                      <h4 className="w-36 shrink-0 py-1 bg-brand text-white text-center">華山藝邸</h4>
                      <p className="font-light leading-relaxed">
                        集居住與商業功能於一體的地標建築，層次分明的佈局，使建築在藝術性和日常生活之間實現了平衡。
                      </p>
                    </li>
                  </ul>
                </div>

                <Image
                  src="/images/main/award_French Design.png"
                  width={650}
                  height={500}
                  alt="2025 法國設計獎 銀獎"
                  className="order-1 md:order-2 rounded-tl-4xl rounded-br-4xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-16 py-10 px-5"
        >
          <h2 className="mb-8 md:pl-15 font-serif text-2xl md:text-3xl text-center font-semibold tracking-[.2em] text-brand">聯絡我們</h2>
          <ContactForm className="md:max-w-[45vw] mx-auto" />
        </section>
      </div>
    </div>);
}