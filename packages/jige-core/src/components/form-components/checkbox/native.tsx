import { mergeRefs } from "@solid-primitives/refs";
import { type ComponentProps, splitProps } from "solid-js";
import { hiddenStyle } from "~/common/dom";
import { runSolidEventHandler } from "~/common/solidjs";
import { context } from "./context";

export function Native(
  props: Omit<
    ComponentProps<"input">,
    "style" | "type" | "role" | "value" | "checked" | "disabled"
  >
) {
  const [state, actions] = context.useContext();
  const [localProps, otherProps] = splitProps(props, [
    "ref",
    "onChange",
    "onFocus",
    "onBlur",
  ]);
  return (
    <input
      value="on"
      {...otherProps}
      aria-checked={state.checked}
      checked={state.checked}
      disabled={state.disabled}
      onBlur={(e) => {
        actions.setState("focused", false);
        runSolidEventHandler(e, localProps.onBlur);
      }}
      onChange={(e) => {
        e.stopPropagation();
        actions.setState("checked", e.target.checked);
        if (state.$nativeEl) {
          state.$nativeEl.checked = state.checked;
        }
        runSolidEventHandler(e, localProps.onChange);
      }}
      onFocus={(e) => {
        e.preventDefault();
        actions.setState("focused", true);
        runSolidEventHandler(e, localProps.onFocus);
      }}
      ref={mergeRefs(localProps.ref, (r) => {
        actions.setState("$nativeEl", r);
      })}
      role="switch"
      style={hiddenStyle}
      type="checkbox"
    />
  );
}
