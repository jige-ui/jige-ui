import { FormCore, InputCore, runSolidEventHandler, undefinedOr } from 'jige-core'
import { Show, createSignal, splitProps } from 'solid-js'
import { Form } from '~/components/form'
import IconFluentEye24Regular from '~icons/fluent/eye-24-regular'
import IconFluentEyeOff24Filled from '~icons/fluent/eye-off-24-filled'
import { InputWrapper } from './InputWrapper'
import { InputFormBind } from './NormalInput'
import type { JigeInputProps } from './types'

function VisibleSwitcher(props: {
  visible: boolean
  onVisibleChange: (visible: boolean) => void
}) {
  const [state] = InputCore.useContext()

  return (
    <Show when={!!state.value}>
      <button
        type='button'
        aria-label='Toggle password visibility'
        class='jg-input-password-switcher'
        onClick={() => {
          props.onVisibleChange(!props.visible)
        }}
        onMouseDown={(e) => {
          e.preventDefault()
        }}
        onMouseUp={(e) => {
          e.preventDefault()
        }}
      >
        <Show when={props.visible} fallback={<IconFluentEye24Regular />}>
          <IconFluentEyeOff24Filled />
        </Show>
      </button>
    </Show>
  )
}

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
    'disableBind',
    'readonly',
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
          readonly={localProps.readonly}
        />
        <VisibleSwitcher visible={showPass()} onVisibleChange={setShowPass} />
      </InputWrapper>
    </InputCore>
  )
}
