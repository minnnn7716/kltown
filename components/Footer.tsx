import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-brand-800 text-white">
      <div className="py-4 px-10 mx-auto flex flex-col md:flex-row justify-between gap-y-3">
        <Link href="/" className="content-center">
          <Image
            src="/images/logo_white.svg"
            width={230}
            height={40}
            alt="共同建設股份有限公司"
          />
        </Link>

        <ul className="md:text-sm font-light md:text-right grid grid-cols-1 gap-y-2">
          <li>電話：02-2701-1926</li>
          <li>傳真：02-2701-1976</li>
          <li>地址：臺北市大安區四維路 94 號 3 樓</li>
        </ul>
      </div>

      <div className="bg-brand-900">
        <p className="text-brand-100 text-sm md:text-xs font-light text-center py-3">
          ©2026 共同建設股份有限公司 KL Town All rights reserved.
        </p>
      </div>
    </footer>
  )
}