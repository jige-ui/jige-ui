import { mergeRefs } from '@solid-primitives/refs'
import { FormCore, InputCore, ScrollbarCore, combineStyle, runSolidEventHandler } from 'jige-core'
import { throttle } from 'jige-utils'
import { createSignal, splitProps } from 'solid-js'
import { dataIf } from '~/common/dataset'
import { Form } from '~/components/form'
import { InputFormBind } from './NormalInput'
import type { JigeInputProps } from './types'

function ScrollInput(
  props: Omit<JigeInputProps, 'type'> & {
    setFocused: (focused: boolean) => void
  },
) {
  const [localProps, otherProps] = splitProps(props, [
    'value',
    'onChange',
    'disabled',
    'clearable',
    'onFocus',
    'onBlur',
    'class',
    'style',
    'disableBind',
    'readonly',
    'suffix',
    'size',
    'setFocused',
    'ref',
    'onScroll',
    'onScrollEnd',
  ])
  const [state, actions] = ScrollbarCore.useContext()
  const [, fieldCoreActs] = FormCore.useField()
  const throttleSetValue = throttle(actions.setValue, 30)

  return (
    <InputCore.Native
      {...(otherProps as any)}
      {...Form.createNativeComponentAttrs()}
      type='textarea'
      ref={
        mergeRefs(localProps.ref, (el) => {
          actions.setState('refContent', el)
        }) as any
      }
      autocomplete='off'
      class={['jg-input-native', localProps.class].join(' ')}
      style={combineStyle(
        {
          position: 'relative',
          overflow: 'auto',
          'scrollbar-width': 'none',
          height: state.height,
          'max-height': state.maxHeight,
          'user-select': state.isDragging ? 'none' : undefined,
          resize: 'none',
          width: '100%',
        },
        localProps.style,
      )}
      readonly={props.readonly}
      onScroll={(e: Event) => {
        throttleSetValue()
        runSolidEventHandler(e, localProps.onScroll)
      }}
      onScrollEnd={(e: Event) => {
        actions.setValue()
        runSolidEventHandler(e, localProps.onScrollEnd)
      }}
      onFocus={(e: Event) => {
        localProps.setFocused(true)
        runSolidEventHandler(e, localProps.onFocus)
      }}
      onBlur={(e: Event) => {
        localProps.setFocused(false)
        fieldCoreActs.handleBlur()
        runSolidEventHandler(e, localProps.onBlur)
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

export function Textarea(props: Omit<JigeInputProps, 'type'>) {
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
