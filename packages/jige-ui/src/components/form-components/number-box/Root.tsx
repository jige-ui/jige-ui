import type { PropsWithContextChild } from 'jige-core'
import { callMaybeContextChild, undefinedOr } from 'jige-core'
import { createWatch } from 'jige-utils'
import { Form } from '~/components/form'
import { context } from './context'

export function Root(
  props: PropsWithContextChild<
    ReturnType<typeof context.useContext>,
    {
      min?: number
      max?: number
      value?: number
      disabled?: boolean
      placeholder?: string
      onChange?: (value: number) => void
      disableBind?: boolean
    }
  >,
) {
  const Context = context.initial({
    value: () => props.value,
    min: () => props.min,
    max: () => props.max,
    disabled: () => props.disabled,
    placeholder: () => props.placeholder,
  })
  const [state, actions] = Context.value

  createWatch(
    () => state.value,
    (v, prevV) => {
      if (Number.isNaN(v) && Number.isNaN(undefinedOr(prevV, 0))) {
        return
      }
      props.onChange?.(v)
    },
  )

  createWatch([() => state.max, () => state.min], () => {
    actions.setValue(state.value)
  })

  return (
    <Context.Provider>
      <Form.Bind
        propDisabled={props.disabled}
        setDisabled={(d) => {
          actions.setState('disabled', d)
        }}
        setValue={actions.setValue}
        value={state.value}
        setName={(n) => {
          actions.setState('name', n)
        }}
        disableBind={props.disableBind}
      >
        {callMaybeContextChild(context.useContext(), props.children)}
      </Form.Bind>
    </Context.Provider>
  )
}
