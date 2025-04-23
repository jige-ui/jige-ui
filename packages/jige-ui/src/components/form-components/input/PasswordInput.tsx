import { FormCore, InputCore, runSolidEventHandler } from 'jige-core'
import { Show, createSignal, splitProps } from 'solid-js'
import { Form } from '~/components/form'
import { EyeLine, EyeOffLine } from '../../icons'
import { Clearable } from './Clearable'
import { InputWrapper } from './InputWrapper'
import { InputFormBind } from './NormalInput'
import type { JigeInputProps } from './types'

export function PasswordInput(props: Omit<JigeInputProps, 'type'>) {
  const [showPass, setShowPass] = createSignal(false)
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
  ])

  return (
    <InputCore
      value={localProps.value}
      onChange={localProps.onChange}
      disabled={localProps.disabled}
    >
      <InputFormBind disabled={localProps.disabled} />
      <InputWrapper focused={focused()}>
        <InputCore.Native
          {...(otherProps as any)}
          {...Form.createNativeComponentAttrs()}
          class='jg-input-native'
          autocomplete='off'
          type={showPass() ? 'text' : 'password'}
          onFocus={(e: any) => {
            setFocused(true)
            runSolidEventHandler(e, localProps.onFocus)
          }}
          onBlur={(e: any) => {
            setFocused(false)
            fieldCoreActs.handleBlur?.()
            runSolidEventHandler(e, props.onBlur)
          }}
        />
        <Show when={localProps.clearable}>
          <Clearable hasSuffix />
        </Show>
        <button
          type='button'
          aria-label='Toggle password visibility'
          class='jg-input-suffix'
          onClick={() => {
            setShowPass(!showPass())
          }}
          onMouseDown={(e) => {
            e.preventDefault()
          }}
          onMouseUp={(e) => {
            e.preventDefault()
          }}
        >
          <Show when={showPass()} fallback={<EyeOffLine />}>
            <EyeLine />
          </Show>
        </button>
      </InputWrapper>
    </InputCore>
  )
}
