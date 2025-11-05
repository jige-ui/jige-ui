import { mergeRefs } from "@solid-primitives/refs";
import type { JSX } from "solid-js";
import { splitProps } from "solid-js";
import { combineStyle } from "~/common/dom";
import type { PropsWithContextChild } from "~/common/props";
import { callMaybeContextChild } from "~/common/props";
import { runSolidEventHandler } from "~/common/solidjs";
import context from "./context";

export default function Track(
  props: PropsWithContextChild<
    ReturnType<typeof context.useContext>,
    JSX.HTMLAttributes<HTMLDivElement>
  >
) {
  const [localProps, otherProps] = splitProps(props, [
    "ref",
    "onClick",
    "style",
    "children",
  ]);
  const [state, actions] = context.useContext();
  let ref!: HTMLDivElement;

  const calcRadio = (offset: { x: number; y: number }) => {
    const parent = state.vertical ? ref.clientHeight : ref.clientWidth;
    let diff = 0;
    if (state.vertical) {
      diff = state.reverse ? offset.y : parent - offset.y;
    } else {
      diff = state.reverse ? parent - offset.x : offset.x;
    }
    return diff / parent;
  };

  return (
    <div
      {...otherProps}
      onClick={(e) => {
        e.preventDefault();
        state.$nativeEl?.focus();
        if (e.target === ref) {
          actions.setRatio(calcRadio({ x: e.offsetX, y: e.offsetY }));
        }
        runSolidEventHandler(e, localProps.onClick);
      }}
      ref={mergeRefs(localProps.ref, (r) => {
        ref = r;
      })}
      style={combineStyle({ position: "relative" }, localProps.style)}
    >
      {callMaybeContextChild(context.useContext(), localProps.children)}
    </div>
  );
}
