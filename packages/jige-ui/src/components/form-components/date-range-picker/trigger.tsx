import { FloatingUiCore, hiddenStyle } from "jige-core";
import { createSignal } from "solid-js";
import { createDebouncedWatch, createWatch } from "solid-tiny-utils";
import { dataIf } from "~/common/dataset";
import { IconFluentArrowRight24Filled } from "~/components/icons/fluent-arrow-right-24-filled";
import { IconFluentCalendar24Regular } from "~/components/icons/fluent-calendar-24-regular";
import { Popover } from "~/components/popover";
import { ClearableSuffix } from "../input/clearable-suffix";
import { context, previewToVal } from "./context";

export function Trigger(props: {
  clearable: boolean;
  size: "small" | "medium" | "large";
}) {
  const [state, actions] = context.useContext();
  const [floatState, floatActions] = FloatingUiCore.useContext();
  const [focused, setFocused] = createSignal(false);

  createDebouncedWatch(focused, (f) => {
    floatActions.setOpen(f);
  });

  createWatch(
    () => floatState.status,
    (s) => {
      if (s === "closed") {
        actions.setState("focused", false);
        actions.syncValueToPreview();
      }
      if (s === "opened") {
        actions.setState("focused", true);
      }
    },
    { defer: true }
  );

  return (
    <Popover.Trigger>
      <div
        class="jg-input-wrapper jg-dp-trigger"
        data-disabled={dataIf(state.disabled)}
        data-focused={dataIf(focused())}
        data-preview={dataIf(state.previewMode)}
        data-size={props.size}
      >
        <input name={state.name} style={hiddenStyle} type="text" />
        <input
          autocomplete="off"
          class="jg-input-native"
          onBlur={() => {
            setFocused(false);
          }}
          onFocus={() => {
            setFocused(true);
          }}
          onInput={(e) => {
            const value = e.currentTarget.value;
            actions.setPreviewValue(0, previewToVal(value));
          }}
          placeholder={state.placeholder[0]}
          ref={(el) => {
            actions.setState("triggerRefs", 0, el);
          }}
          type="text"
          value={state.previewStrings[0]}
        />
        <div
          style={{
            position: "relative",
          }}
        >
          <IconFluentArrowRight24Filled />
        </div>
        <input
          autocomplete="off"
          class="jg-input-native"
          onBlur={() => {
            setFocused(false);
          }}
          onFocus={() => {
            setFocused(true);
          }}
          onInput={(e) => {
            const value = e.currentTarget.value;
            actions.setPreviewValue(1, previewToVal(value));
          }}
          placeholder={state.placeholder[1]}
          ref={(el) => {
            actions.setState("triggerRefs", 1, el);
          }}
          type="text"
          value={state.previewStrings[1]}
        />
        <ClearableSuffix
          onClear={() => {
            actions.clear();
          }}
          showClearable={
            props.clearable &&
            state.previewStrings.every((v) => v.trim() !== "")
          }
          suffix={<IconFluentCalendar24Regular />}
        />
      </div>
    </Popover.Trigger>
  );
}
