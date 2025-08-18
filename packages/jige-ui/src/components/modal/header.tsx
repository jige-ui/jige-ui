import { ModalCore } from 'jige-core';
import { Show } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import IconFluentDismiss24Regular from '~icons/fluent/dismiss-24-regular';
import { Button } from '../button';

export function Header(props: {
  hideClose?: boolean;
  children?: JSX.Element;
  label?: string;
  ref?: HTMLDivElement;
}) {
  const [, modalActs] = ModalCore.useContext();

  return (
    <div class="jg-modal-header" ref={props.ref}>
      <div class="jg-modal-header-title">{props.label || props.children}</div>
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
