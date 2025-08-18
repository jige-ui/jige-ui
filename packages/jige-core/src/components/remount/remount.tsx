import type { JSX } from 'solid-js';
import { createSignal, Show } from 'solid-js';
import { createWatch } from 'solid-tiny-utils';

export function Remount(props: {
  remountWhenChange: any;
  children: JSX.Element;
}) {
  const [show, setShow] = createSignal(true);
  createWatch(
    () => props.remountWhenChange,
    () => {
      setShow(false);
      requestAnimationFrame(() => setShow(true));
    },
    { defer: true }
  );

  return <Show when={show()}>{props.children}</Show>;
}
