import { mergeRefs } from "@solid-primitives/refs";
import { TableCore } from "jige-core";
import { type ComponentProps, splitProps } from "solid-js";
import { Scrollbar } from "../scrollbar";
import { context } from "./context";

export function Body(
  props: ComponentProps<"tbody"> & {
    scrollRef?: (val: HTMLDivElement) => void;
  }
) {
  const [state, actions] = context.useContext();
  const [localProps, others] = splitProps(props, ["class", "scrollRef"]);

  return (
    <Scrollbar
      color="var(--jg-t-hl)"
      height={state.scrollHeight}
      maxHeight={state.scrollMaxHeight}
      onScroll={(e) => {
        if (state.refHeader) {
          state.refHeader.scrollLeft = e.target.scrollLeft;
        }
      }}
      onScrollBarChange={() => {
        actions.calcCanScroll();
      }}
      scrollRef={mergeRefs(
        (el) => actions.setState("refScrollBody", el),
        props.scrollRef
      )}
    >
      <TableCore.Body
        class={["jg-table-body", localProps.class].join(" ")}
        {...others}
      />
    </Scrollbar>
  );
}
