import type { JSX } from 'solid-js';
import type { SimpleType } from '~/common/types';
import { Checkbox } from '../checkbox';
import { context } from './context';

export function Item<T extends SimpleType>(props: {
  disabled?: boolean;
  value: T;
  children: JSX.Element;
}) {
  const [state, acts] = context.useContext();

  return (
    <Checkbox
      checked={state.value.includes(props.value as string)}
      disabled={Boolean(state.disabled || props.disabled)}
      name={state.name}
      onChange={(checked) => {
        if (checked) {
          acts.pushValue(props.value as string);
        } else {
          acts.removeValue(props.value as string);
        }
      }}
      size={state.size}
    >
      {props.children}
    </Checkbox>
  );
}
