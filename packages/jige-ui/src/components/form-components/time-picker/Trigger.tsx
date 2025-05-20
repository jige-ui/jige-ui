import { combineStyle, dataIf, hiddenStyle } from 'jige-core'
import type { JSX } from 'solid-js/jsx-runtime'
import { Form } from '~/components/form'
import { context } from './context'
import { Popover } from '~/components/popover'
import { Show } from 'solid-js'

export function Trigger(props: {
  style?: string | JSX.CSSProperties
  class?: string
}) {
  const [state] = context.useContext()
  return (
    <div>
      <input
        tabindex={-1}
        {...Form.createNativeComponentAttrs()}
        type='text'
        name={state.name}
        value={state.asStr}
        style={hiddenStyle}
        readOnly
      />
      <Popover.Trigger>
        <button
          style={combineStyle(
            {
              width: `${state.triggerWidth}px`,
              height: `${state.triggerHeight}px`,
            },
            props.style,
          )}
          type='button'
          class={['jg-time-picker-trigger', props.class].join(' ')}
          data-disabled={dataIf(state.disabled)}
        >
          <div class='jg-time-picker-overlay' />
          <div
            style={{
              display: 'flex',
              'align-items': 'center',
              width: '100%',
              opacity: state.asStr ? 1 : 0.5,
            }}
          >
            <div class='jg-time-picker-trigger-item'>{state.hourStr || '时'}</div>
            <Show when={state.typeIndex > 0}>
              <div class='jg-time-picker-trigger-item'>{state.minuteStr || '分'}</div>
            </Show>
            <Show when={state.typeIndex > 1}>
              <div class='jg-time-picker-trigger-item'>{state.secondStr || '秒'}</div>
            </Show>
          </div>
        </button>
      </Popover.Trigger>
    </div>
  )
}
