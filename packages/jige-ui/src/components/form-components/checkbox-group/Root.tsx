import css from 'sass:./checkbox-group.scss'
import { CheckboxGroupCore } from 'jige-core'
import { mountStyle } from 'jige-utils'
import { type ComponentProps, type JSX, splitProps } from 'solid-js'
import type { SimpleType } from '~/common/types'
import { Form } from '~/components/form'
import { context } from './context'

function CheckboxGroupBind(props: {
  children: JSX.Element
  propDisabled?: boolean
  disableBind?: boolean
}) {
  const [state, actions] = CheckboxGroupCore.useContext()
  return (
    <Form.Bind
      propDisabled={props.propDisabled}
      value={state.value}
      setDisabled={(disabled) => {
        actions.setState('disabled', disabled)
      }}
      setValue={(v) => {
        actions.setState('value', v)
      }}
      setName={(name) => {
        actions.setState('name', name)
      }}
      disableBind={props.disableBind}
    >
      {props.children}
    </Form.Bind>
  )
}

export function Root<T extends SimpleType>(
  props: {
    value?: T[]
    disabled?: boolean
    onChange?: (value: T[]) => void
    disableBind?: boolean
    size?: 'small' | 'medium' | 'large'
  } & ComponentProps<'div'>,
) {
  mountStyle(css, 'jige-ui-checkbox-group')
  const [localProps, others] = splitProps(props, [
    'value',
    'disabled',
    'disableBind',
    'size',
    'onChange',
  ])
  const Context = context.initial({
    size: () => localProps.size,
  })
  return (
    <Context.Provider>
      <CheckboxGroupCore
        value={localProps.value as string[]}
        onChange={localProps.onChange as any}
        disabled={localProps.disabled}
      >
        <CheckboxGroupBind propDisabled={localProps.disabled} disableBind={localProps.disableBind}>
          <div {...others} />
        </CheckboxGroupBind>
      </CheckboxGroupCore>
    </Context.Provider>
  )
}
