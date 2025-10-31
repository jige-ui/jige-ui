import { mergeRefs } from "@solid-primitives/refs";
import { type ComponentProps, splitProps } from "solid-js";
import { hiddenStyle } from "@/common/dom";
import { runSolidEventHandler } from "@/common/solidjs";
import { context } from "./context";

export function Native(
  props: Omit<
    ComponentProps<"input">,
    "style" | "type" | "aria-checked" | "checked" | "disabled"
  >
) {
  const [state, actions] = context.useContext();
  const [localProps, otherProps] = splitProps(props, ["ref", "onChange"]);

  return (
    <input
      {...otherProps}
      aria-checked={state.checked}
      checked={state.checked}
      class={props.class}
      disabled={state.disabled}
      onChange={(e) => {
        e.stopPropagation();
        e.target.checked && actions.setState("checked", true);
        runSolidEventHandler(e, localProps.onChange);
      }}
      ref={mergeRefs(localProps.ref, (r) => {
        actions.setState("nativeEl", r);
      })}
      style={hiddenStyle}
      type="radio"
    />
  );
}
