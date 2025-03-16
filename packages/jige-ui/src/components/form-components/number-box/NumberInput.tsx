import { FormCore } from 'jige-core'
import { Form } from '~/components/form'
import { context } from './context'

export function NumberInput(props: {
  class?: string
}) {
  const [state, actions] = context.useContext()
  const [, fieldCoreActs] = FormCore.useField()
  const [fieldState] = Form.useFieldContext()
  return (
    <input
      class={props.class}
      type='text'
      aria-labelledby={fieldState.labelID}
      aria-describedby={fieldState.descriptionID}
      disabled={state.disabled}
      name={state.name}
      autocomplete='off'
      value={Number.isNaN(state.value) ? '' : state.value}
      onInput={(e) => {
        const v = e.currentTarget.value
        if (v === '') {
          actions.setValue(Number.NaN)
          return
        }
        const n = Number(v)
        if (Number.isNaN(n)) {
          return
        }
        actions.setValue(n)
      }}
      onChange={(e) => {
        e.currentTarget.value = Number.isNaN(state.value) ? '' : String(state.value)
      }}
      onFocus={() => actions.setFocused(true)}
      onBlur={() => {
        fieldCoreActs.handleBlur?.()
        actions.setFocused(false)
      }}
    />
  )
}
