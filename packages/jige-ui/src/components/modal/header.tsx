import { ModalCore } from "jige-core";
import { Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { Button } from "../button";
import { IconFluentDismiss24Regular } from "../icons/fluent-dismiss-24-regular";

export function Header(props: {
  hideClose?: boolean;
  class?: string;
  style?: string | JSX.CSSProperties;
  title?: string;
  description?: string;
}) {
  const [, modalActs] = ModalCore.useContext();

  return (
    <div class="jg-modal-header">
      <div class="jg-modal-header-title">{props.title}</div>
      <div class="jg-modal-header-description">{props.description}</div>
      <div class="jg-modal-header-close">
        <Show when={!props.hideClose}>
          <Button
            color="var(--jg-fg3)"
            icon={<IconFluentDismiss24Regular />}
            onClick={() => {
              modalActs.setOpen(false);
            }}
            variant="text"
          />
        </Show>
      </div>
    </div>
  );
}
