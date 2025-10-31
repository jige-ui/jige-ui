import type { JSX } from "solid-js/jsx-runtime";
import { createWatch } from "solid-tiny-utils";
import { context } from "./context";

export function Root(props: {
  children: JSX.Element;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  const Context = context.initial({
    checked: () => props.checked,
    disabled: () => props.disabled,
  });

  const [state] = Context.value;

  createWatch(
    () => state.checked,
    (c) => {
      props.onChange?.(c);
    },
    { defer: true }
  );

  return <Context.Provider>{props.children}</Context.Provider>;
}
