import Image from "next/image"
import { withBasePath } from "@/lib/withBasePath"

export default function Footer() {
  return (
    <footer className="bg-brand-900">
      <Image
        src={`${withBasePath("/images/logo_white.svg")}`}
        width={230}
        height={40}
        alt="共同建設股份有限公司"
      />

      <ul>
        <li>電話 02-2701-1926</li>
        <li>傳真 02-2701-1976</li>
        <li>地址 臺北市大安區四維路 94 號 3 樓</li>
      </ul>

      ©2026 共同建設股份有限公司 KL Town All rights reserved.
    </footer>
  )
}