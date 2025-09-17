import css from "sass:./progress-ring.scss";
import type { JSX } from "solid-js";
import { combineStyle, mountStyle } from "solid-tiny-utils";

export function SpinRing(props: {
  size?: number;
  color?: string;
  style?: string | JSX.CSSProperties;
  class?: string;
}) {
  mountStyle(css, "jige-ui-spin-ring");
  return (
    <div
      class={props.class}
      style={combineStyle(
        {
          width: props.size ? `${props.size}px` : "24px",
          height: props.size ? `${props.size}px` : "24px",
          color: props.color ?? "var(--jg-t-hl)",
          display: "inline-block",
        },
        props.style
      )}
    >
      <svg height={"100%"} viewBox="0 0 16 16" width={"100%"}>
        <circle class="spin-ring-indicator" cx="8px" cy="8px" r="7px" />
      </svg>
    </div>
  );
}
