import { InputCore } from 'jige-core'
import { createSignal, Show } from 'solid-js'
import { EyeLine, EyeOffLine } from '../icons'
import { InputWrapper } from './InputWrapper'
import { Placeholder } from './Placeholder'

export function PasswordInput(props: {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
}) {
  const [showPass, setShowPass] = createSignal(false)
  const [focused, setFocused] = createSignal(false)

  return (
    <InputCore value={props.value} onChange={props.onChange} disabled={props.disabled}>
      <InputWrapper focused={focused()}>
        <InputCore.Native
          class="jg-input-native"
          autocomplete="off"
          type={showPass() ? 'text' : 'password'}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Placeholder placeholder={props.placeholder || ''} />
        <button
          type="button"
          aria-label="Toggle password visibility"
          class="jg-input-suffix"
          onClick={() => {
            setShowPass(!showPass())
          }}
          onMouseDown={(e) => { e.preventDefault() }}
          onMouseUp={(e) => { e.preventDefault() }}
        >
          <Show when={showPass()} fallback={<EyeOffLine />}>
            <EyeLine />
          </Show>
        </button>
      </InputWrapper>
    </InputCore>
  )
}
