import { type ComponentProps, splitProps } from "solid-js";
import { combineClass } from "solid-tiny-utils";

export function Footer(props: ComponentProps<"div">) {
  const [localProps, others] = splitProps(props, ["class"]);
  return (
    <div
      class={combineClass("jg-modal-footer", localProps.class)}
      {...others}
    />
  );
}
