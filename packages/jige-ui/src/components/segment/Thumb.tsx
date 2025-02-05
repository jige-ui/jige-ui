import type { RadioOption } from './types'
import { RadioGroupCore } from 'jige-core'
import { createMemo } from 'solid-js'

export function Thumb(props: {
  options: Exclude<RadioOption, string>[]
  width: number
  gap: number
  bg: string
}) {
  const state = RadioGroupCore.useContext()[0]
  const sliderX = createMemo(() => {
    const index = props.options.findIndex(option => option.value === state.value)
    return index * props.width
  })
  return (
    <div
      class="jg-segment-thumb"
      style={{
        width: `${props.width}px`,
        transform: `translateX(${sliderX()}px)`,
        top: `${props.gap}px`,
        bottom: `${props.gap}px`,
        left: `${props.gap}px`,
        background: props.bg,
      }}
    />
  )
}
