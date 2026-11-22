"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { orderedProjectCodes, projectRegistry, type ProjectCode } from "@/app/project/[projectCode]/_data/projectRegistry";
import type { ProjectConfig } from "@/app/project/[projectCode]/_data/projectTypes";
import AOSReveal from "@/components/AOSReveal";

const portfolioProjectCodes = orderedProjectCodes;
const projectTypes: ProjectConfig["type"][] = ["自地自建", "全案委託管理", "危老重建"];

function PortfolioContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const initialType = projectTypes.includes(type as ProjectConfig["type"])
    ? (type as ProjectConfig["type"])
    : null;
  const [selectedType, setSelectedType] = useState<ProjectConfig["type"] | null>(initialType);
  const [failedImageCodes, setFailedImageCodes] = useState<Set<ProjectCode>>(
    () => new Set(),
  );

  const filteredProjectCodes = selectedType
    ? portfolioProjectCodes.filter(
      (projectCode) => projectRegistry[projectCode].type === selectedType,
    )
    : portfolioProjectCodes;

  return (
    <main className="noiseBackground bg-linear-to-b from-brand-bg-200 to-brand-bg-100">
      <section className="mx-auto w-[90%] md:w-[75%] max-w-7xl py-16 md:py-25">
        <AOSReveal
          as="div"
          className="mb-8 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end"
          animation="fade-up"
        >
          <div>
            <h1 className="mb-2 font-aboreto text-5xl md:text-6xl">Projects</h1>
            <p className="font-serif text-2xl font-medium tracking-[.2em]">建案資訊</p>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-serif text-lg">
            <li>
              <button
                type="button"
                onClick={() => setSelectedType(null)}
                className={`border-b pb-1 transition-colors ${selectedType === null
                    ? "border-brand-text-900 text-brand-text-900"
                    : "border-transparent text-brand-text-500 hover:border-brand-text-500"
                  }`}
                aria-pressed={selectedType === null}
              >
                全部
              </button>
            </li>
            {projectTypes.map((projectType) => (
              <li key={projectType}>
                <button
                  type="button"
                  onClick={() => setSelectedType(projectType)}
                  className={`border-b pb-1 transition-colors ${selectedType === projectType
                      ? "border-brand-text-900 text-brand-text-900"
                      : "border-transparent text-brand-text-500 hover:border-brand-text-500"
                    }`}
                  aria-pressed={selectedType === projectType}
                >
                  {projectType}
                </button>
              </li>
            ))}
          </ul>
        </AOSReveal>

        <AOSReveal
          as="ul"
          className="grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 lg:grid-cols-3"
          animation="fade-up"
          delay={500}
        >
          {filteredProjectCodes.map((projectCode) => {
            const project = projectRegistry[projectCode];

            return (
              <li key={projectCode} className="overflow-hidden">
                <Link href={`/project/${projectCode}`} className="block" target="_blank">
                  <Image
                    src={
                      failedImageCodes.has(projectCode)
                        ? "/images/main/portfolio/NewProject.webp"
                        : `/images/main/portfolio/${projectCode}.webp`
                    }
                    width={460}
                    height={560}
                    alt={project.name}
                    className="block w-full transition-transform duration-500 hover:scale-105"
                    onError={() => {
                      setFailedImageCodes((current) => {
                        if (current.has(projectCode)) return current;
                        return new Set(current).add(projectCode);
                      });
                    }}
                  />
                </Link>
              </li>
            );
          })}
        </AOSReveal>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense>
      <PortfolioContent />
    </Suspense>
  );
}