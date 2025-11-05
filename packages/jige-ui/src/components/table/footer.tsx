import { createResizeObserver } from "@solid-primitives/resize-observer";
import {
  type ComponentProps,
  createSignal,
  onMount,
  splitProps,
} from "solid-js";
import { context } from "./context";

export function Footer(props: ComponentProps<"div">) {
  const [localProps, others] = splitProps(props, ["class"]);
  const [state, acts] = context.useContext();
  const [ref, setRef] = createSignal<HTMLDivElement | null>(null);

  onMount(() => {
    createResizeObserver(ref, (_, el) => {
      const h = el.getBoundingClientRect().height;
      if (h !== state.footerHeight) {
        acts.setState("footerHeight", h);
      }
    });
  });

  return (
    <div
      class={["jg-table-footer", localProps.class].join(" ")}
      ref={setRef}
      {...others}
    />
  );
}
