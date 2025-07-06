import { FormCore } from 'jige-core'
import { Show } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { isDef } from '~/common/types'
import { formContext } from './context'
import { createWatch } from 'jige-utils'

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

  createWatch([() => fieldState.value, () => fieldState.name], ([value, name]) => {
    if (name) {
      props.setName(name)
      if (isDef(value)) {
        props.setValue(value)
      }
    }
  })

  // bind value
  createWatch([() => props.value], ([value]) => {
    fieldState.name && fieldActions.handleChange(value)
  })

  // bind blur
  createWatch([() => props.isBlur], ([isBlur]) => {
    isBlur && fieldActions.handleBlur()
  })

  // bind disabled
  createWatch(
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
