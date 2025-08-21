import { children, type JSX, Show } from 'solid-js';
import { Button } from '../button';
import { IconFluentDismiss24Regular } from '../icons/fluent-dismiss-24-regular';
import { Close } from './close';

export function Header(props: {
  hideClose?: boolean;
  class?: string;
  style?: string | JSX.CSSProperties;
  children?: JSX.Element;
  title?: string;
}) {
  const child = children(() => props.children);
  return (
    <div
      class={['jg-drawer-header', props.class].join(' ')}
      style={props.style}
    >
      <Show when={!props.hideClose}>
        <Close>
          <Button
            class="jg-drawer-close"
            icon={<IconFluentDismiss24Regular />}
            variant="text"
          />
        </Close>
      </Show>
      <Show fallback={<span>{props.title}</span>} when={child()}>
        {child()}
      </Show>
    </div>
  );
}
