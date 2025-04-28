import { FormCore, InputCore, runSolidEventHandler } from 'jige-core'
import { Show, createSignal, splitProps } from 'solid-js'
import { Form } from '~/components/form'
import { Clearable } from './Clearable'
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
      setDisabled={actions.setDisabled}
      value={state.value}
      setValue={actions.setValue}
      setName={actions.setName}
      disableBind={props.disableBind}
    >
      {/* biome-ignore lint/complexity/noUselessFragments: <explanation> */}
      <></>
    </Form.Bind>
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
  ])
  return (
    <InputCore
      value={localProps.value}
      onChange={localProps.onChange}
      disabled={localProps.disabled}
    >
      <InputFormBind disabled={localProps.disabled} disableBind={!!localProps.disableBind} />
      <InputWrapper focused={focused()} readonly={localProps.readonly || false}>
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
        <Show when={localProps.clearable}>
          <Clearable />
        </Show>
      </InputWrapper>
    </InputCore>
  )
}
