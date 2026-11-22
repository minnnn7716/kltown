"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "./GlobalLoading.module.css";

function waitForPageReady(): Promise<void> {
  const docPromise = new Promise<void>((resolve) => {
    if (typeof document === "undefined" || document.readyState === "complete") {
      resolve();
    } else {
      window.addEventListener("load", () => resolve(), { once: true });
    }
  });

  const fontsPromise =
    typeof document !== "undefined" && "fonts" in document
      ? document.fonts.ready.then(() => {}).catch(() => {})
      : Promise.resolve();

  const imagesPromise = new Promise<void>((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    requestAnimationFrame(() => {
      const imgElements = Array.from(document.querySelectorAll<HTMLImageElement>("img"));

      // 檢查帶有背景圖（如 PageBanner）的元素
      const bannerElements = Array.from(
        document.querySelectorAll<HTMLElement>("[style*='--banner-image'], [style*='background-image']")
      );
      const bgImgElements: HTMLImageElement[] = [];
      bannerElements.forEach((el) => {
        const style = el.getAttribute("style") || "";
        const match = style.match(/url\(["']?([^"')]+)["']?\)/);
        if (match && match[1]) {
          const bgImg = new window.Image();
          bgImg.src = match[1];
          bgImgElements.push(bgImg);
        }
      });

      const allImages = [...imgElements, ...bgImgElements];
      const viewportHeight = window.innerHeight || 800;

      // 僅等待首屏或接近首屏（1.5 螢幕高度內）的圖片與非 lazy 圖片
      const criticalImages = allImages.filter((img) => {
        if (img.loading === "lazy") {
          const rect = img.getBoundingClientRect();
          if (rect.top > viewportHeight * 1.5) {
            return false;
          }
        }
        return true;
      });

      const pendingImages = criticalImages.filter((img) => !img.complete);

      if (pendingImages.length === 0) {
        resolve();
        return;
      }

      let remaining = pendingImages.length;
      const onDone = () => {
        remaining -= 1;
        if (remaining <= 0) {
          resolve();
        }
      };

      pendingImages.forEach((img) => {
        if (img.complete) {
          onDone();
        } else {
          img.addEventListener("load", onDone, { once: true });
          img.addEventListener("error", onDone, { once: true });
        }
      });
    });
  });

  // 最長等待 2 秒以防網路異常卡死，最短保證 300ms 動畫流暢不閃跳
  const safetyTimeout = new Promise<void>((resolve) => setTimeout(resolve, 2000));
  const minDisplay = new Promise<void>((resolve) => setTimeout(resolve, 300));

  return Promise.all([
    Promise.race([Promise.all([docPromise, fontsPromise, imagesPromise]), safetyTimeout]),
    minDisplay,
  ]).then(() => {});
}

function refreshAOS() {
  if (typeof window !== "undefined") {
    import("aos")
      .then((module) => {
        module.default.refresh();
      })
      .catch(() => {});
  }
}

export default function GlobalLoading() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const prevPathRef = useRef(pathname);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startLoading = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setIsVisible(true);
    setIsLoading(true);
  };

  const finishLoading = () => {
    waitForPageReady().then(() => {
      setIsLoading(false);
      hideTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        refreshAOS();
      }, 450);
    });
  };

  // 初次載入
  useEffect(() => {
    finishLoading();

    // 監聽站內連結點擊，提早觸發 loading 減緩切換時的白屏或圖檔閃爍
    const handleAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      if (target.closest("[data-carousel-dragged]")) return;

      if (
        target.target === "_blank" ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      ) {
        return;
      }

      const href = target.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      try {
        const nextUrl = new URL(target.href, window.location.href);
        if (nextUrl.origin !== window.location.origin) return;

        // 同頁面錨點導航不觸發
        if (
          nextUrl.pathname === window.location.pathname &&
          nextUrl.search === window.location.search
        ) {
          return;
        }

        startLoading();
      } catch {
        // 忽略無效 URL
      }
    };

    const handlePopState = () => {
      startLoading();
    };

    window.addEventListener("click", handleAnchorClick, { capture: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("click", handleAnchorClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  // 當路徑改變時，等待新頁面圖片加載完畢後平滑淡出
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      finishLoading();
    }
  }, [pathname]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-hidden={!isLoading}
      role="status"
      aria-label="頁面載入中"
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-[#edf0f4] transition-opacity duration-400 ease-out ${
        isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <span className={styles.loader} />
    </div>
  );
}
