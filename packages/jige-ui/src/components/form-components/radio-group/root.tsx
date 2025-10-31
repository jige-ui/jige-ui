import { type ComponentProps, splitProps } from "solid-js";
import { createWatch } from "solid-tiny-utils";
import context from "./context";

export function Root<T extends string | number>(
  props: {
    value?: T;
    onChange?: (value: T) => void;
    disabled?: boolean;
  } & Omit<ComponentProps<"div">, "onChange" | "value" | "disabled">
) {
  const [locals, others] = splitProps(props, ["value", "onChange", "disabled"]);
  const Context = context.initial({
    disabled: () => locals.disabled,
    value: () => locals.value,
  });

  const [state] = Context.value;

  createWatch(
    () => state.value as T,
    (v) => {
      locals.onChange?.(v);
    },
    {
      defer: true,
    }
  );

  return (
    <Context.Provider>
      <div {...others} />
    </Context.Provider>
  );
}
