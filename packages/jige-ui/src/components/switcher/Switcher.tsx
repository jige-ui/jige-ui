import { SwitcherCore } from 'jige-core'
import styles from 'sass:./switcher.scss'

import { createMemo, Match, Show, Switch } from 'solid-js'
import { mountStyle } from 'solid-uses'
import { setData } from '~/common/dataset'
import { AnimatedChecked } from '../icons'

export function Switcher(props: { onChange?: (checked: boolean) => void, value?: boolean, type?: 'checkbox' | 'switcher' }) {
  mountStyle(styles, 'jige-ui-switcher')

  const type = createMemo(() => props.type || 'switcher')
  return (
    <SwitcherCore checked={props.value} onChange={props.onChange}>
      <SwitcherCore.Native class="jg-switcher-native" />
      <Switch>
        <Match when={type() === 'checkbox'}>
          <SwitcherCore.Control>
            {state => (
              <div class="jg-switcher-control jg-switcher-checkbox" {...setData('checked', state.checked)}>
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
            {state => (
              <div class="jg-switcher-control jg-switcher-switcher">
                <div class="jg-switcher-thumb" {...setData('checked', state.checked)} />
              </div>
            )}
          </SwitcherCore.Control>
        </Match>
      </Switch>
    </SwitcherCore>
  )
}
