import css from 'sass:./segment.scss'
import { RadioGroupCore } from 'jige-core'
import type { JSX } from 'solid-js'
import { For, createMemo, mergeProps, onMount } from 'solid-js'
import { type SetStoreFunction, createStore } from 'solid-js/store'
import { mountStyle } from 'solid-uses'
import { setData } from '~/common/dataset'
import { Form } from '~/components/form'
import { RadioFormBind } from '../radio-group/Root'
import { Thumb } from './Thumb'
import type { RadioOption } from './types'

function SegmentWrapper(props: {
  children: JSX.Element
  class?: string
  style?: JSX.CSSProperties
}) {
  const [radioState] = RadioGroupCore.useContext()
  return (
    <div class={props.class} style={props.style} {...setData({ disabled: radioState.disabled })}>
      {props.children}
    </div>
  )
}

function Item(props: {
  label: string
  value: string | number
  checked: boolean
  options: { value: string | number }[]
  setItemWidths: SetStoreFunction<Record<string | number, number>>
}) {
  let ref!: HTMLButtonElement
  const state = RadioGroupCore.useContext()[0]

  onMount(() => {
    props.setItemWidths(props.value, ref.offsetWidth)
  })
  const hideDivider = createMemo(() => {
    if (props.checked) return true
    const index = props.options.findIndex((option) => option.value === state.value)
    return props.options[index + 1]?.value === props.value
  })
  return (
    <button
      type='button'
      class='jg-segment-item'
      classList={{
        'hide-divider': hideDivider(),
      }}
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
                <RadioGroupCore.ItemNative {...Form.createNativeComponentAttrs()} />
                <RadioGroupCore.ItemControl>
                  {(state) => (
                    <Item
                      label={item.label}
                      checked={state.value === item.value}
                      value={item.value}
                      setItemWidths={setItemWidths}
                      options={normalizeOptions()}
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
