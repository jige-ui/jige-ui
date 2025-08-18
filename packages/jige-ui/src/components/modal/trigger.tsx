import { ModalCore } from 'jige-core';
import type { JSX } from 'solid-js/jsx-runtime';
import { context } from './context';

export function Trigger(props: { children: JSX.Element }) {
  const [, actions] = context.useContext();
  return (
    <ModalCore.Trigger
      ref={(el) => {
        actions.setState('triggerRef', el);
      }}
    >
      {props.children}
    </ModalCore.Trigger>
  );
}
