import { FloatingUiCore, FormCore } from 'jige-core'
import { createSignal } from 'solid-js'
import { watch } from 'solid-uses'
import { dataIf } from '~/common/dataset'
import { Form } from '~/components/form'
import IconFluentCalendar24Regular from '~icons/fluent/calendar-24-regular'
import { Popover } from '../../popover'
import { ClearableSuffix } from '../input/ClearableSuffix'
import { context } from './context'

export function Trigger(props: {
  clearable: boolean
}) {
  const [state, actions] = context.useContext()
  const [floatState, floatActions] = FloatingUiCore.useContext()
  const [, fieldCoreActs] = FormCore.useField()
  const [focused, setFocused] = createSignal(false)

  watch(
    () => floatState.status,
    (status) => {
      if (status === 'closed') {
        actions.setActivePanel(state.defaultPanel)
        const inst = state.inst
        actions.setCurrYear(inst.year())
        actions.setCurrMonth(inst.month())
        actions.syncValueToPreview()
      }
    },
  )

  return (
    <Popover.Trigger>
      <div
        class='jg-input-wrapper jg-dp-trigger'
        data-focused={dataIf(focused())}
        data-disabled={dataIf(state.disabled)}
        data-preview={dataIf(state.previewMode)}
        onClick={() => {
          state.triggerRef?.focus()
        }}
      >
        <input
          ref={(el) => {
            actions.setState('triggerRef', el)
          }}
          type='text'
          autocomplete='off'
          class='jg-input-native'
          {...Form.createNativeComponentAttrs()}
          value={state.previewValue}
          name={state.name || 'datepicker'}
          placeholder={state.placeholder || '请选择日期'}
          onInput={(e) => {
            const v = e.currentTarget.value
            if (v.trim() === '') {
              actions.setValue('')
            }
            if (actions.checkDateStr(v)) actions.setValue(e.currentTarget.value)
          }}
          onFocus={() => {
            floatActions.setOpen(true)
            setFocused(true)
          }}
          onBlur={(e) => {
            e.currentTarget.value = state.value
            floatActions.setOpen(false)
            setFocused(false)
            fieldCoreActs.handleBlur?.()
          }}
        />
        <ClearableSuffix
          suffix={<IconFluentCalendar24Regular />}
          onClear={() => {
            actions.clear()
          }}
          showClearable={props.clearable && !!state.value}
        />
      </div>
    </Popover.Trigger>
  )
}
