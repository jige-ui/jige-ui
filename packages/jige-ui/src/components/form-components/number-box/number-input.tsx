import { isNumber } from "solid-tiny-utils";
import { context } from "./context";

export function NumberInput(props: {
  class?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onPressEnter?: (e: KeyboardEvent) => void;
  nullable?: boolean;
}) {
  const [state, actions] = context.useContext();

  return (
    <input
      autocomplete="off"
      class={props.class}
      disabled={state.disabled}
      name={state.name}
      onBlur={() => {
        actions.setState("focused", false);
        if (!(props.nullable || isNumber(state.value))) {
          actions.setValue(0);
        }
        props.onBlur?.();
      }}
      onChange={(e) => {
        e.currentTarget.value = isNumber(state.value)
          ? String(state.value)
          : "";
      }}
      onFocus={() => {
        actions.setState("focused", true);
        props.onFocus?.();
      }}
      onInput={(e) => {
        const v = e.currentTarget.value;
        if (v.trim() === "") {
          actions.setValue(null);
          return;
        }
        const n = Number(v);
        if (Number.isNaN(n)) {
          return;
        }
        actions.setValue(n);
      }}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          props.onPressEnter?.(e);
        }
      }}
      placeholder={state.placeholder}
      type="text"
      value={isNumber(state.value) ? state.value : ""}
    />
  );
}
