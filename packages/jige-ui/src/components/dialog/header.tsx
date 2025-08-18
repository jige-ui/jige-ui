import { ModalCore } from 'jige-core';
import { createMemo, Match, Switch } from 'solid-js';
import IconFluentCheckmarkCircle24Filled from '~icons/fluent/checkmark-circle-24-filled';
import IconFluentDismiss24Regular from '~icons/fluent/dismiss-24-regular';
import IconFluentDismissCircle24Filled from '~icons/fluent/dismiss-circle-24-filled';
import IconFluentErrorCircle24Filled from '~icons/fluent/error-circle-24-filled';
import IconFluentInfo24Filled from '~icons/fluent/info-24-filled';
import { Button } from '../button';

export function Header(props: {
  type: 'error' | 'warning' | 'success' | 'info';
  title: string;
  onCloseClick?: () => void;
}) {
  const [, actions] = ModalCore.useContext();
  const color = createMemo(() => {
    switch (props.type) {
      case 'error':
        return 'var(--jg-fg-danger)';
      case 'success':
        return 'var(--jg-fg-success)';
      case 'warning':
        return 'var(--jg-fg-warning)';
      default:
        return 'var(--jg-fg-info)';
    }
  });
  return (
    <>
      <div
        style={{
          display: 'flex',
          'align-items': 'center',
        }}
      >
        <div
          style={{
            color: color(),
            'font-size': '24px',
          }}
        >
          <Switch>
            <Match when={props.type === 'error'}>
              <IconFluentDismissCircle24Filled />
            </Match>
            <Match when={props.type === 'success'}>
              <IconFluentCheckmarkCircle24Filled />
            </Match>
            <Match when={props.type === 'warning'}>
              <IconFluentErrorCircle24Filled />
            </Match>
            <Match when={props.type === 'info'}>
              <IconFluentInfo24Filled />
            </Match>
          </Switch>
        </div>
        <div
          style={{
            'margin-left': '8px',
            'font-size': '18px',
          }}
        >
          {props.title}
        </div>
      </div>
      <Button
        color="var(--jg-fg4)"
        icon={<IconFluentDismiss24Regular />}
        onClick={() => {
          actions.setOpen(false);
          props.onCloseClick?.();
        }}
        style={{
          opacity: 0.85,
        }}
        variant="text"
      />
    </>
  );
}
