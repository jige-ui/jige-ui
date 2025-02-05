import type { JSX } from 'solid-js'
import type { RadioOption } from './types'
import { combineStyle, RadioGroupCore } from 'jige-core'
import css from 'sass:./segment.scss'
import { createMemo, For, mergeProps } from 'solid-js'
import { mountStyle } from 'solid-uses'
import { Thumb } from './Thumb'

function SegmentWrapper(props: {
  children: JSX.Element
  class?: string
  style?: JSX.CSSProperties
}) {
  const [radioState] = RadioGroupCore.useContext()
  return (
    <div
      class={props.class}
      style={combineStyle({
        opacity: radioState.disabled ? 0.6 : 1,
      }, props.style)}
    >
      {props.children}
    </div>
  )
}

export function Segment(props: {
  options: RadioOption[]
  itemWidth?: number
  value?: string
  onChange?: (value: string) => void
  thumbBg?: string
  railBg?: string
  gap?: number
  class?: string
  thumbClass?: string
  disabled?: boolean
}) {
  mountStyle(css, 'jige-ui-segment')

  const normalizeOptions = createMemo(() => {
    return props.options.map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option }
      }
      return option
    })
  })

  const finalProps = mergeProps({
    itemWidth: 65,
    thumbBg: 'var(--jg-t-bg1)',
    railBg: 'var(--jg-t-bg3)',
    gap: 4,
    class: '',
  }, props)

  return (
    <RadioGroupCore
      onChange={props.onChange}
      value={props.value}
      disabled={props.disabled}
    >
      <SegmentWrapper
        class={`jg-segment ${finalProps.class}`}

        style={{
          padding: `${finalProps.gap}px`,
          background: finalProps.railBg,
        }}
      >
        <Thumb width={finalProps.itemWidth} options={normalizeOptions()} gap={finalProps.gap} bg={finalProps.thumbBg} />
        <For each={normalizeOptions()}>
          {item => (
            <RadioGroupCore.Item value={item.value as any}>
              <RadioGroupCore.ItemNative />
              <RadioGroupCore.ItemControl>
                <div
                  class="jg-segment-item"
                  style={{
                    width: `${finalProps.itemWidth}px`,
                    position: 'relative',
                  }}
                >
                  {item.label}
                </div>
              </RadioGroupCore.ItemControl>
            </RadioGroupCore.Item>
          )}
        </For>
      </SegmentWrapper>
    </RadioGroupCore>
  )
}
