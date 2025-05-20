import type { JSX } from 'solid-js/jsx-runtime'
import { context } from './context'

import css from 'sass:./time-picker.scss'
import { mountStyle, watch } from 'solid-uses'
import { Form } from '~/components/form'
import { Popover } from '~/components/popover'

export function Root(props: {
  children: JSX.Element
  type?: 'hour' | 'minute' | 'second'
  disableBind?: boolean
  disabled?: boolean
  size?: 'small' | 'medium'
  value?: string
  onChange?: (value: string) => void
}) {
  mountStyle(css, 'jige-time-picker')
  const Context = context.initial({
    type: () => props.type,
    disabled: () => props.disabled,
    triggerHeight: () => {
      return props.size === 'small' ? 24 : 32
    },
    triggerWidth: () => {
      return props.size === 'small' ? 96 : 128
    },
  })
  const [state, actions] = Context.value

  watch(
    () => state.asStr,
    (v) => {
      props.onChange?.(v)
    },
    { defer: true },
  )

  watch(
    () => props.value,
    (value) => {
      if (value && value !== state.asStr) {
        actions.setValue(value)
      }
    },
  )

  return (
    <Context.Provider>
      <Context.Provider>
        <Form.Bind
          propDisabled={props.disabled}
          value={state.asStr}
          setName={actions.setName}
          setValue={actions.setValue}
          setDisabled={actions.setDisabled}
          disableBind={props.disableBind}
        >
          <Popover
            disabled={state.disabled}
            trigger='click'
            placement='bottom'
            floatingOption={{
              offset: () => {
                return -state.triggerHeight * 4 - 8
              },
              flip: false,
              shift: {
                crossAxis: true,
              },
            }}
          >
            {props.children}
          </Popover>
        </Form.Bind>
      </Context.Provider>
    </Context.Provider>
  )
}
