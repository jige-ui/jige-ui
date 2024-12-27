import { FloatingUiCore } from 'jige-core'
import { createSignal } from 'solid-js'
import { watch } from 'solid-uses'
import { setData } from '~/common/dataset'
import { Popover } from '../popover'
import { context } from './context'

export function Trigger() {
  const [state, actions] = context.useContext()

  const [floatState, floatActions] = FloatingUiCore.useContext()

  const [focused, setFocused] = createSignal(false)

  watch(() => floatState.status, (status) => {
    if (status === 'closed') {
      actions.setActivePanel('day')
      const inst = state.inst
      actions.setCurrYear(inst.year())
      actions.setCurrMonth(inst.month())
    }
  })

  return (
    <Popover.Trigger>
      <div class="jg-dp-trigger" {...setData('focused', focused())}>
        <input
          type="text"
          value={state.value}
          ref={actions.setRefTrigger}
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
          }}
        />
      </div>

    </Popover.Trigger>
  )
}
