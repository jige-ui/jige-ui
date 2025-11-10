import styles from "sass:./date-picker.scss";
import inputCss from "sass:../input/input.scss";
import type { JSX } from "solid-js/jsx-runtime";
import { createWatch, mountStyle } from "solid-tiny-utils";
import { type DateArgs, getMonth, getTimestamp, getYear } from "time-core";
import { isDef } from "~/common/types";
import { Popover } from "../../popover";
import { context } from "./context";
import type { DatePickerPreviewer, DatePickerType } from "./types";

export function Root<T = string>(props: {
  children: JSX.Element;
  value?: DateArgs;
  onChange?: (value: T) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  dateRange?: [DateArgs, DateArgs];
  disabled?: boolean;
  type?: DatePickerType;
  placeholder?: string;
  previewer?: DatePickerPreviewer;
  toValue?: (timestamp: number | null) => T;
}) {
  mountStyle(styles, "jige-ui-date-picker");
  mountStyle(inputCss, "jige-ui-input");
  const Context = context.initial({
    dateRange: () => {
      if (isDef(props.dateRange)) {
        return props.dateRange.map(getTimestamp) as [number, number];
      }
    },
    disabled: () => props.disabled,
    type: () => props.type,
    placeholder: () => props.placeholder,
  });

  const [state, actions, staticData] = Context.value;
  const defaultPreviewer = staticData.previewer;
  const defaultToValue = staticData.toValue;

  createWatch(
    () => props.previewer,
    (previewer) => {
      if (isDef(previewer)) {
        staticData.previewer = previewer;
      } else {
        staticData.previewer = defaultPreviewer;
      }
      actions.clear();
    },
    { defer: true }
  );

  createWatch(
    () => props.toValue,
    (toVal) => {
      if (isDef(toVal)) {
        staticData.toValue = toVal;
      } else {
        staticData.toValue = defaultToValue;
      }
      actions.clear();
    },
    { defer: true }
  );

  createWatch(
    () => props.value,
    (v) => {
      isDef(v) && actions.setTimestamp(getTimestamp(v));
    }
  );

  createWatch(
    () => state.type,
    () => {
      actions.setTimestamp(null);
    },
    { defer: true }
  );

  createWatch(
    () => state.timestamp,
    (v) => {
      v !== props.value && props.onChange?.(staticData.toValue(v));
    },
    { defer: true }
  );

  createWatch(
    () => state.timestamp,
    () => {
      actions.syncValueToPreview();
    }
  );

  createWatch(
    () => state.previewValue,
    () => {
      let v = state.previewTimestamp;
      if (v === null) {
        v = Date.now();
      }
      actions.setCurrYear(getYear(v));
      actions.setCurrMonth(getMonth(v));
    }
  );

  createWatch(
    () => state.focused,
    (focused) => {
      if (focused) {
        props.onFocus?.();
      } else {
        props.onBlur?.();
      }
    },
    { defer: true }
  );

  return (
    <Context.Provider>
      <Popover
        disabled={state.disabled}
        placement="bottom-start"
        trigger="manual"
      >
        {props.children}
      </Popover>
    </Context.Provider>
  );
}
