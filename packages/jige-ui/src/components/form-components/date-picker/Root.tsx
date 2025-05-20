import inputCss from 'sass:../input/input.scss'
import styles from 'sass:./date-picker.scss'
import type { JSX } from 'solid-js/jsx-runtime'
import { mountStyle, watch } from 'solid-uses'
import { Form } from '~/components/form'
import { Popover } from '../../popover'
import { context } from './context'
import type { DatePickerType, DateTypes } from './types'
import { batch } from 'solid-js'
import { isDef } from '~/common/types'

export function Root(props: {
  children: JSX.Element
  value?: string
  onChange?: (value: string) => void
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

  watch(
    () => props.value,
    (v) => {
      isDef(v) && actions.setValue(v)
    },
  )

  watch(
    () => state.type,
    () => {
      actions.setValue('')
    },
    { defer: true },
  )

  watch(
    () => state.value,
    (v) => {
      props.onChange?.(v)
    },
  )

  watch(
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
