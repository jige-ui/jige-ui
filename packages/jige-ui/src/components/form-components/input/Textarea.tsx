import { FormCore, InputCore, ScrollbarCore } from 'jige-core'
import { throttle } from 'radash'
import { createSignal } from 'solid-js'
import { dataIf } from '~/common/dataset'
import { Form } from '~/components/form'
import { InputFormBind } from './NormalInput'

function ScrollInput(props: {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  readonly?: boolean
  setFocused: (focused: boolean) => void
}) {
  const [state, actions] = ScrollbarCore.useContext()

  const [, fieldCoreActs] = FormCore.useField()

  const throttleSetValue = throttle({ interval: 30 }, actions.setValue)

  return (
    <InputCore.Native
      type='textarea'
      {...Form.createNativeComponentAttrs()}
      ref={(el: HTMLElement) => {
        actions.setState('refContent', el)
      }}
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
      readonly={props.readonly}
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

function ScrollBar(props: { children: any; focused: boolean; readonly?: boolean }) {
  const [hidden, setHidden] = createSignal(false)
  const [state] = InputCore.useContext()
  return (
    <ScrollbarCore
      class='jg-input-wrapper'
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
      data-disabled={dataIf(state.disabled)}
      data-focused={dataIf(props.focused)}
      data-readonly={dataIf(props.readonly)}
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
  disableBind?: boolean
  readonly?: boolean
}) {
  const [focused, setFocused] = createSignal(false)
  return (
    <InputCore value={props.value} onChange={props.onChange} disabled={props.disabled}>
      <InputFormBind disabled={props.disabled} disableBind={!!props.disableBind} />
      <ScrollBar focused={focused()} readonly={props.readonly}>
        <ScrollInput {...props} setFocused={setFocused} />
      </ScrollBar>
    </InputCore>
  )
}
