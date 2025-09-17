import { mergeRefs } from "@solid-primitives/refs";
import { onMount, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { combineStyle } from "@/common/dom";
import { context } from "./context";

export function Mask(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, others] = splitProps(props, ["style", "ref"]);
  const [state] = context.useContext();
  let ref!: HTMLDivElement;

  onMount(() => {
    ref.focus();
  });

  return (
    <div
      {...others}
      aria-hidden="true"
      data-modal-status={state.status}
      ref={mergeRefs(local.ref, (el) => {
        ref = el;
      })}
      style={combineStyle(
        {
          position: "fixed",
          inset: 0,
        },
        local.style
      )}
    />
  );
}
