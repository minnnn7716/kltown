"use client";

import { useEffect } from "react";

const measurementId = "G-J67B4L9MQX";

declare global {
  interface Window {
    dataLayer: IArguments[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      window.location.hostname !== "www.kltown.com"
    ) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params -- gtag requires the Arguments object.
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId);

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return null;
}