import { ArrowDown, ArrowUp } from '../icons'
import { context } from './context'

export function MinusAndPlus(props: {
  class?: string
}) {
  const [state, actions] = context.useContext()
  return (
    <div class={props.class}>
      <button
        type="button"
        onClick={() => actions.setValue(state.value + 1)}
        onMouseDown={e => e.preventDefault()}
        disabled={state.value >= state.max}
      >
        <ArrowUp />
      </button>
      <button
        type="button"
        onClick={() => actions.setValue(state.value - 1)}
        onMouseDown={e => e.preventDefault()}
        disabled={state.value <= state.min}
      >
        <ArrowDown />
      </button>
    </div>
  )
}
