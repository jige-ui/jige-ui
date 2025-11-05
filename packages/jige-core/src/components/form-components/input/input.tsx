import { splitProps } from "solid-js";
import { runSolidEventHandler } from "~/common/solidjs";
import context from "./context";
import type { InputProps } from "./types";

export function Input(props: Omit<InputProps, "disabled">) {
  const [state, actions] = context.useContext();

  const [localProps, otherProps] = splitProps(props, [
    "aria-label",
    "onInput",
    "name",
  ]);

  const inputHandler = (e: Event) => {
    actions.setValue((e.target as HTMLTextAreaElement).value);
    runSolidEventHandler(e, localProps.onInput);
  };

  return (
    <input
      {...otherProps}
      aria-label={localProps["aria-label"] || state.name || "input"}
      disabled={state.disabled}
      name={localProps.name || state.name}
      onInput={inputHandler}
      value={state.value}
    />
  );
}
