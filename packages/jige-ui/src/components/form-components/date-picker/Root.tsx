import inputCss from 'sass:../input/input.scss'
import styles from 'sass:./date-picker.scss'
import type { JSX } from 'solid-js/jsx-runtime'
import { mountStyle, watch } from 'solid-uses'
import { Form } from '~/components/form'
import { Popover } from '../../popover'
import { context } from './context'
import type { DatePickerType, DateTypes } from './types'

export function Root(props: {
  children: JSX.Element
  value?: string
  valueFormat?: string
  onChange?: (value: string) => void
  dateRange?: [DateTypes, DateTypes]
  disabled?: boolean
  type?: DatePickerType
  placeholder?: string
}) {
  mountStyle(styles, 'jige-ui-date-picker')
  mountStyle(inputCss, 'jige-ui-input')
  const Context = context.initial({
    valueFormat: () => {
      if (props.valueFormat) {
        return props.valueFormat
      }
      switch (props.type) {
        case 'month':
          return 'YYYY-MM'
        case 'year':
          return 'YYYY'
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
        case 'year':
          return 'year'
        default:
          return 'day'
      }
    },
  })

  const [state, actions] = Context.value

  watch(
    () => props.value,
    (v) => {
      v && actions.setValue(v)
    },
  )

  watch(
    () => state.type,
    () => {
      actions.setValue('')
    },
    { defer: true },
  )

  watch([() => state.value, () => state.valueFormat], ([v]) => {
    props.onChange?.(v)
    const inst = state.inst

    actions.setCurrYear(inst.year())
    actions.setCurrMonth(inst.month())
  })

  return (
    <Context.Provider>
      <Popover placement='bottom-start' trigger='manual' disabled={state.disabled}>
        <Form.Bind
          propDisabled={props.disabled}
          value={state.value}
          setValue={actions.setValue}
          setDisabled={actions.setDisabled}
          setName={actions.setName}
        >
          {props.children}
        </Form.Bind>
      </Popover>
    </Context.Provider>
  )
}
