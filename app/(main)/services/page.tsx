import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import styles from "./page.module.css";

export default function Page() {
  return (
    <>
      <PageBanner
        title="Services"
        subtitle="服務內容"
        backgroundImage="/images/main/about-services.jpg"
      />

      <section className="mx-auto w-[90%] md:w-[75%] max-w-7xl py-16 md:py-20">
        <ul className={styles.serviceNavigation}>
          <li>
            <a className={styles.serviceLink} href="#project-management">
              <span>全案委託管理</span>
            </a>
          </li>
          <li>
            <a className={styles.serviceLink} href="#urban-renewal">
              <span>危老獎勵建築</span>
            </a>
          </li>
          <li>
            <a className={styles.serviceLink} href="#joint-development">
              <span>合建</span>
            </a>
          </li>
        </ul>

        <ul className="grid gap-8">
          <li id="project-management" className="scroll-mt-24 border-b border-gray-600 pb-8">
            <div className="flex mb-4 items-center justify-between">
              <h2 className="font-serif font-semibold text-3xl text-red-900">全案委託管理</h2>
              <Link
                className="inline-block py-2 px-8 font-serif font-semibold text-white bg-red-900 hover:bg-red-800 transition-colors"
                href="/project?type=全案委託管理"
              >
                歷年實績
              </Link>
            </div>
            <p className="mb-4 font-light leading-loose">地主委託建方擔任全案管理者，地主提供土地及重建資金交付信託，基於信託關係以建方名義擔任起造人，建方統籌辦理全案重建計畫之相關事宜並收取服務報酬，不與地主分配重建之房地。</p>
            <h3 className="font-serif font-semibold text-xl mb-2 text-red-800">建方權利與義務</h3>
            <ol className={`${styles.numberedList} ml-8 font-light leading-loose`}>
              <li>擔任全案管理者。</li>
              <li>擔任起造人。</li>
              <li>地主授予建方特別代理權：建方代理地主與第三人簽訂委託契約書，建方負責協調、代理委託、監督所有委任專業廠商及顧問。</li>
              <li>信託管理及處分。</li>
              <li>
                <p>收取服務費用。</p>
                <p>全案總銷金額4%-6% 視個案狀況不同</p>
                <ol className={`list-decimal ml-5`}>
                  <li>地主得以現金支付服務費用。</li>
                  <li>地主得以部分坪數出售折抵服務費用。</li>
                </ol>
              </li>
            </ol>
          </li>
          <li id="urban-renewal" className="scroll-mt-24 border-b border-gray-600 pb-8">
            <div className="flex mb-4 items-center justify-between">
              <h2 className="font-serif font-semibold text-3xl text-red-900">危老獎勵建築</h2>
              <Link
                className="inline-block py-2 px-8 font-serif font-semibold text-white bg-red-900 hover:bg-red-800 transition-colors"
                href="/project?type=危老重建"
              >
                歷年實績
              </Link>
            </div>
            <p className="mb-4 font-light leading-loose">危老重建型態分為自建、委建及純合建，自建是由地主委任建經或顧問公司統包所有開發事宜，委建是地主委任建商或營造廠進行興建工程，純合建則為地主出地、建商蓋屋，完工後依約分屋。</p>
            <p className="font-light leading-loose">「危老條例」全名是「都市危險及老舊建築物加速重建條例」，與都更計畫最大的差異在「加速」，危老條例適用更簡單快速的流程重建老屋，並享有危老條例獎勵，包含容積獎勵、減免賦稅等，吸引許多屋主關注。</p>
          </li>
          <li id="joint-development" className="scroll-mt-24">
            <h2 className="font-serif font-semibold text-3xl mb-4 text-red-900">合建</h2>
            <p className="mb-4 font-light leading-loose">指當事人約定，一方提供土地，而由他方（建築商）建築房屋，並按約定比例分受建造完成之房屋及其基地並簽立合建契約。分為「合建分屋」、「合建分售」、「合建分成」。</p>
            <ol className={`${styles.numberedList} ml-8 font-light leading-loose`}>
              <li>合建分屋：係指一方（建築商）提供資金，他方提供土地，雙方合作興建房屋，而於興建完成後按雙方約定比例分配房屋及應計之土地持分。</li>
              <li>合建分售：係指一方（建築商）提供資金，他方提供土地，雙方合作興建房屋，雙方約定以各自名義分別簽訂房地買賣契約，並各自分得房屋價款及土地價款。</li>
              <li>合建分成：係指一方（建築商）提供資金，他方提供土地，雙方合作興建房屋，雙方共同與承購方訂立房地買賣契約書，雙方再按約定比例分配銷售利益。</li>
            </ol>
          </li>
        </ul>
      </section>
    </>);
}