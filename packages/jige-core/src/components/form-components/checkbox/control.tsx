import { Ref } from "@solid-primitives/refs";
import { onMount } from "solid-js";
import { makeEventListener } from "solid-tiny-utils";
import { callMaybeContextChild, type MaybeContextChild } from "@/common/props";
import { context } from "./context";

export function Control(props: {
  children: MaybeContextChild<ReturnType<typeof context.useContext>>;
}) {
  const [state] = context.useContext();
  let ref!: HTMLElement;

  onMount(() => {
    makeEventListener(ref, "click", (e) => {
      e.preventDefault();
      state.$nativeEl?.click();
      state.$nativeEl?.focus();
    });

    makeEventListener(ref, "mousedown", (e) => {
      e.preventDefault();
    });
  });
  return (
    <Ref ref={ref}>
      {callMaybeContextChild(context.useContext(), props.children)}
    </Ref>
  );
}
