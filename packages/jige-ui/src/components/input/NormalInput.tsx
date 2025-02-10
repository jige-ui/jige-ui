import { InputCore } from 'jige-core'
import { createSignal } from 'solid-js'
import { Placeholder } from './Placeholder'

export function NormalInput(props: {
  value?: string
  onChange?: (value: string) => void
  type?: 'text' | 'password' | 'number'
  placeholder?: string
  disabled?: boolean
}) {
  const [focused, setFocused] = createSignal(false)
  return (
    <div
      class="jg-input-wrapper"
      classList={{
        'jg-input-focused': focused(),
      }}
    >
      <InputCore value={props.value} onChange={props.onChange} disabled={props.disabled}>
        <InputCore.Native
          class="jg-input-native"
          type={props.type || 'text'}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Placeholder placeholder={props.placeholder || ''} />
      </InputCore>
    </div>
  )
}
