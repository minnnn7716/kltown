"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) {
      return;
    }

    const updateVisibility = () => {
      const footerIsBelowViewport =
        footer.getBoundingClientRect().top >= window.innerHeight;
      setVisible(window.scrollY > 240 && footerIsBelowViewport);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="回到頁首"
      title="回到頁首"
      onClick={scrollToTop}
      className={`fixed right-5 bottom-5 z-20 flex size-9 items-center justify-center border border-white/50 bg-mist-700/90 text-white shadow-lg backdrop-blur-sm transition-[opacity,transform] duration-300 hover:bg-mist-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${visible
        ? "pointer-events-auto translate-y-0 opacity-100"
        : "pointer-events-none translate-y-3 opacity-0"
        }`}
    >
      <ArrowUp aria-hidden="true" size={18} />
    </button>
  );
}
