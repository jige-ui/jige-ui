import { FloatingUiCore } from "jige-core";
import { createSignal } from "solid-js";
import { createWatch } from "solid-tiny-utils";
import { getMonth, getYear } from "time-core";
import { dataIf } from "~/common/dataset";
import { IconFluentCalendar24Regular } from "~/components/icons/fluent-calendar-24-regular";
import { Popover } from "../../popover";
import { ClearableSuffix } from "../input/clearable-suffix";
import { context } from "./context";

export function Trigger(props: {
  clearable: boolean;
  size: "small" | "medium" | "large";
}) {
  const [state, actions, staticData] = context.useContext();
  const [floatState, floatActions] = FloatingUiCore.useContext();
  const [focused, setFocused] = createSignal(false);

  createWatch(
    () => floatState.status,
    (status) => {
      if (status === "closed") {
        actions.setState("focused", false);
        actions.setActivePanel(state.defaultPanel);
        const time = state.timestamp;
        if (time === null) {
          return;
        }
        actions.setCurrYear(getYear(time));
        actions.setCurrMonth(getMonth(time));
      }
      if (status === "opened") {
        actions.setState("focused", true);
      }
    }
  );

  return (
    <Popover.Trigger>
      <div
        class="jg-input-wrapper jg-dp-trigger"
        data-disabled={dataIf(state.disabled)}
        data-focused={dataIf(focused())}
        data-preview={dataIf(state.previewMode)}
        data-size={props.size}
        onClick={() => {
          state.triggerRef?.focus();
        }}
        role="button"
        tabIndex={-1}
      >
        <input
          autocomplete="off"
          class="jg-input-native"
          name={state.name || "datepicker"}
          onBlur={(e) => {
            e.currentTarget.value = state.previewValue;
            floatActions.setOpen(false);
            setFocused(false);
          }}
          onFocus={() => {
            floatActions.setOpen(true);
            setFocused(true);
          }}
          onInput={(e) => {
            const v = e.currentTarget.value;
            if (v.trim() === "") {
              actions.setPreviewValue(null);
            } else {
              actions.setPreviewValue(
                staticData.previewer.toTimestamp(v, state.type)
              );
            }
          }}
          placeholder={state.placeholder || "请选择日期"}
          ref={(el) => {
            actions.setState("triggerRef", el);
          }}
          type="text"
          value={state.previewValue}
        />
        <ClearableSuffix
          onClear={() => {
            actions.clear();
          }}
          showClearable={props.clearable && state.previewValue !== ""}
          suffix={<IconFluentCalendar24Regular />}
        />
      </div>
    </Popover.Trigger>
  );
}
