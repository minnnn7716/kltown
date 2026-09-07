export type ProjectDetailItem = {
  label: string
  value: string
  fullWidth?: boolean
}

export function ProjectDetail({
  projectDetails
}: {
  projectDetails: ProjectDetailItem[]
}) {
  return (
    <section className="overflow-y-clip">
      <div className="mx-auto md:max-w-[80vw] 2xl:max-w-[65vw] py-22 px-8 text-brand">
        <dl
          className="grid grid-cols-1 md:grid-cols-2"
          data-aos="fade-up"
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
        </dl>
      </div>
    </section>
  )
}