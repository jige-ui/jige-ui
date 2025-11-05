import { mergeRefs } from "@solid-primitives/refs";
import { createResizeObserver } from "@solid-primitives/resize-observer";
import { throttle } from "@solid-primitives/scheduled";
import type { JSX } from "solid-js";
import { createSignal, onMount, splitProps } from "solid-js";
import context from "./context";

export default function Content(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [, action] = context.useContext();
  const [local, others] = splitProps(props, ["ref"]);
  const [scrollRef, setScrollRef] = createSignal<HTMLDivElement | null>(null);

  const throttleSetValue = throttle(action.setValue, 35);

  onMount(() => {
    createResizeObserver(scrollRef, () => {
      throttleSetValue();
    });
  });

  return <div {...others} ref={mergeRefs(local.ref, setScrollRef)} />;
}
