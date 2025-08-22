import type { JSX } from 'solid-js/jsx-runtime';
import { createWatch } from 'solid-tiny-utils';
import context from './context';

export function Root(props: {
  children: JSX.Element;
  name?: string;
  value?: string[];
  onChange?: (v: string[]) => void;
  disabled?: boolean;
}) {
  const Context = context.initial({
    disabled: () => props.disabled,
    value: () => props.value,
    name: () => props.name,
  });
  const [state] = Context.value;

  createWatch(
    () => state.value,
    (v) => {
      v !== props.value && props.onChange?.(v);
    },
    { defer: true }
  );

  return <Context.Provider>{props.children}</Context.Provider>;
}
