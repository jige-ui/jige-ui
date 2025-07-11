import inputCss from 'sass:../input/input.scss'
import styles from 'sass:./date-picker.scss'
import { createWatch, mountStyle } from 'jige-utils'
import { batch } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { isDef } from '~/common/types'
import { Form } from '~/components/form'
import { Popover } from '../../popover'
import { context } from './context'
import type { DatePickerType, DateTypes } from './types'

export function Root(props: {
  children: JSX.Element
  value?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  dateRange?: [DateTypes, DateTypes]
  disabled?: boolean
  type?: DatePickerType
  placeholder?: string
  disableBind: boolean
}) {
  mountStyle(styles, 'jige-ui-date-picker')
  mountStyle(inputCss, 'jige-ui-input')
  const Context = context.initial({
    valueFormat: () => {
      switch (props.type) {
        case 'month':
          return 'YYYY-MM'
        case 'hour':
          return 'YYYY-MM-DD HH'
        case 'minute':
          return 'YYYY-MM-DD HH:mm'
        case 'second':
          return 'YYYY-MM-DD HH:mm:ss'
        default:
          return 'YYYY-MM-DD'
      }
    },
    dateRange: () => props.dateRange,
    disabled: () => props.disabled,
    type: () => props.type,
    placeholder: () => props.placeholder,
    activePanel: () => {
      switch (props.type) {
        case 'month':
          return 'month'
        default:
          return 'day'
      }
    },
  })

  const [state, actions] = Context.value

  createWatch(
    () => props.value,
    (v) => {
      isDef(v) && actions.setValue(v)
    },
  )

  createWatch(
    () => state.type,
    () => {
      actions.setValue('')
    },
    { defer: true },
  )

  createWatch(
    () => state.value,
    (v) => {
      props.onChange?.(v)
    },
  )

  createWatch(
    () => state.dateValue,
    () => {
      const inst = state.inst

      if (!inst.isValid()) return

      batch(() => {
        actions.setCurrYear(inst.year())
        actions.setCurrMonth(inst.month())
      })
    },
  )

  createWatch(
    () => state.focused,
    (focused) => {
      if (focused) {
        props.onFocus?.()
      } else {
        props.onBlur?.()
      }
    },
    { defer: true },
  )

  return (
    <Context.Provider>
      <Popover placement='bottom-start' trigger='manual' disabled={state.disabled}>
        <Form.Bind
          propDisabled={props.disabled}
          value={state.value}
          setValue={actions.setValue}
          setDisabled={actions.setDisabled}
          setName={actions.setName}
          disableBind={props.disableBind}
        >
          {props.children}
        </Form.Bind>
      </Popover>
    </Context.Provider>
  )
}
