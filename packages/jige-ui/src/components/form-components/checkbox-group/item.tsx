import { CheckboxGroupCore, dataIf } from 'jige-core';
import { createMemo, createUniqueId, type JSX, Show } from 'solid-js';
import type { SimpleType } from '~/common/types';
import { AnimatedChecked } from '~/components/icons';
import { context } from './context';

export function Item<T extends SimpleType>(props: {
  disabled?: boolean;
  value: T;
  children: JSX.Element;
}) {
  const [groupState] = context.useContext();
  const itemID = `checkbox_item__${createUniqueId()}`;
  return (
    <CheckboxGroupCore.Item
      disabled={props.disabled}
      value={props.value as string}
    >
      <CheckboxGroupCore.ItemNative id={itemID} />
      <CheckboxGroupCore.ItemControl>
        {(state) => {
          const checked = createMemo(() =>
            state.value.includes(props.value as string)
          );
          return (
            <div
              class="jg-checkbox-item"
              data-disabled={dataIf(state.disabled)}
              data-large={dataIf(groupState.size === 'large')}
              data-medium={dataIf(
                groupState.size !== 'small' && groupState.size !== 'large'
              )}
              data-small={dataIf(groupState.size === 'small')}
            >
              <div
                class="jg-checkbox-box"
                data-checked={dataIf(checked())}
                data-disabled={dataIf(state.disabled)}
              >
                <Show when={checked()}>
                  <i class="jg-checkbox-icon">
                    <AnimatedChecked />
                  </i>
                </Show>
              </div>
              <label
                for={itemID}
                style={{
                  'margin-left': '.5em',
                }}
              >
                {props.children}
              </label>
            </div>
          );
        }}
      </CheckboxGroupCore.ItemControl>
    </CheckboxGroupCore.Item>
  );
}
