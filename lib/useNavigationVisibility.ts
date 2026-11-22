"use client";

import { useEffect, useState } from "react";

export function useNavigationVisibility(useTrigger: boolean) {
  const [visible, setVisible] = useState(!useTrigger);

  useEffect(() => {
    if (!useTrigger) return;

    const sentinel = document.querySelector("[data-nav-trigger]");

    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [useTrigger]);

  return visible;
}