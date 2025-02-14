import type { PropsWithContextChild } from 'jige-core'
import { callMaybeContextChild, FormCore } from 'jige-core'
import { watch } from 'solid-uses'
import { undefinedOr } from '~/common/types'
import { context } from './context'

export function Root(props: PropsWithContextChild<typeof context, {
  min?: number
  max?: number
  value?: number
  disabled?: boolean
  onChange?: (value: number) => void
}>) {
  const Context = context.initial({
    value: () => props.value,
    min: () => props.min,
    max: () => props.max,
    disabled: () => props.disabled,
  })
  const [state, actions] = Context.value

  watch(() => state.value, (v, prevV) => {
    if (Number.isNaN(v) && Number.isNaN(undefinedOr(prevV, 0))) {
      return
    }
    props.onChange?.(v)
  })

  watch([() => state.max, () => state.min], () => {
    actions.setValue(state.value)
  })

  return (
    <Context.Provider>
      <FormCore.Bind
        propDisabled={props.disabled}
        setDisabled={actions.setDisabled}
        setValue={actions.setValue}
        value={state.value}
        setName={actions.setName}
      >
        {callMaybeContextChild(context, props.children)}
      </FormCore.Bind>
    </Context.Provider>
  )
}
