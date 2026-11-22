import { useEffect, useState } from "react"
import { EmblaCarouselType } from "embla-carousel"

type UseSelectedSnapDisplayType = {
  selectedSnap: number;
  snapCount: number;
}

export function useSelectedSnapDisplay(
  emblaApi: EmblaCarouselType | undefined
): UseSelectedSnapDisplayType {
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const updateScrollSnapState = (emblaApi: EmblaCarouselType) => {
      setSnapCount(emblaApi.scrollSnapList().length)
      setSelectedSnap(emblaApi.selectedScrollSnap())
    }

    updateScrollSnapState(emblaApi)
    emblaApi.on('select', updateScrollSnapState)
    emblaApi.on('reInit', updateScrollSnapState)
  }, [emblaApi])

  return {
    selectedSnap,
    snapCount
  }
}

type PropType = {
  selectedSnap: number
  snapCount: number
}

export const SelectedSnapDisplay = (props: PropType) => {
  const  { selectedSnap, snapCount } = props

  return (
    <div className="font-extralight text-2xl">
      <span className="font-light">{selectedSnap + 1}</span>
      <span className="px-2 pb-1 text-xl">/</span>
      <span>{snapCount}</span>
    </div>
  )
}