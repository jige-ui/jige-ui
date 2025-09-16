import css from "sass:./combo-box.scss";
import { FloatingUiCore } from "jige-core";
import { batch } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createWatch, mountStyle } from "solid-tiny-utils";
import { context } from "./context";

export function Root<T>(props: {
  value?: T;
  options: { label: string; value: T }[];
  onChange?: (value: T) => void;
  disabled?: boolean;
  placeholder: string;
  children: JSX.Element;
  editable?: boolean;
}) {
  mountStyle(css, "jige-ui-combo-box");

  const Context = context.initial({
    disabled: () => props.disabled,
    value: () => props.value,
    options: () => props.options,
    placeholder: () => props.placeholder,
    editable: () => props.editable,
  });
  const [state, actions] = Context.value;

  createWatch(
    () => state.value,
    (v) => {
      props.onChange?.(v);
    }
  );

  createWatch(
    () => [state.editable, state.valueLabel] as const,
    ([editable, valueLabel]) => {
      if (editable) {
        batch(() => {
          actions.setState("editableValue", valueLabel);
          actions.setState("offset", 0);
          actions.setState("originY", 0);
        });
      }
    }
  );

  createWatch(
    () => state.editableValue,
    (v) => {
      if (!state.editable || v === state.valueLabel) {
        return;
      }
      if (v === "") {
        actions.setState("value", undefined);
        return;
      }
      const index = state.options.findIndex((item) => item.label === v);
      if (index !== -1) {
        actions.setState("value", state.options[index].value);
      }
    }
  );

  return (
    <Context.Provider>
      <FloatingUiCore
        disabled={state.disabled}
        floatingOption={{
          offset: state.offset,
          flip: false,
          shift: {
            crossAxis: true,
          },
        }}
        placement="bottom"
        trigger="click"
      >
        {props.children}
      </FloatingUiCore>
    </Context.Provider>
  );
}
