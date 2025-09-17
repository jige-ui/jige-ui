import { Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { SpinRing } from "../progress-ring";

export function Spin(props: {
  spinning?: boolean;
  percent?: number;
  children?: JSX.Element;
  size?: number;
}) {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Show when={props.spinning}>
        <div
          style={{
            position: "absolute",
            display: "flex",
            "align-items": "center",
            "justify-content": "center",
            inset: 0,
            "z-index": 1000,
          }}
        >
          <SpinRing size={props.size} />
        </div>
      </Show>
      <div
        style={{
          transition: "opacity 0.3s",
          opacity: props.spinning ? 0.5 : 1,
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
