import { splitProps } from "solid-js";
import { runSolidEventHandler } from "@/common/solidjs";
import context from "./context";
import type { TextareaProps } from "./types";

export function Textarea(props: Omit<TextareaProps, "disabled">) {
  const [state, actions] = context.useContext();
  const [localProps, otherProps] = splitProps(props, [
    "aria-label",
    "onInput",
    "rows",
    "name",
  ]);

  const inputHandler = (e: Event) => {
    actions.setValue((e.target as HTMLTextAreaElement).value);
    runSolidEventHandler(e, localProps.onInput);
  };
  return (
    <textarea
      {...otherProps}
      aria-label={localProps["aria-label"] || state.name || "input"}
      disabled={state.disabled}
      name={localProps.name || state.name}
      onInput={inputHandler}
      rows={localProps.rows || 3}
      value={state.value}
    />
  );
}
