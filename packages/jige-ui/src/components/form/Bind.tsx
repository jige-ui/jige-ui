import { FormCore } from 'jige-core'
import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import { formContext } from './context'
import { isDef } from '~/common/types'

export function Bind(props: {
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
      isDef(value) && props.setValue(value)
    }
  })

  // bind value
  watch([() => props.value], ([value]) => {
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

  return <>{props.children}</>
}
