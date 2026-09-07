"use client";

import { useState } from "react";
import { ContactForm } from "./ContactForm"
import { useLandingInfo } from "../provider/LandingInfoProvider";
import { projectList } from "@/data/projectList";

export function Contact() {
  const landingInfo = useLandingInfo();
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section className={`md:min-h-screen 2xl:min-h-[70svh] grid grid-cols-1 md:grid-cols-2`}>
      <div className="relative min-h-80 md:min-h-0">
        {!mapLoaded && (
          <div className="absolute inset-0 bg-brand-200 animate-pulse" />
        )}
        {
          landingInfo?.projectCode && (
            <iframe
              src={projectList[landingInfo?.projectCode].googleMapSrc}
              className={`w-full h-full transition-opacity ease-in duration-800  ${mapLoaded ? "opacity-100" : "opacity-0"}`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setMapLoaded(true)}
            />
          )
        }
      </div>
      <div className="py-15 md:py-4 content-center mx-auto w-[90%] md:w-[70%]">
        <h3 className="mb-8 md:pl-15 font-serif text-3xl text-center font-semibold tracking-[.2em] text-brand">預約鑑賞</h3>
        <ContactForm className="grid grid-cols-1 gap-y-3 text-brand" />
      </div>
    </section>
  )
}