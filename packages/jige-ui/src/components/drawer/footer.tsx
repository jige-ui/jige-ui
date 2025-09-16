import type { JSX } from "solid-js";

export function Footer(props: {
  children: JSX.Element;
  class?: string;
  style?: string | JSX.CSSProperties;
}) {
  return (
    <div
      class={["jg-drawer-footer", props.class].join(" ")}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
