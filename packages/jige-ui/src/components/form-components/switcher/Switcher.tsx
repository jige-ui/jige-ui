import { SwitcherCore } from 'jige-core'
import type { JSX } from 'solid-js'

import styles from 'sass:./switcher.scss'
import { Match, Show, Switch, createMemo } from 'solid-js'
import { mountStyle } from 'solid-uses'
import { dataIf } from '~/common/dataset'
import { Form } from '~/components/form'
import { AnimatedChecked } from '../../icons'

function SwitcherBind(props: {
  children: JSX.Element
  propDisabled?: boolean
}) {
  const [state, actions] = SwitcherCore.useContext()
  return (
    <Form.Bind
      propDisabled={props.propDisabled}
      value={state.checked}
      setDisabled={actions.setDisabled}
      setValue={actions.setChecked}
      setName={actions.setName}
    >
      {props.children}
    </Form.Bind>
  )
}

export function Switcher(props: {
  onChange?: (checked: boolean) => void
  value?: boolean
  type?: 'checkbox' | 'switcher'
  disabled?: boolean
}) {
  mountStyle(styles, 'jige-ui-switcher')

  const type = createMemo(() => props.type || 'switcher')
  return (
    <SwitcherCore checked={props.value} onChange={props.onChange} disabled={props.disabled}>
      <SwitcherBind propDisabled={props.disabled}>
        <SwitcherCore.Native class='jg-switcher-native' {...Form.createNativeComponentAttrs()} />
        <Switch>
          <Match when={type() === 'checkbox'}>
            <SwitcherCore.Control>
              {(state) => (
                <div
                  class='jg-switcher-control jg-switcher-checkbox'
                  data-checked={dataIf(state.checked)}
                  data-disabled={dataIf(state.disabled)}
                >
                  <Show when={state.checked}>
                    <i class='jg-switcher-icon'>
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
                  class='jg-switcher-control jg-switcher-switcher'
                  data-disabled={dataIf(state.disabled)}
                >
                  <div class='jg-switcher-thumb' data-checked={dataIf(state.checked)} />
                </div>
              )}
            </SwitcherCore.Control>
          </Match>
        </Switch>
      </SwitcherBind>
    </SwitcherCore>
  )
}
