import css from 'sass:./checkbox-group.scss';
import { CheckboxGroupCore } from 'jige-core';
import { type ComponentProps, splitProps } from 'solid-js';
import { mountStyle } from 'solid-tiny-utils';
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
  mountStyle(css, 'jige-ui-checkbox-group');
  const [localProps, others] = splitProps(props, [
    'value',
    'disabled',
    'size',
    'onChange',
  ]);
  const Context = context.initial({
    size: () => localProps.size,
  });
  return (
    <Context.Provider>
      <CheckboxGroupCore
        disabled={localProps.disabled}
        onChange={localProps.onChange as any}
        value={localProps.value as string[]}
      >
        <div {...others} />
      </CheckboxGroupCore>
    </Context.Provider>
  );
}
