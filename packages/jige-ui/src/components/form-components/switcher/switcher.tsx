import styles from 'sass:./switcher.scss';
import { SwitcherCore } from 'jige-core';
import { createMemo, Match, Show, Switch } from 'solid-js';
import { mountStyle } from 'solid-tiny-utils';
import { dataIf } from '~/common/dataset';
import { AnimatedChecked } from '../../icons';

export function Switcher(props: {
  onChange?: (checked: boolean) => void;
  value?: boolean;
  type?: 'checkbox' | 'switcher';
  disabled?: boolean;
}) {
  mountStyle(styles, 'jige-ui-switcher');

  const type = createMemo(() => props.type || 'switcher');
  return (
    <SwitcherCore
      checked={props.value}
      disabled={props.disabled}
      onChange={props.onChange}
    >
      <SwitcherCore.Native class="jg-switcher-native" />
      <Switch>
        <Match when={type() === 'checkbox'}>
          <SwitcherCore.Control>
            {(state) => (
              <div
                class="jg-switcher-control jg-switcher-checkbox"
                data-checked={dataIf(state.checked)}
                data-disabled={dataIf(state.disabled)}
              >
                <Show when={state.checked}>
                  <i class="jg-switcher-icon">
                    <AnimatedChecked />
                  </i>
                </Show>
              </div>
            )}
          </SwitcherCore.Control>
        </Match>
        <Match when={type() === 'switcher'}>
          <SwitcherCore.Control>
            {(state) => (
              <div
                class="jg-switcher-control jg-switcher-switcher"
                data-disabled={dataIf(state.disabled)}
              >
                <div
                  class="jg-switcher-thumb"
                  data-checked={dataIf(state.checked)}
                />
              </div>
            )}
          </SwitcherCore.Control>
        </Match>
      </Switch>
    </SwitcherCore>
  );
}
