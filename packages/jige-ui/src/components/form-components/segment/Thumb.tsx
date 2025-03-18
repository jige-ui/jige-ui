import { RadioGroupCore } from 'jige-core'
import { createMemo } from 'solid-js'
import type { RadioOption } from './types'

export function Thumb(props: {
  options: Exclude<RadioOption, string>[]
  bg: string
  itemWidths: Record<string, number>
}) {
  const state = RadioGroupCore.useContext()[0]
  const sliderX = createMemo(() => {
    const index = props.options.findIndex((option) => option.value === state.value)
    if (index === -1) return 0
    return Object.values(props.itemWidths)
      .slice(0, index)
      .reduce((acc, cur) => acc + cur, 0)
  })

  const width = createMemo(() => props.itemWidths[state.value] - 1 || 0)
  return (
    <div
      class='jg-segment-thumb'
      style={{
        width: `${width()}px`,
        transform: `translateX(${sliderX()}px)`,
        background: props.bg,
      }}
    />
  )
}
