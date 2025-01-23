import type { JSX } from 'solid-js/jsx-runtime'
import type { DateTypes } from './types'
import { FormCore } from 'jige-core'
import styles from 'sass:./date-picker.scss'
import { mountStyle, watch } from 'solid-uses'
import { Popover } from '../popover'
import { context } from './context'

export function Root(props: {
  children: JSX.Element
  value?: DateTypes
  valueFormat?: string
  onChange?: (value: string) => void
  dateRange?: [DateTypes, DateTypes]
  disabled?: boolean
}) {
  mountStyle(styles, 'jige-ui-date-picker')
  const Context = context.initial({
    valueFormat: () => props.valueFormat,
    dateRange: () => props.dateRange,
    disabled: () => props.disabled,
  })

  const [state, actions] = Context.value

  watch(() => props.value, (v) => {
    v && actions.setValue(v)
  })

  watch([() => state.value, () => state.valueFormat], ([v]) => {
    props.onChange?.(v)
    let inst = state.inst

    // make sure inst is in range and valid
    if (!actions.setValue(inst)) {
      inst = state.fromInst
      actions.setValue(inst)
    }

    actions.setCurrYear(inst.year())
    actions.setCurrMonth(inst.month())
  })

  watch(() => state.disabled, (disabled) => {
    console.log(disabled)
  })

  return (
    <Context.Provider>
      <Popover placement="bottom" trigger="manual" disabled={state.disabled}>
        <FormCore.Bind value={state.value} setValue={actions.setValue} setDisabled={actions.setDisabled}>
          {props.children}
        </FormCore.Bind>
      </Popover>
    </Context.Provider>
  )
}
