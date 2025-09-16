import { IconFluentChevronDown24Filled } from "~/components/icons/fluent-chevron-down-24-filled";
import { IconFluentChevronUp24Filled } from "~/components/icons/fluent-chevron-up-24-filled";
import { context } from "./context";

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
        <IconFluentChevronUp24Filled />
      </button>
      <button
        disabled={state.value <= state.min}
        onClick={() => actions.setValue(state.safeValue - 1)}
        onMouseDown={(e) => e.preventDefault()}
        type="button"
      >
        <IconFluentChevronDown24Filled />
      </button>
    </div>
  );
}
