import { Ref } from '@solid-primitives/refs';
import { onMount } from 'solid-js';
import { createWatch, makeEventListener } from 'solid-tiny-utils';
import type { MaybeContextChild, PropsWithContextChild } from '@/common/props';
import { callMaybeContextChild } from '@/common/props';
import context from './context';

export function Control(props: {
  children: MaybeContextChild<ReturnType<typeof context.useContext>>;
}) {
  const [state] = context.useContext();
  let ref!: HTMLElement;

  onMount(() => {
    makeEventListener(ref, 'click', (e) => {
      e.preventDefault();
      state.$nativeEl?.click();
      state.$nativeEl?.focus();
    });

    makeEventListener(ref, 'mousedown', (e) => {
      e.preventDefault();
    });
  });
  return (
    <Ref ref={ref}>
      {callMaybeContextChild(context.useContext(), props.children)}
    </Ref>
  );
}

export function Root(
  props: PropsWithContextChild<
    ReturnType<typeof context.useContext>,
    {
      checked?: boolean;
      onChange?: (value: boolean) => void;
      disabled?: boolean;
    }
  >
) {
  const Context = context.initial({
    checked: () => props.checked,
    disabled: () => props.disabled,
  });
  const [state] = Context.value;

  createWatch(
    () => state.checked,
    (c) => {
      c !== props.checked && props.onChange?.(c);
    },
    { defer: true }
  );

  return (
    <Context.Provider>
      {callMaybeContextChild(context.useContext(), props.children)}
    </Context.Provider>
  );
}
