import { mergeRefs, Ref } from '@solid-primitives/refs';
import { createMemo, onCleanup, onMount, splitProps } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { makeEventListener } from 'solid-tiny-utils';
import { hiddenStyle } from '@/common/dom';
import type { MaybeContextChild } from '@/common/props';
import { callMaybeContextChild } from '@/common/props';
import { runSolidEventHandler } from '@/common/solidjs';
import context from './context';
import itemContext from './item-context';

function Item(props: {
  children: JSX.Element;
  value: string;
  disabled?: boolean;
}) {
  const Context = itemContext.initial({
    value: () => props.value,
    disabled: () => props.disabled,
  });

  return <Context.Provider>{props.children}</Context.Provider>;
}

function ItemNative(
  props: Omit<
    JSX.InputHTMLAttributes<HTMLInputElement>,
    | 'style'
    | 'type'
    | 'aria-checked'
    | 'value'
    | 'name'
    | 'checked'
    | 'disabled'
  >
) {
  const [state, actions] = context.useContext();
  const [itemState, itemActions] = itemContext.useContext();
  const [localProps, otherProps] = splitProps(props, ['ref', 'onChange']);

  const checked = createMemo(() => state.value.includes(itemState.value));

  onCleanup(() => {
    actions.removeValue(itemState.value);
  });

  return (
    <input
      {...otherProps}
      aria-checked={checked()}
      checked={checked()}
      disabled={state.disabled || itemState.disabled}
      name={state.name}
      onChange={(e) => {
        e.stopPropagation();
        if (e.target.checked) {
          actions.pushValue(itemState.value);
        } else {
          actions.removeValue(itemState.value);
        }
        runSolidEventHandler(e, localProps.onChange);
      }}
      ref={mergeRefs(localProps.ref, (r) => {
        itemActions.setState('nativeEl', r);
      })}
      style={hiddenStyle}
      type="checkbox"
      value="on"
    />
  );
}

function ItemControl(props: {
  children: MaybeContextChild<ReturnType<typeof context.useContext>>;
}) {
  const [itemState] = itemContext.useContext();

  let ref!: HTMLElement;

  onMount(() => {
    makeEventListener(ref, 'click', (e) => {
      e.preventDefault();
      itemState.nativeEl?.click();
      itemState.nativeEl?.focus();
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

export { Item, ItemControl, ItemNative };
