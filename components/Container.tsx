export default function Container({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto md:max-w-[80vw] 2xl:max-w-[65vw] py-22 px-8">
      {children}
    </div>
  )
}