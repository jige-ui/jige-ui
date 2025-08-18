import IconFluentChevronDown24Regular from '~icons/fluent/chevron-down-24-regular';
import IconFluentChevronUp24Regular from '~icons/fluent/chevron-up-24-regular';
import { context } from './context';

export function MinusAndPlus(props: { class?: string }) {
  const [state, actions] = context.useContext();
  return (
    <div class={props.class}>
      <button
        disabled={state.value >= state.max}
        onClick={() => actions.setValue(state.safeValue + 1)}
        onMouseDown={(e) => e.preventDefault()}
        type="button"
      >
        <IconFluentChevronUp24Regular />
      </button>
      <button
        disabled={state.value <= state.min}
        onClick={() => actions.setValue(state.safeValue - 1)}
        onMouseDown={(e) => e.preventDefault()}
        type="button"
      >
        <IconFluentChevronDown24Regular />
      </button>
    </div>
  );
}
