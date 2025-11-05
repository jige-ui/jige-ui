import { createWatch } from "solid-tiny-utils";
import type { PropsWithContextChild } from "~/common/props";
import { callMaybeContextChild } from "~/common/props";
import { context } from "./context";

export function Root(
  props: PropsWithContextChild<
    ReturnType<typeof context.useContext>,
    {
      checked?: boolean;
      onChange?: (value: boolean) => void;
      disabled?: boolean;
    }
  >
) {
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

  return (
    <Context.Provider>
      {callMaybeContextChild(context.useContext(), props.children)}
    </Context.Provider>
  );
}
