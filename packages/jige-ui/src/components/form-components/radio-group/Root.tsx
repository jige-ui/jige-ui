import { RadioGroupCore } from 'jige-core'
import type { JSX } from 'solid-js/jsx-runtime'

import css from 'sass:./radio-group.scss'
import { mountStyle } from 'jige-utils'
import { Form } from '~/components/form'

export function RadioFormBind(props: {
  propDisabled?: boolean
  children: JSX.Element
  disableBind?: boolean
}) {
  const [radioState, radioActions] = RadioGroupCore.useContext()
  return (
    <Form.Bind
      propDisabled={props.propDisabled}
      value={radioState.value}
      setValue={(v) => {
        radioActions.setState('value', v)
      }}
      setDisabled={(d) => {
        radioActions.setState('disabled', d)
      }}
      setName={(n) => {
        radioActions.setState('name', n)
      }}
      disableBind={props.disableBind}
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
  disableBind?: boolean
}) {
  mountStyle(css, 'jige-ui-radio-group')
  return (
    <RadioGroupCore value={props.value} onChange={props.onChange} disabled={props.disabled}>
      <div {...Form.createNativeComponentAttrs()}>
        <RadioFormBind propDisabled={props.disabled} disableBind={props.disableBind}>
          {props.children}
        </RadioFormBind>
      </div>
    </RadioGroupCore>
  )
}
