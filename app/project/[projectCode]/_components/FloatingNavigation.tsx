"use client"

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, House } from "lucide-react";
import { useNavigationVisibility } from "@/lib/useNavigationVisibility";

export default function FloatingNavigation() {
  const visible = useNavigationVisibility(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="頁面快捷操作"
      className={`bg-brand fixed top-1/2 right-0 z-10 transition-opacity duration-300 ${visible
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
        }`}
    >
      <Link
        href="/"
        scroll={true}
        className="flex flex-col items-center gap-1 px-1 py-4 hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <Image
          src="/images/logo_duck.svg"
          alt="共同建設股份有限公司"
          width={30}
          height={30}
        />
      </Link>
      <Link
        href="#contact"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("contact")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
        className="flex flex-col items-center justify-center gap-1 px-2 py-2 text-sm text-white transition-colors hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <House aria-hidden="true" size={25} strokeWidth={1} />
        <span className="text-xs">Reserve</span>
      </Link>
      <button
        type="button"
        onClick={scrollToTop}
        className="w-full flex flex-col items-center justify-center px-1 py-2 text-sm text-white transition-colors hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ArrowUp aria-hidden="true" size={25} strokeWidth={1} />
        <span className="text-xs">Top</span>
      </button>
    </nav>
  )
}