import { createElementSize } from '@solid-primitives/resize-observer'
import { FormCore, InputCore, ScrollbarCore } from 'jige-core'
import { throttle } from 'radash'
import { createSignal, onMount } from 'solid-js'
import { watch } from 'solid-uses'
import { setData } from '~/common/dataset'
import { Form } from '~/components/form'
import { InputFormBind } from './NormalInput'

function ScrollInput(props: {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  setFocused: (focused: boolean) => void
}) {
  const [state, actions] = ScrollbarCore.useContext()

  onMount(() => {
    const size = createElementSize(() => state.refContent)
    watch(
      [() => size.height, () => size.width],
      throttle({ interval: 35 }, () => {
        actions.setValue()
      }),
    )
  })

  const [, fieldCoreActs] = FormCore.useField()

  const throttleSetValue = throttle({ interval: 30 }, actions.setValue)

  return (
    <InputCore.Native
      type='textarea'
      {...Form.createNativeComponentAttrs()}
      ref={actions.setRefContent}
      autocomplete='off'
      placeholder={props.placeholder}
      class='jg-input-native'
      style={{
        position: 'relative',
        overflow: 'auto',
        'scrollbar-width': 'none',
        height: state.height,
        'max-height': state.maxHeight,
        'user-select': state.isDragging ? 'none' : undefined,
        resize: 'none',
        width: '100%',
      }}
      onScroll={() => {
        throttleSetValue()
      }}
      onScrollEnd={() => {
        actions.setValue()
      }}
      onFocus={() => props.setFocused(true)}
      onBlur={() => {
        props.setFocused(false)
        fieldCoreActs.handleBlur?.()
      }}
    />
  )
}

function ScrollBar(props: { children: any; focused: boolean }) {
  const [hidden, setHidden] = createSignal(false)
  const [state] = InputCore.useContext()
  return (
    <ScrollbarCore
      class='jg-input-wrapper'
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
      {...setData({
        disabled: state.disabled,
        focused: props.focused,
      })}
    >
      {props.children}
      <ScrollbarCore.Bar
        type='vertical'
        style={{
          position: 'absolute',
          width: '6px',
          top: '4px',
          right: '3px',
          bottom: '4px',
          background: 'transparent',
          transition: 'opacity 300ms',
          opacity: hidden() ? '0' : '.7',
        }}
      >
        <ScrollbarCore.Thumb
          type='vertical'
          style={{
            background: 'var(--jg-t-hl-lighter)',
            cursor: 'pointer',
            'border-radius': '6px',
            transition: 'all 30ms',
          }}
        />
      </ScrollbarCore.Bar>
    </ScrollbarCore>
  )
}

export function Textarea(props: {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
}) {
  const [focused, setFocused] = createSignal(false)
  return (
    <InputCore value={props.value} onChange={props.onChange} disabled={props.disabled}>
      <InputFormBind disabled={props.disabled} />
      <ScrollBar focused={focused()}>
        <ScrollInput {...props} setFocused={setFocused} />
      </ScrollBar>
    </InputCore>
  )
}
