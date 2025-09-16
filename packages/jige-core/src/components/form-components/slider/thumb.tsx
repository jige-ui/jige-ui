import { mergeRefs } from "@solid-primitives/refs";
import type { JSX } from "solid-js";
import { onMount, splitProps } from "solid-js";
import { makeEventListener } from "solid-tiny-utils";
import { runSolidEventHandler } from "@/common/solidjs";
import context from "./context";

export default function Thumb(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [localProps, otherProps] = splitProps(props, ["ref", "onMouseDown"]);
  const [state, actions] = context.useContext();
  let isDragging = false;
  let startPos = 0;
  let startValue = 0;

  let ref!: HTMLDivElement;

  onMount(() => {
    makeEventListener(document, "mousemove", (e) => {
      if (!isDragging) {
        return;
      }

      let diff = 0;
      const parent = state.vertical
        ? ref.parentElement!.clientHeight
        : ref.parentElement!.clientWidth;

      if (state.vertical) {
        diff = startPos - e.clientY;
      } else {
        diff = e.clientX - startPos;
      }

      if (state.reverse) {
        diff = -diff;
      }

      actions.setValue(startValue + (diff / parent) * (state.max - state.min));
    });

    makeEventListener(document, "mouseup", () => {
      isDragging = false;
      actions.setState("isDragging", false);
    });
  });

  return (
    <div
      {...otherProps}
      data-slider-dragging={state.isDragging}
      onMouseDown={(e) => {
        e.preventDefault();
        state.$nativeEl?.focus();
        isDragging = true;
        actions.setState("isDragging", true);
        startPos = state.vertical ? e.clientY : e.clientX;
        startValue = state.value;
        runSolidEventHandler(e, localProps.onMouseDown);
      }}
      ref={mergeRefs(localProps.ref, (r) => {
        ref = r;
      })}
    />
  );
}
