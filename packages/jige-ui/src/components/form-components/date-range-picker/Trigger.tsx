import { FloatingUiCore, hiddenStyle } from 'jige-core'
import { createSignal } from 'solid-js'
import { watch } from 'solid-uses'
import { setData } from '~/common/dataset'
import { dayes } from '~/common/dayes'
import { Form } from '~/components/form'
import { ArrowRight, CalendarLine } from '~/components/icons'
import { Popover } from '~/components/popover'
import { context } from './context'

export function Trigger() {
  const [state, actions] = context.useContext()
  const [, floatActions] = FloatingUiCore.useContext()
  const [focused, setFocused] = createSignal(false)

  watch(focused, (f) => {
    floatActions.setTimerOpen(f)
  })

  return (
    <Popover.Trigger>
      <div
        class='jg-input-wrapper jg-dp-trigger'
        {...setData({
          focused: focused(),
          disabled: state.disabled,
        })}
      >
        <input
          type='text'
          style={hiddenStyle}
          {...Form.createNativeComponentAttrs()}
          name={state.name}
        />
        <div class='jg-input-prefix'>
          <CalendarLine />
        </div>
        <input
          type='text'
          autocomplete='off'
          class='jg-input-native'
          value={state.value[0]}
          placeholder={state.placeholder[0]}
          onChange={(e) => {
            const inst = dayes(e.currentTarget.value, 'YYYY-MM-DD')
            if (inst.isValid()) {
              actions.setState('value', 0, inst.format('YYYY-MM-DD'))
            } else {
              e.currentTarget.value = state.value[0]
            }
          }}
          onInput={(e) => {
            const value = e.currentTarget.value
            if (value.trim() === '') {
              actions.setState('value', 0, '')
              return
            }
            const inst = dayes(value, 'YYYY-MM-DD')
            if (inst.isValid()) {
              actions.setState('value', 0, inst.format('YYYY-MM-DD'))
              actions.updateCurrYearMonthData()
            }
          }}
          onFocus={() => {
            setFocused(true)
          }}
          onBlur={() => {
            setFocused(false)
          }}
        />
        <div
          style={{
            position: 'relative',
          }}
        >
          <ArrowRight />
        </div>
        <input
          type='text'
          autocomplete='off'
          class='jg-input-native'
          value={state.value[1]}
          placeholder={state.placeholder[1]}
          onChange={(e) => {
            const inst = dayes(e.currentTarget.value, 'YYYY-MM-DD')
            if (inst.isValid()) {
              actions.setState('value', 1, inst.format('YYYY-MM-DD'))
            } else {
              e.currentTarget.value = state.value[1]
            }
          }}
          onInput={(e) => {
            const value = e.currentTarget.value
            if (value.trim() === '') {
              actions.setState('value', 1, '')
              return
            }
            const inst = dayes(value, 'YYYY-MM-DD')
            if (inst.isValid()) {
              actions.setState('value', 1, inst.format('YYYY-MM-DD'))
              actions.updateCurrYearMonthData()
            }
          }}
          onFocus={() => {
            setFocused(true)
          }}
          onBlur={() => {
            setFocused(false)
          }}
        />
      </div>
    </Popover.Trigger>
  )
}
