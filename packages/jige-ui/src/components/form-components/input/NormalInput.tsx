import { FormCore, InputCore, runSolidEventHandler, undefinedOr } from 'jige-core'
import { type JSX, createSignal, splitProps } from 'solid-js'
import { Form } from '~/components/form'
import { ClearableSuffix } from './ClearableSuffix'
import { InputWrapper } from './InputWrapper'
import type { JigeInputProps } from './types'

export function InputFormBind(props: {
  disabled?: boolean
  disableBind: boolean
}) {
  const [state, actions] = InputCore.useContext()

  return (
    <Form.Bind
      propDisabled={props.disabled}
      setDisabled={(d) => {
        actions.setState('disabled', d)
      }}
      value={state.value}
      setValue={actions.setValue}
      setName={(n) => {
        actions.setState('name', n)
      }}
      disableBind={props.disableBind}
    >
      {/* biome-ignore lint/complexity/noUselessFragments: <explanation> */}
      <></>
    </Form.Bind>
  )
}

export function Suffix(props: {
  clearable: boolean
  suffix?: JSX.Element
}) {
  const [state, actions] = InputCore.useContext()

  return (
    <ClearableSuffix
      showClearable={props.clearable && !!state.value}
      onClear={() => {
        actions.setValue('')
      }}
    />
  )
}

export function NormalInput(props: Omit<JigeInputProps, 'type'>) {
  const [focused, setFocused] = createSignal(false)
  const [, fieldCoreActs] = FormCore.useField()
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
  ])
  return (
    <InputCore
      value={localProps.value}
      onChange={localProps.onChange}
      disabled={localProps.disabled}
    >
      <InputFormBind disabled={localProps.disabled} disableBind={!!localProps.disableBind} />
      <InputWrapper
        focused={focused()}
        readonly={localProps.readonly || false}
        size={undefinedOr(localProps.size, 'medium')}
      >
        <InputCore.Native
          {...(otherProps as any)}
          class='jg-input-native'
          autocomplete='off'
          type='text'
          {...Form.createNativeComponentAttrs()}
          onFocus={(e: any) => {
            setFocused(true)
            runSolidEventHandler(e, localProps.onFocus)
          }}
          onBlur={(e: any) => {
            setFocused(false)
            fieldCoreActs.handleBlur?.()
            runSolidEventHandler(e, localProps.onBlur)
          }}
          readonly={localProps.readonly}
        />
        <Suffix clearable={undefinedOr(localProps.clearable, true)} suffix={localProps.suffix} />
      </InputWrapper>
    </InputCore>
  )
}
