import css from 'sass:./segment.scss'
import { RadioGroupCore, combineStyle } from 'jige-core'
import type { JSX } from 'solid-js'
import { For, createMemo, mergeProps, onMount } from 'solid-js'
import { mountStyle } from 'solid-uses'
import { RadioFormBind } from '../radio-group/Root'
import { Thumb } from './Thumb'
import type { RadioOption } from './types'
import { setData } from '~/common/dataset'
import { createStore, type SetStoreFunction } from 'solid-js/store'

function SegmentWrapper(props: {
  children: JSX.Element
  class?: string
  style?: JSX.CSSProperties
}) {
  const [radioState] = RadioGroupCore.useContext()
  return (
    <div
      class={props.class}
      style={combineStyle(
        {
          opacity: radioState.disabled ? 0.6 : 1,
        },
        props.style,
      )}
    >
      {props.children}
    </div>
  )
}

function Item(props: {
  label: string
  value: string | number
  checked: boolean
  setItemWidths: SetStoreFunction<Record<string | number, number>>
}) {
  let ref!: HTMLButtonElement

  onMount(() => {
    props.setItemWidths(props.value, ref.offsetWidth)
  })
  return (
    <button
      type='button'
      class='jg-segment-item'
      ref={ref}
      tabIndex={-1}
      {...setData({ checked: props.checked })}
    >
      {props.label}
    </button>
  )
}

export function Segment(props: {
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  thumbBg?: string
  railBg?: string
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

  const finalProps = mergeProps(
    {
      thumbBg: 'var(--jg-t-bg1)',
      railBg: 'var(--jg-t-bg3)',
      class: '',
    },
    props,
  )

  const [itemWidths, setItemWidths] = createStore<Record<string | number, number>>({})

  return (
    <RadioGroupCore onChange={props.onChange} value={props.value} disabled={props.disabled}>
      <RadioFormBind propDisabled={props.disabled}>
        <SegmentWrapper
          class={`jg-segment ${finalProps.class}`}
          style={{
            background: finalProps.railBg,
          }}
        >
          <Thumb options={normalizeOptions()} bg={finalProps.thumbBg} itemWidths={itemWidths} />
          <For each={normalizeOptions()}>
            {(item) => (
              <RadioGroupCore.Item value={item.value as any}>
                <RadioGroupCore.ItemNative />
                <RadioGroupCore.ItemControl>
                  {(state) => (
                    <Item
                      label={item.label}
                      checked={state.value === item.value}
                      value={item.value}
                      setItemWidths={setItemWidths}
                    />
                  )}
                </RadioGroupCore.ItemControl>
              </RadioGroupCore.Item>
            )}
          </For>
        </SegmentWrapper>
      </RadioFormBind>
    </RadioGroupCore>
  )
}
