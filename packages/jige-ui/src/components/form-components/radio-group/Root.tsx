import { RadioGroupCore } from 'jige-core'
import type { JSX } from 'solid-js/jsx-runtime'

import css from 'sass:./radio-group.scss'
import { mountStyle } from 'solid-uses'
import { Form } from '~/components/form'

export function RadioFormBind(props: {
  propDisabled?: boolean
  children: JSX.Element
}) {
  const [radioState, radioActions] = RadioGroupCore.useContext()
  return (
    <Form.Bind
      propDisabled={props.propDisabled}
      value={radioState.value}
      setValue={radioActions.setValue}
      setDisabled={radioActions.setDisabled}
      setName={radioActions.setName}
    >
      {props.children}
    </Form.Bind>
  )
}

export function Root(props: {
  children: JSX.Element
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
}) {
  mountStyle(css, 'jige-ui-radio-group')
  return (
    <RadioGroupCore value={props.value} onChange={props.onChange} disabled={props.disabled}>
      <div {...Form.createNativeComponentAttrs()}>
        <RadioFormBind propDisabled={props.disabled}>{props.children}</RadioFormBind>
      </div>
    </RadioGroupCore>
  )
}
