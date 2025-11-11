import css from "sass:./range-picker.scss";
import dpCss from "sass:../date-picker/date-picker.scss";
import inputCss from "sass:../input/input.scss";
import { undefinedOr } from "jige-core";
import { createWatch, mountStyle } from "solid-tiny-utils";
import type { DateArgs } from "time-core";
import { isDef } from "~/common/types";
import { Popover } from "~/components/popover";
import { context } from "./context";
import { Panel } from "./panel";
import { Trigger } from "./trigger";

export function DateRangePicker<T>(props: {
  disabled?: boolean;
  value?: [DateArgs, DateArgs];
  onChange?: (value: [NoInfer<T>, NoInfer<T>]) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: [string, string];
  toValues?: (timestamps: [number | null, number | null]) => [T, T];
  clearable?: boolean;
  size?: "small" | "medium" | "large";
  type?: "datetime" | "date";
  presets?: [
    {
      label: string;
      value: (
        state: ReturnType<typeof context.useContext>[0]
      ) => [string, string];
    },
  ];
}) {
  mountStyle(dpCss, "jige-ui-date-picker");
  mountStyle(inputCss, "jige-ui-input");
  mountStyle(css, "jige-ui-date-range-picker");
  const Context = context.initial({
    placeholder: () => props.placeholder,
    disabled: () => props.disabled,
    type: () => props.type,
  });

  const [state, actions, staticData] = Context.value;
  const defaultToValues = staticData.toValues;

  createWatch(
    () => props.toValues,
    (toVals) => {
      if (isDef(toVals)) {
        staticData.toValues = toVals;
      } else {
        staticData.toValues = defaultToValues;
      }
    }
  );

  createWatch(
    () => [...state.timestamps] as [number | null, number | null],
    (v) => {
      props.onChange?.(staticData.toValues(v));
    },
    { defer: true }
  );

  createWatch(
    () => [...state.timestamps],
    () => {
      actions.syncValueToPreview();
    }
  );

  createWatch(
    () => {
      if (isDef(props.value)) {
        return [...props.value];
      }
      return undefined;
    },
    (v) => {
      if (v) {
        actions.setValue(v as [DateArgs, DateArgs]);
      }
    }
  );

  createWatch(
    () => state.type,
    () => {
      actions.clear();
    },
    { defer: true }
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
        <Trigger
          clearable={undefinedOr(props.clearable, true)}
          size={props.size || "medium"}
        />
        <Popover.Content
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          style={{
            padding: 0,
            border: "1px solid var(--jg-t-border)",
          }}
        >
          <Panel presets={props.presets} />
        </Popover.Content>
      </Popover>
    </Context.Provider>
  );
}
