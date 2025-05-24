import { FloatingUiCore, hiddenStyle } from 'jige-core'
import { createSignal } from 'solid-js'
import { watch } from 'solid-uses'
import { dataIf } from '~/common/dataset'
import { Form } from '~/components/form'
import { Popover } from '~/components/popover'
import IconFluentArrowRight24Filled from '~icons/fluent/arrow-right-24-filled'
import IconFluentCalendar24Regular from '~icons/fluent/calendar-24-regular'
import { ClearableSuffix } from '../input/ClearableSuffix'
import { context } from './context'

export function Trigger(props: {
  clearable: boolean
}) {
  const [state, actions] = context.useContext()
  const [floatState, floatActions] = FloatingUiCore.useContext()
  const [focused, setFocused] = createSignal(false)

  watch(focused, (f) => {
    floatActions.setTimerOpen(f)
  })

  watch(
    () => floatState.status,
    (s) => {
      if (s === 'closed') {
        actions.setState('focused', false)
        actions.syncValueToPreview()
      }
      if (s === 'opened') {
        actions.setState('focused', true)
      }
      if (s === 'closing') {
        const [ref1, ref2] = state.triggerRefs
        if (ref1) {
          ref1.value = state.value[0]
        }
        if (ref2) {
          ref2.value = state.value[1]
        }
      }
    },
    { defer: true },
  )

  return (
    <Popover.Trigger>
      <div
        class='jg-input-wrapper jg-dp-trigger'
        data-focused={dataIf(focused())}
        data-disabled={dataIf(state.disabled)}
        data-preview={dataIf(state.previewMode)}
      >
        <input
          type='text'
          style={hiddenStyle}
          {...Form.createNativeComponentAttrs()}
          name={state.name}
        />
        <input
          ref={(el) => {
            actions.setState('triggerRefs', 0, el)
          }}
          type='text'
          autocomplete='off'
          class='jg-input-native'
          value={state.previewValue[0]}
          placeholder={state.placeholder[0]}
          onInput={(e) => {
            const value = e.currentTarget.value
            if (value.trim() === '') {
              actions.setValue(['', state.previewValue[1]])
              return
            }
            if (actions.checkDateStr(value)) {
              actions.setValue([value, state.previewValue[1]])
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
          <IconFluentArrowRight24Filled />
        </div>
        <input
          ref={(el) => {
            actions.setState('triggerRefs', 1, el)
          }}
          type='text'
          autocomplete='off'
          class='jg-input-native'
          value={state.previewValue[1]}
          placeholder={state.placeholder[1]}
          onInput={(e) => {
            const value = e.currentTarget.value
            if (value.trim() === '') {
              actions.setValue([state.previewValue[0], ''])
              return
            }
            if (actions.checkDateStr(value)) {
              actions.setValue([state.previewValue[0], value])
            }
          }}
          onFocus={() => {
            setFocused(true)
          }}
          onBlur={() => {
            setFocused(false)
          }}
        />
        <ClearableSuffix
          suffix={<IconFluentCalendar24Regular />}
          onClear={() => {
            actions.clear()
          }}
          showClearable={props.clearable && !state.isEmpty}
        />
      </div>
    </Popover.Trigger>
  )
}
