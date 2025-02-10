import { InputCore } from 'jige-core'
import { createSignal } from 'solid-js'
import { InputWrapper } from './InputWrapper'
import { Placeholder } from './Placeholder'

export function NormalInput(props: {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
}) {
  const [focused, setFocused] = createSignal(false)
  return (
    <InputCore value={props.value} onChange={props.onChange} disabled={props.disabled}>
      <InputWrapper focused={focused()}>
        <InputCore.Native
          class="jg-input-native"
          autocomplete="off"
          type="text"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Placeholder placeholder={props.placeholder || ''} />
      </InputWrapper>
    </InputCore>
  )
}
