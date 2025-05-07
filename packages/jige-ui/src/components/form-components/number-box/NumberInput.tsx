import { FormCore } from 'jige-core'
import { Form } from '~/components/form'
import { context } from './context'

export function NumberInput(props: {
  class?: string
}) {
  const [state, actions] = context.useContext()
  const [, fieldCoreActs] = FormCore.useField()
  return (
    <input
      class={props.class}
      type='text'
      {...Form.createNativeComponentAttrs()}
      disabled={state.disabled}
      name={state.name}
      autocomplete='off'
      placeholder={state.placeholder}
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
      onFocus={() => {
        actions.setState('focused', true)
      }}
      onBlur={() => {
        fieldCoreActs.handleBlur?.()
        actions.setState('focused', false)
      }}
    />
  )
}
