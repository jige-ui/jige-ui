import type { JSX } from "solid-js/jsx-runtime";
import { createWatch } from "solid-tiny-utils";
import context from "./context";

export function Root<TValue = string | number>(props: {
  children: JSX.Element;
  name?: string;
  value?: TValue;
  onChange?: (v: TValue) => void;
  disabled?: boolean;
}) {
  const Context = context.initial({
    value: () => props.value as string,
    name: () => props.name,
    disabled: () => props.disabled,
  });
  const [state] = Context.value;

  createWatch(
    () => state.value as TValue,
    (v) => {
      v !== props.value && props.onChange?.(v);
    },
    { defer: true }
  );

  return <Context.Provider>{props.children}</Context.Provider>;
}
