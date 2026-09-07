"use client"

import { useState, useEffect } from "react";

export default function FloatingNavigation() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.querySelector("[data-nav-trigger]");

    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(
          !entry.isIntersecting &&
          entry.boundingClientRect.top < 0
        )
      },
      {
        threshold: 0
      }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  })

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-10 transition-opacity duration-300 ${visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        logo
      </nav>

      <div
        className={`fixed top-1/2 right-0 -translate-1/2 z-10 transition-opacity duration-300 ${visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        CTA
      </div>
    </>
  )
}