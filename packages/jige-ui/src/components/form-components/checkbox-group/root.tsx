import { type ComponentProps, splitProps } from 'solid-js';
import { createWatch } from 'solid-tiny-utils';
import type { SimpleType } from '~/common/types';
import { context } from './context';

export function Root<T extends SimpleType>(
  props: {
    value?: T[];
    disabled?: boolean;
    onChange?: (value: T[]) => void;
    size?: 'small' | 'medium' | 'large';
  } & ComponentProps<'div'>
) {
  const [localProps, others] = splitProps(props, [
    'value',
    'disabled',
    'size',
    'onChange',
  ]);
  const Context = context.initial({
    size: () => localProps.size,
    disabled: () => localProps.disabled,
    value: () => localProps.value as string[],
  });

  const [state] = Context.value;

  createWatch(
    () => state.value,
    () => {
      localProps.onChange?.(state.value as T[]);
    },
    { defer: true }
  );

  return (
    <Context.Provider>
      <div {...others} />
    </Context.Provider>
  );
}
