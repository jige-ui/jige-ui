import { FormCore } from 'jige-core'
import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import { isDef } from '~/common/types'
import { formContext } from './context'
import { Show } from 'solid-js'

function BindCore(props: {
  isBlur?: boolean
  propDisabled: boolean | undefined
  setDisabled: (disabled: boolean) => void
  value: any
  setValue: (value: any) => void
  setName: (name: string) => void
  children: JSX.Element
}) {
  const [fieldState, fieldActions] = FormCore.useField()
  const [state] = formContext.useContext()

  watch([() => fieldState.value, () => fieldState.name], ([value, name]) => {
    if (name) {
      props.setName(name)
      if (isDef(value)) {
        props.setValue(value)
      }
    }
  })

  // bind value
  watch([() => props.value], ([value]) => {
    console.log(value)
    fieldState.name && fieldActions.handleChange(value)
  })

  // bind blur
  watch([() => props.isBlur], ([isBlur]) => {
    isBlur && fieldActions.handleBlur()
  })

  // bind disabled
  watch(
    [() => props.propDisabled, () => state.disabled, () => fieldState.name],
    ([pDisabled, formDisabled, n]) => {
      const propDisabled = pDisabled || false
      if (!n) {
        props.setDisabled(propDisabled)
        return
      }
      props.setDisabled(formDisabled || propDisabled)
    },
  )

  return <></>
}

export function Bind(props: {
  isBlur?: boolean
  propDisabled: boolean | undefined
  setDisabled: (disabled: boolean) => void
  value: any
  setValue: (value: any) => void
  setName: (name: string) => void
  children: JSX.Element
  disableBind?: boolean
}) {
  return (
    <>
      <Show when={!props.disableBind}>
        <BindCore {...props} />
      </Show>
      {props.children}
    </>
  )
}
