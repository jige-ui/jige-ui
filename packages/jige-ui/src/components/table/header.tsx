import { createResizeObserver } from "@solid-primitives/resize-observer";
import { TableCore } from "jige-core";
import { type ComponentProps, createMemo, onMount } from "solid-js";
import { context } from "./context";

export function Header(
  props: ComponentProps<"thead"> & {
    hide?: boolean;
  }
) {
  const [state, acts] = context.useContext();

  onMount(() => {
    createResizeObserver(
      () => state.refHeader,
      (_, el) => {
        const h = el.getBoundingClientRect().height;
        if (h !== state.headerHeight) {
          acts.setState("headerHeight", h);
        }
      }
    );
  });

  const scrollbarClass = createMemo(() => {
    const classList: string[] = [];
    const canScroll = state.canScroll;
    if (canScroll.left) {
      classList.push("jg-can-scroll-left");
    }
    if (canScroll.right) {
      classList.push("jg-can-scroll-right");
    }
    return classList.join(" ");
  });

  return (
    <div
      class={scrollbarClass()}
      ref={(el) => {
        acts.setState("refHeader", el);
      }}
      style={{
        overflow: "hidden",
        height: props.hide ? "0" : undefined,
      }}
    >
      <TableCore.Header {...props} />
    </div>
  );
}
