import { Ref } from "@solid-primitives/refs";
import { onMount } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { makeEventListener } from "solid-tiny-utils";
import { context } from "./context";

function getElementRect(el: HTMLElement) {
  const rect = el.getBoundingClientRect();

  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

export function Handler(props: { children: JSX.Element }) {
  let ref!: HTMLElement;

  let start = false;
  let startPos = { x: 0, y: 0 };
  let startRectPos = { x: 0, y: 0 };

  const [state, actions] = context.useContext();

  onMount(() => {
    makeEventListener(ref, "mousedown", (e) => {
      e.preventDefault();

      const $tar = state.targetElement;
      if (state.disabled || !$tar) {
        return;
      }

      const rect = getElementRect($tar);

      actions.calcInitial();
      actions.setX(rect.x);
      actions.setY(rect.y);

      start = true;
      startPos = { x: e.clientX, y: e.clientY };
      startRectPos = { x: rect.x, y: rect.y };
    });

    makeEventListener(document, "mousemove", (e) => {
      if (!start) {
        return;
      }

      if (state.disabled) {
        start = false;
        actions.setStatus("stop");
        return;
      }

      if (
        Math.abs(startPos.x - e.clientX) > state.startThreshold ||
        Math.abs(startPos.y - e.clientY) > state.startThreshold
      ) {
        actions.setStatus("start");
      }

      if (state.status === "stop") {
        return;
      }

      const diffX = e.clientX - startPos.x;
      const diffY = e.clientY - startPos.y;
      actions.setX(startRectPos.x + diffX);
      actions.setY(startRectPos.y + diffY);
    });

    makeEventListener(document, "mouseup", () => {
      start = false;
      actions.setStatus("stop");
    });
  });

  return <Ref ref={ref}>{props.children}</Ref>;
}
