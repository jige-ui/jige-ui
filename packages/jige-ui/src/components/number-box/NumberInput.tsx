import { context } from './context'

export function NumberInput(props: {
  class?: string
}) {
  const [state, actions] = context.useContext()
  return (
    <input
      class={props.class}
      type="text"
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
      onChange={(e)=>{
        e.currentTarget.value = Number.isNaN(state.value) ? '' : String(state.value)
      }}
      onFocus={() => actions.setFocused(true)}
      onBlur={() => actions.setFocused(false)}
    />
  )
}
