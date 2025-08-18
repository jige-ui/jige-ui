/* eslint-disable solid/reactivity */
import { ModalCore } from 'jige-core';
import { createMemo, Show } from 'solid-js';
import { Button } from '../button';

export function Footer(props: {
  type: 'error' | 'warning' | 'success' | 'info';
  positiveText: string;
  negativeText: string;
  onPositiveClick?: () => void | Promise<void>;
  onNegativeClick?: () => void | Promise<void>;
}) {
  const [, actions] = ModalCore.useContext();

  const color = createMemo(() => {
    return `var(--jg-fg-${props.type === 'error' ? 'danger' : props.type})`;
  });
  return (
    <div
      style={{
        display: 'flex',
        'align-items': 'center',
        gap: '8px',
        padding: '8px',
      }}
    >
      <Show when={props.negativeText}>
        <Button
          color="var(--jg-fg3)"
          label={props.negativeText}
          onClick={async () => {
            await props.onNegativeClick?.();
            actions.setOpen(false);
          }}
          variant="text"
        />
      </Show>
      <Show when={props.positiveText}>
        <Button
          color={color()}
          label={props.positiveText}
          onClick={async () => {
            await props.onPositiveClick?.();
            actions.setOpen(false);
          }}
        />
      </Show>
    </div>
  );
}
