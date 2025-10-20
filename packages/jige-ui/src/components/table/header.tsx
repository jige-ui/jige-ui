import { createElementBounds } from "@solid-primitives/bounds";
import { TableCore } from "jige-core";
import { type ComponentProps, createMemo } from "solid-js";
import { createWatch } from "solid-tiny-utils";
import { context } from "./context";

export function Header(
  props: ComponentProps<"thead"> & {
    hide?: boolean;
  }
) {
  const [state, acts] = context.useContext();

  const bounds = createElementBounds(() => state.refHeader);

  createWatch(
    () => bounds.height,
    (h) => {
      acts.setState("headerHeight", h || 0);
    }
  );

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
