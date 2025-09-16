import css from "sass:./time-picker.scss";
import type { JSX } from "solid-js/jsx-runtime";
import { createWatch, mountStyle } from "solid-tiny-utils";
import { Popover } from "~/components/popover";
import { context } from "./context";

export function Root(props: {
  children: JSX.Element;
  type?: "hour" | "minute" | "second";
  disabled?: boolean;
  size?: "small" | "medium";
  value?: string;
  onChange?: (value: string) => void;
}) {
  mountStyle(css, "jige-time-picker");
  const Context = context.initial({
    type: () => props.type,
    disabled: () => props.disabled,
    triggerHeight: () => {
      return props.size === "small" ? 24 : 32;
    },
    triggerWidth: () => {
      return props.size === "small" ? 96 : 128;
    },
  });
  const [state, actions] = Context.value;

  createWatch(
    () => state.asStr,
    (v) => {
      props.onChange?.(v);
    },
    { defer: true }
  );

  createWatch(
    () => props.value,
    (value) => {
      if (value && value !== state.asStr) {
        actions.setValue(value);
      }
    }
  );

  return (
    <Context.Provider>
      <Context.Provider>
        <Popover
          disabled={state.disabled}
          floatingOption={{
            offset: () => {
              return -state.triggerHeight * 4 - 8;
            },
            flip: false,
            shift: {
              crossAxis: true,
            },
          }}
          placement="bottom"
          trigger="click"
        >
          {props.children}
        </Popover>
      </Context.Provider>
    </Context.Provider>
  );
}
