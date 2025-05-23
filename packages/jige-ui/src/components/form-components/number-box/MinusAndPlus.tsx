import IconFluentChevronDown24Regular from '~icons/fluent/chevron-down-24-regular'
import IconFluentChevronUp24Regular from '~icons/fluent/chevron-up-24-regular'
import { context } from './context'

export function MinusAndPlus(props: {
  class?: string
}) {
  const [state, actions] = context.useContext()
  return (
    <div class={props.class}>
      <button
        type='button'
        onClick={() => actions.setValue(state.safeValue + 1)}
        onMouseDown={(e) => e.preventDefault()}
        disabled={state.value >= state.max}
      >
        <IconFluentChevronUp24Regular />
      </button>
      <button
        type='button'
        onClick={() => actions.setValue(state.safeValue - 1)}
        onMouseDown={(e) => e.preventDefault()}
        disabled={state.value <= state.min}
      >
        <IconFluentChevronDown24Regular />
      </button>
    </div>
  )
}
