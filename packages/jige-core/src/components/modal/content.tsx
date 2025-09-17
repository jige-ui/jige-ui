import { Ref } from "@solid-primitives/refs";
import { createMemo, onCleanup, onMount, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import {
  createClickOutside,
  createWatch,
  makeEventListener,
} from "solid-tiny-utils";
import { combineStyle, hasAnimation } from "@/common/dom";
import type { PropsWithContextChild } from "@/common/props";
import { callMaybeContextChild } from "@/common/props";
import type { CloseableStatus } from "@/common/types";
import { context, GlobalModalStore } from "./context";

export function Content(
  props: PropsWithContextChild<
    ReturnType<typeof context.useContext>,
    JSX.HTMLAttributes<HTMLDivElement>
  >
) {
  const [localProps, otherProps] = splitProps(props, ["children", "style"]);
  let ref!: HTMLElement;
  let wrapperRef!: HTMLDivElement;
  const [state, actions] = context.useContext();
  const [gs, setGs] = GlobalModalStore;

  const isActive = createMemo(() => gs.stack.at(-1) === state.id);

  onMount(() => {
    setGs("stack", (stack) => {
      stack.push(state.id);
      return [...stack];
    });

    ref.style.pointerEvents = "auto";

    wrapperRef.tabIndex = 0;
    wrapperRef.focus();
    wrapperRef.tabIndex = -1;

    makeEventListener(ref, "animationend", () => {
      actions.setStatus(state.status.replace("ing", "ed") as CloseableStatus);
    });

    makeEventListener(document, "keydown", (e) => {
      if (e.key === "Escape" && isActive() && state.closeOnEsc) {
        actions.setOpen(false);
      }
    });

    // on click mask/outside
    createClickOutside(ref, () => {
      if (isActive() && state.closeOnClickMask) {
        actions.setOpen(false);
      }
    });

    createWatch(
      () => state.status,
      (status) => {
        if (status.endsWith("ing") && !hasAnimation(ref)) {
          actions.setStatus(status.replace("ing", "ed") as CloseableStatus);
        }
      }
    );
  });

  onCleanup(() => {
    actions.preventBodyScroll(false);
    setGs("stack", (stack) => {
      const index = stack.indexOf(state.id);
      if (index !== -1) {
        stack.splice(index, 1);
      }
      return [...stack];
    });
  });
  return (
    <div
      ref={wrapperRef}
      style={combineStyle(
        {
          position: "fixed",
          inset: 0,
        },
        localProps.style
      )}
      {...otherProps}
    >
      <Ref ref={ref}>
        {callMaybeContextChild(context.useContext(), localProps.children)}
      </Ref>
    </div>
  );
}
