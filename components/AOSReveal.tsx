"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";

type AOSRevealProps = {
  as: "div" | "section" | "h2" | "h3" | "p" | "dl" | "ul";
  animation: string;
  delay?: number;
  duration?: number;
  offset?: number;
  className?: string;
  children: ReactNode;
};

let refreshFrame: number | null = null;

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function scheduleAOSRefresh() {
  if (refreshFrame !== null) return;

  refreshFrame = window.requestAnimationFrame(() => {
    refreshFrame = null;
    void import("aos").then(({ default: AOS }) => AOS.refreshHard());
  });
}

export default function AOSReveal({
  as: Tag,
  animation,
  delay,
  duration,
  offset,
  className,
  children,
}: AOSRevealProps) {
  const isMounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (isMounted) scheduleAOSRefresh();
  }, [isMounted]);

  return (
    <Tag
      className={className}
      data-aos={isMounted ? animation : undefined}
      data-aos-delay={isMounted ? delay : undefined}
      data-aos-duration={isMounted ? duration : undefined}
      data-aos-offset={isMounted ? offset : undefined}
    >
      {children}
    </Tag>
  );
}