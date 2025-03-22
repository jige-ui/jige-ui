import { FloatingUiCore, FormCore } from 'jige-core'
import { createSignal } from 'solid-js'
import { watch } from 'solid-uses'
import { setData } from '~/common/dataset'
import { Form } from '~/components/form'
import { Popover } from '../../popover'
import { context } from './context'

export function Trigger() {
  const [state, actions] = context.useContext()
  const [floatState, floatActions] = FloatingUiCore.useContext()
  const [, fieldCoreActs] = FormCore.useField()
  const [focused, setFocused] = createSignal(false)

  watch(
    () => floatState.status,
    (status) => {
      if (status === 'closed') {
        actions.setActivePanel('day')
        const inst = state.inst
        actions.setCurrYear(inst.year())
        actions.setCurrMonth(inst.month())
      }
    },
  )

  return (
    <Popover.Trigger>
      <div
        class='jg-dp-trigger'
        {...setData({
          focused: focused(),
          disabled: state.disabled,
        })}
      >
        <input
          type='text'
          {...Form.createNativeComponentAttrs()}
          value={state.value}
          ref={actions.setRefTrigger}
          name={state.name || 'datepicker'}
          onChange={(e) => {
            if (!actions.setValue(e.currentTarget.value)) {
              e.currentTarget.value = state.value
            }
          }}
          onInput={(e) => {
            actions.setValue(e.currentTarget.value)
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
      </div>
    </Popover.Trigger>
  )
}
