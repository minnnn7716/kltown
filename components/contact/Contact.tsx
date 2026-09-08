"use client";

import { useState } from "react";
import { ContactForm } from "./ContactForm"
import { type ProjectCode, projectRegistry } from "@/app/project/[projectCode]/_data/projectRegistry";

type ContactProps = {
  projectCode: ProjectCode;
}

export default function Contact({
  projectCode
}: ContactProps) {
  const project = projectRegistry[projectCode];
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section className={`md:min-h-screen 2xl:min-h-[70svh] grid grid-cols-1 md:grid-cols-2`}>
      <div className="relative min-h-80 md:min-h-0">
        {!mapLoaded && (
          <div className="absolute inset-0 bg-brand-200 animate-pulse" />
        )}
        {
          project.googleMapSrc && (
            <iframe
              src={project.googleMapSrc}
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
        <ContactForm
          className="grid grid-cols-1 gap-y-3 text-brand"
          projectCode={projectCode}
          themeClassName={project.themeClassName}
        />
      </div>
    </section>
  )
}