import { splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { hiddenStyle } from "@/common/dom";
import { runSolidEventHandler } from "@/common/solidjs";
import context from "./context";

export default function Native(
  props: Omit<
    JSX.InputHTMLAttributes<HTMLInputElement>,
    | "style"
    | "type"
    | "max"
    | "aria-checked"
    | "value"
    | "name"
    | "min"
    | "disabled"
  >
) {
  const [state, actions] = context.useContext();
  const [localProps, otherProps] = splitProps(props, [
    "ref",
    "onInput",
    "onKeyDown",
  ]);
  return (
    <input
      {...otherProps}
      disabled={state.disabled}
      max={state.max}
      min={state.min}
      onInput={(e) => {
        e.stopPropagation();
        actions.setValue(Number.parseInt(e.target.value, 10));
        runSolidEventHandler(e, localProps.onInput);
      }}
      onKeyDown={(e) => {
        if (state.reverse) {
          e.preventDefault();
          if (e.key === "ArrowUp" || e.key === "ArrowRight") {
            actions.setValue(state.value - state.step);
          } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
            actions.setValue(state.value + state.step);
          }
        }

        runSolidEventHandler(e, localProps.onInput);
      }}
      ref={(el) => {
        actions.setState("$nativeEl", el);
      }}
      step={state.step}
      style={hiddenStyle}
      type="range"
      value={state.value}
    />
  );
}
