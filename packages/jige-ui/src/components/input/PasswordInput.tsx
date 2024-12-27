import { InputCore } from 'jige-core'
import { createSignal, Show } from 'solid-js'
import { EyeLine, EyeOffLine } from '../icons'
import { Placeholder } from './Placeholder'

export function PasswordInput(props: {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}) {
  const [showPass, setShowPass] = createSignal(false)
  const [focused, setFocused] = createSignal(false)
  return (
    <div
      class="jg-input-wrapper"
      classList={{
        'jg-input-focused': focused(),
      }}
    >
      <InputCore value={props.value} onChange={props.onChange}>
        <InputCore.Native
          class="jg-input-native"
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
        >
          <Show when={showPass()} fallback={<EyeOffLine />}>
            <EyeLine />
          </Show>
        </button>
      </InputCore>
    </div>
  )
}
