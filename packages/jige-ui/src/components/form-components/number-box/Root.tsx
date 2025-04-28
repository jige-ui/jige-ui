import type { PropsWithContextChild } from 'jige-core'
import { callMaybeContextChild } from 'jige-core'
import { watch } from 'solid-uses'
import { undefinedOr } from '~/common/types'
import { Form } from '~/components/form'
import { context } from './context'

export function Root(
  props: PropsWithContextChild<
    typeof context,
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

  watch(
    () => state.value,
    (v, prevV) => {
      if (Number.isNaN(v) && Number.isNaN(undefinedOr(prevV, 0))) {
        return
      }
      props.onChange?.(v)
    },
  )

  watch([() => state.max, () => state.min], () => {
    actions.setValue(state.value)
  })

  return (
    <Context.Provider>
      <Form.Bind
        propDisabled={props.disabled}
        setDisabled={actions.setDisabled}
        setValue={actions.setValue}
        value={state.value}
        setName={actions.setName}
        disableBind={props.disableBind}
      >
        {callMaybeContextChild(context.useContext(), props.children)}
      </Form.Bind>
    </Context.Provider>
  )
}
