import css from "sass:./dialog.scss";
import { ModalCore } from "jige-core";
import { For, onMount } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createWatch, makeEventListener, mountStyle } from "solid-tiny-utils";

import { Modal } from "../modal";
import { useModalContext } from "../modal/context";
import { context } from "./context";
import { Footer } from "./footer";
import { Header } from "./header";

function ModalCloseHandle(props: { id: string }) {
  const [modalState] = ModalCore.useContext();
  const [state, actions] = context.useContext();
  const [jgModalState, jgModalActs] = useModalContext();

  createWatch(
    () => modalState.status,
    (s) => {
      if (s === "closed") {
        actions.removeInst(props.id);
      }
    }
  );

  if (!jgModalState.triggerRef) {
    jgModalActs.setState("triggerRef", state.maybeTriggerRef);
  }

  return null;
}

export function Provider(props: { children: JSX.Element }) {
  mountStyle(css, "jige-ui-dialog");

  const Context = context.initial();
  const [state, actions] = Context.value;

  onMount(() => {
    makeEventListener(document, "mouseup", (e) => {
      if (e.target === document.body) {
        return;
      }

      actions.setMaybeTriggerRef(e.target as HTMLElement);
    });
  });

  return (
    <Context.Provider>
      {props.children}
      <For each={state.insts}>
        {(item) => {
          return (
            <Modal open={true}>
              <ModalCloseHandle id={item.id} />
              <Modal.Content width="450px">
                <div class="jg-dialog-content">
                  <div class="jg-dialog-header">
                    <Header
                      onCloseClick={item.onNegativeClick}
                      title={item.title}
                      type={item.type}
                    />
                  </div>
                  <div class="jg-dialog-body">{item.content}</div>
                  <div class="jg-dialog-footer">
                    <Footer
                      negativeText={
                        item.negativeText === undefined
                          ? "取消"
                          : item.negativeText
                      }
                      onNegativeClick={item.onNegativeClick}
                      onPositiveClick={item.onPositiveClick}
                      positiveText={
                        item.positiveText === undefined
                          ? "确定"
                          : item.positiveText
                      }
                      type={item.type}
                    />
                  </div>
                </div>
              </Modal.Content>
            </Modal>
          );
        }}
      </For>
    </Context.Provider>
  );
}
