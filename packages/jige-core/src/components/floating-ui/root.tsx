import type { JSX } from 'solid-js/jsx-runtime';
import { createWatch } from 'solid-tiny-utils';
import { context } from './context';
import type { FloatingUiCoreProps } from './props';

export function Root(props: { children: JSX.Element } & FloatingUiCoreProps) {
  const Context = context.initial({
    trigger: () => props.trigger,
    originalPlacement: () => props.placement,
    openDelay: () => props.openDelay,
    closeDelay: () => props.closeDelay,
    canHoverContent: () => props.canHoverContent,
    disabled: () => props.disabled,
    plugin: () => ({
      ...context.defaultValue().plugin,
      ...props.floatingOption,
    }),
  });
  const [state, actions] = Context.value;

  createWatch(
    [
      () => state.originalPlacement,
      () => ({ ...state.plugin }),
      () => state.arrow,
    ],
    () => {
      actions.updatePos();
      if (IS_DEV) {
        console.log('float pos updated by root');
      }
    }
  );

  return <Context.Provider>{props.children}</Context.Provider>;
}
