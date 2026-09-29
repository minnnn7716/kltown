"use client";

import { type MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useNavigationVisibility } from "@/lib/useNavigationVisibility";

const navLinks = [
  { href: "/about", label: "關於我們" },
  { href: "/project", label: "建案資訊" },
  { href: "/services", label: "服務內容" },
  { href: "/#contact", label: "聯絡我們" },
];

export default function MainNavigation() {
  const pathname = usePathname();

  return <NavigationContent key={pathname} useTrigger={pathname === "/"} />;
}

function NavigationContent({ useTrigger }: { useTrigger: boolean }) {
  const visible = useNavigationVisibility(useTrigger);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    if (currentPath !== "/" || window.location.hash !== "#contact") {
      return;
    }

    const scrollToContact = () => {
      document.getElementById("contact")?.scrollIntoView({ block: "start" });
    };

    const frameId = window.requestAnimationFrame(scrollToContact);
    window.addEventListener("load", scrollToContact, { once: true });
    const timeoutId = window.setTimeout(scrollToContact, 500);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("load", scrollToContact);
      window.clearTimeout(timeoutId);
    };
  }, [currentPath]);

  const isActive = (href: string) =>
    href !== "/#contact" && currentPath.startsWith(href);

  const handlePageLinkClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (currentPath !== "/") {
      event.preventDefault();
      window.location.assign("/#contact");
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 z-10 w-full text-white bg-mist-700 backdrop-blur-[5px] transition-[opacity,color,bg] duration-500 ${visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
          }`}
      >
        <div className="flex items-center justify-between px-4 md:px-10 py-1">
          <h1>
            <Link href="/">
              <Image
                src="/images/logo_white.svg"
                width={257}
                height={40}
                alt="共同建設股份有限公司"
                className="pt-1 pb-2"
              />
            </Link>
          </h1>

          <ul className="hidden md:flex gap-10">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={
                    href === "/#contact"
                      ? handleContactClick
                      : handlePageLinkClick
                  }
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`relative py-3 transition-colors duration-300 hover:text-white/70 after:absolute after:bottom-1 after:left-1/2 after:h-0.5 after:w-3 after:-translate-x-1/2 after:scale-0 after:rounded-full after:bg-current after:transition-transform after:duration-300 hover:after:scale-100 ${isActive(href) ? "text-white after:scale-100" : "text-white/85"
                    }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label={menuOpen ? "關閉選單" : "開啟選單"}
            aria-expanded={menuOpen}
            className="md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <ul
          className={`md:hidden flex flex-col items-center gap-6 overflow-hidden bg-mist-700 transition-[max-height,padding] duration-300 ${menuOpen ? "max-h-96 py-6" : "max-h-0 py-0"
            }`}
        >
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={
                  href === "/#contact"
                    ? (event) => {
                        setMenuOpen(false);
                        handleContactClick(event);
                      }
                    : () => {
                        setMenuOpen(false);
                        handlePageLinkClick();
                      }
                }
                aria-current={isActive(href) ? "page" : undefined}
                className={`relative py-2 transition-colors duration-300 hover:text-white/70 ${isActive(href) ? "text-white" : "text-white/85"
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {!useTrigger && <div aria-hidden="true" className="h-15" />}
    </>
  );
}