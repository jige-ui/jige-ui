import css from 'sass:./combo-box.scss'
import { FloatingUiCore } from 'jige-core'
import type { JSX } from 'solid-js/jsx-runtime'

import { createWatch, mountStyle } from 'jige-utils'
import { Form } from '~/components/form'
import { context } from './context'

export function Root<T>(props: {
  value?: T
  options: { label: string; value: T }[]
  onChange?: (value: T) => void
  disabled?: boolean
  placeholder: string
  children: JSX.Element
  disableBind: boolean
}) {
  mountStyle(css, 'jige-ui-combo-box')

  const Context = context.initial({
    disabled: () => props.disabled,
    value: () => props.value,
    options: () => props.options,
    placeholder: () => props.placeholder,
  })
  const [state, actions] = Context.value

  createWatch(
    () => state.value,
    (v) => {
      props.onChange?.(v)
    },
  )

  return (
    <Context.Provider>
      <Form.Bind
        propDisabled={props.disabled}
        value={state.value}
        setName={actions.setName}
        setValue={actions.setValue}
        setDisabled={actions.setDisabled}
        disableBind={props.disableBind}
      >
        <FloatingUiCore
          disabled={state.disabled}
          trigger='click'
          placement='bottom'
          floatingOption={{
            offset: state.offset,
            flip: false,
            shift: {
              crossAxis: true,
            },
          }}
        >
          {props.children}
        </FloatingUiCore>
      </Form.Bind>
    </Context.Provider>
  )
}
