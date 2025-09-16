import styles from "sass:./spin.scss";
import { For, mergeProps, Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { list, mountStyle } from "solid-tiny-utils";

function NormalRotateSpin(props: { size?: number }) {
  const realProps = mergeProps({ size: 12 }, props);

  return (
    <div
      class="jg-spin-normal"
      style={{
        width: `${realProps.size * 2.5}px`,
        height: `${realProps.size * 2.5}px`,
      }}
    >
      <For each={list(3)}>
        {() => (
          <div
            style={{
              width: `${realProps.size}px`,
              height: `${realProps.size}px`,
            }}
          />
        )}
      </For>
    </div>
  );
}

export function Spin(props: {
  spinning?: boolean;
  percent?: number;
  children?: JSX.Element;
  size?: number;
}) {
  mountStyle(styles, "jige-ui-spin");

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
          <NormalRotateSpin size={props.size} />
        </div>
      </Show>
      <div
        classList={{
          "jg-spin-is-spinning": props.spinning,
        }}
        style={{
          transition: "opacity 0.3s",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
