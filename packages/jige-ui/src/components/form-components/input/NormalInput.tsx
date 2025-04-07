import { FormCore, InputCore } from 'jige-core'
import { Show, createSignal } from 'solid-js'
import { Form } from '~/components/form'
import { Clearable } from './Clearable'
import { InputWrapper } from './InputWrapper'

export function InputFormBind(props: {
  disabled?: boolean
}) {
  const [state, actions] = InputCore.useContext()

  return (
    <Form.Bind
      propDisabled={props.disabled}
      setDisabled={actions.setDisabled}
      value={state.value}
      setValue={actions.setValue}
      setName={actions.setName}
    >
      {/* biome-ignore lint/complexity/noUselessFragments: <explanation> */}
      <></>
    </Form.Bind>
  )
}

export function NormalInput(props: {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
}) {
  const [focused, setFocused] = createSignal(false)
  const [, fieldCoreActs] = FormCore.useField()
  return (
    <InputCore value={props.value} onChange={props.onChange} disabled={props.disabled}>
      <InputFormBind disabled={props.disabled} />
      <InputWrapper focused={focused()}>
        <InputCore.Native
          class='jg-input-native'
          autocomplete='off'
          type='text'
          {...Form.createNativeComponentAttrs()}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false)
            fieldCoreActs.handleBlur?.()
          }}
          placeholder={props.placeholder}
        />
        <Show when={props.clearable}>
          <Clearable />
        </Show>
      </InputWrapper>
    </InputCore>
  )
}
