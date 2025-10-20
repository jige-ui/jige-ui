import { createSignal, Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createWatch } from "solid-tiny-utils";
import { isDef } from "~/common/types";
import { SpinRing } from "../progress-ring";

export function Spin(props: {
  spinning?: boolean;
  percent?: number;
  children?: JSX.Element;
  size?: number;
  delay?: number;
}) {
  const [showSpinner, setShowSpinner] = createSignal(false);

  let timer: ReturnType<typeof setTimeout>;

  createWatch(
    () => props.spinning,
    (spinning) => {
      if (!isDef(spinning)) {
        return;
      }
      const delay = props.delay || 250;
      if (spinning) {
        if (delay > 0) {
          timer = setTimeout(() => {
            setShowSpinner(true);
          }, delay);
        } else {
          setShowSpinner(true);
        }
      } else {
        clearTimeout(timer);
        setShowSpinner(false);
      }
    }
  );

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Show when={showSpinner()}>
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
          <SpinRing size={props.size || 32} />
        </div>
      </Show>
      <div
        style={{
          transition: "opacity 0.3s",
          opacity: showSpinner() ? 0.5 : 1,
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
