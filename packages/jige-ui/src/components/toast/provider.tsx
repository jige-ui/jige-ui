import css from "sass:./toast.scss";
import { For } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { Portal } from "solid-js/web";

import { mountStyle } from "solid-tiny-utils";
import { JigeRootContext } from "../root";
import { context } from "./context";
import { Toast } from "./toast";

export function Provider(props: {
  children: JSX.Element;
  /**
   * default timeout is 5000 (ms)
   *
   * ms
   */
  defaultTimeout?: number;
  zIndex?: number;
}) {
  mountStyle(css, "jige-ui-toast");

  const Context = context.initial({
    defaultTimeout: () => props.defaultTimeout,
  });
  const [state] = Context.value;
  const [rootState] = JigeRootContext.useContext();

  return (
    <Context.Provider>
      {props.children}
      <Portal mount={document.body}>
        <div
          class="jg-toast-container"
          style={{
            "z-index": rootState.zIndexConfig.toast,
          }}
        >
          <For each={state.insts}>
            {(item) => {
              return (
                <Toast
                  inst={{
                    ...item,
                    timeout: item.timeout || state.defaultTimeout,
                  }}
                />
              );
            }}
          </For>
        </div>
      </Portal>
    </Context.Provider>
  );
}
