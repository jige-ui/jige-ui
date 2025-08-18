import type { JSX } from 'solid-js';
import { createWatch } from 'solid-tiny-utils';
import context from './context';

export function Root(props: {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  children: JSX.Element;
}) {
  const Context = context.initial({
    value: () => props.value,
    disabled: () => props.disabled,
    name: () => props.name,
  });
  const [state] = Context.value;

  createWatch(
    () => state.value,
    (v) => {
      props.onChange?.(v);
    }
  );

  return <Context.Provider>{props.children}</Context.Provider>;
}
