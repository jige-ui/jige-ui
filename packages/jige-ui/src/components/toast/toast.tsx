import { getElementHeight, hasAnimation } from "jige-core";
import { createSignal, onMount } from "solid-js";
import { createWatch } from "solid-tiny-utils";
import type { CloseableStatus } from "~/common/types";
import { context } from "./context";
import { Header } from "./header";
import type { ToastInst } from "./types";

export function Toast(props: { inst: ToastInst }) {
  const [, actions] = context.useContext();
  let $bar!: HTMLDivElement;
  let $wrapper!: HTMLDivElement;

  const [pause, setPause] = createSignal(false);
  const [status, setStatus] = createSignal<CloseableStatus>("opening");

  onMount(() => {
    requestAnimationFrame(() => {
      $bar.style.width = "0";
    });

    createWatch(
      pause,
      (p) => {
        const percent = $bar.clientWidth / $bar.parentElement!.clientWidth;
        if (p) {
          $bar.style.width = `${percent * 100}%`;
          $bar.style.transition = "none";
        } else {
          $bar.style.width = "0";
          $bar.style.transition = `width ${props.inst.timeout! * percent}ms linear`;
        }
      },
      { defer: true }
    );

    createWatch(status, (s) => {
      $wrapper.style.setProperty("--height", `${getElementHeight($wrapper)}px`);
      if (s.endsWith("ing") && !hasAnimation($wrapper)) {
        setStatus(status().replace("ing", "ed") as CloseableStatus);
      }

      if (s === "closed") {
        actions.removeInst(props.inst.id);
      }
    });
  });

  return (
    <div
      class="jg-toast-wrapper"
      data-status={status()}
      onAnimationEnd={() => {
        setStatus(status().replace("ing", "ed") as CloseableStatus);
      }}
      ref={$wrapper}
    >
      <div
        style={{
          "padding-top": "1em",
          "padding-right": "1em",
          "padding-left": "1em",
          "padding-bottom": "4px",
        }}
      >
        <div
          class="jg-toast"
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
        >
          <div class="jg-toast-header">
            <Header
              onCloseClick={() => {
                setStatus("closing");
              }}
              title={props.inst.title}
              type={props.inst.type}
            />
          </div>
          <div class="jg-toast-body">{props.inst.content}</div>
          <div class="jg-toast-progress">
            <div
              class="jg-toast-progress-bar"
              onTransitionEnd={() => {
                setStatus("closing");
              }}
              ref={$bar}
              style={{
                transition: `width ${props.inst.timeout}ms linear`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
