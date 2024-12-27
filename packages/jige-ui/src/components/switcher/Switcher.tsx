import { SwitcherCore } from 'jige-core'
import styles from 'sass:./switcher.scss'

import { createMemo, Match, Switch } from 'solid-js'
import { mountStyle } from 'solid-uses'

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
              <div class="jg-switcher-control jg-switcher-checkbox">
                <div class="jg-switcher-thumb" data-checked={state.checked || undefined} />
              </div>
            )}
          </SwitcherCore.Control>
        </Match>
        <Match when={type() === 'switcher'}>
          <SwitcherCore.Control>
            {state => (
              <div class="jg-switcher-control jg-switcher-switcher">
                <div class="jg-switcher-thumb" data-checked={state.checked || undefined} />
              </div>
            )}
          </SwitcherCore.Control>
        </Match>
      </Switch>
    </SwitcherCore>
  )
}
