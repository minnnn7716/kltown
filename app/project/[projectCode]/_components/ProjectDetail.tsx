import type { ProjectDetailItem } from "../_data/projectTypes"
import AOSReveal from "@/components/AOSReveal"

export default function ProjectDetail({
  projectDetails
}: {
  projectDetails: ProjectDetailItem[]
}) {
  return (
    <section className="overflow-y-clip mb-20">
      <div className="mx-auto md:max-w-[90vw] xl:max-w-[80vw] 2xl:max-w-[65vw] px-8 md:px-0 text-brand">
        <AOSReveal
          as="dl"
          className="grid grid-cols-1 md:grid-cols-2"
          animation="fade-up"
        >
          {projectDetails.map((item) => (
            <div
              key={item.label}
              className={`grid grid-cols-[7rem_1fr] gap-x-4 items-start py-4 border-b ${item.fullWidth ? "md:col-span-2" : ""
                }`}
            >
              <dt className="font-medium">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </AOSReveal>
      </div>
    </section>
  )
}