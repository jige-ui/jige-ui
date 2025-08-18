import { mergeRefs } from '@solid-primitives/refs';
import type { ValidComponent } from 'solid-js';
import { splitProps } from 'solid-js';
import type { DynamicProps } from 'solid-js/web';
import { Dynamic } from 'solid-js/web';
import context from './context';

export function Trigger<T extends ValidComponent = 'div'>(
  props: { as?: T; ref?: HTMLElement | ((el: HTMLElement) => void) } & Omit<
    DynamicProps<T>,
    'onContextMenu' | 'component'
  >
) {
  const [state, actions] = context.useContext();
  const [local, others] = splitProps(props, ['as', 'ref']);

  return (
    <Dynamic
      component={local.as || 'div'}
      {...others}
      data-cm-status={state.status}
      onContextMenu={(e: any) => {
        e.preventDefault();
        actions.setState({
          clientX: e.clientX,
          clientY: e.clientY,
        });
        actions.setOpen(true);
      }}
      ref={mergeRefs(local.ref, (el) => {
        actions.setState('triggerEl', el);
      })}
    />
  );
}
