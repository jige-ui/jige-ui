import { FloatingUiCore, hiddenStyle } from 'jige-core'
import type { JSX } from 'solid-js/jsx-runtime'
import { dataIf } from '~/common/dataset'
import { Form } from '~/components/form'
import IconFluentChevronDown24Filled from '~icons/fluent/chevron-down-24-filled'
import { context } from './context'
import { Show } from 'solid-js'
import { Input } from '../input'

export function Trigger(props: {
  style?: string | JSX.CSSProperties
  class?: string
  size: 'small' | 'medium' | 'large'
}) {
  const [state, actions] = context.useContext()
  const [, flActs] = FloatingUiCore.useContext()
  return (
    <div>
      <input
        tabindex={-1}
        {...Form.createNativeComponentAttrs()}
        type='text'
        name={state.name}
        value={state.value}
        style={hiddenStyle}
        readOnly
      />
      <FloatingUiCore.Trigger>
        <Show when={state.editable}>
          <Input
            ref={(el) => {
              actions.setState('refTrigger', el)
            }}
            disableBind
            style={props.style}
            class={props.class}
            size={props.size}
            value={state.editableValue}
            placeholder={state.placeholder}
            onInput={() => {
              flActs.setOpen(true)
            }}
            onChange={(v) => {
              actions.setState('editableValue', v)
            }}
          />
        </Show>

        <Show when={!state.editable}>
          <button
            style={props.style}
            type='button'
            ref={(el) => {
              actions.setState('refTrigger', el)
            }}
            class={['jg-combo-box-trigger', props.class].join(' ')}
            data-disabled={dataIf(state.disabled)}
            data-small={dataIf(props.size === 'small')}
            data-medium={dataIf(props.size === 'medium')}
            data-large={dataIf(props.size === 'large')}
          >
            <div class='jg-combo-box-overlay' />
            <i
              class='jg-combo-box-arrow'
              style={{
                'font-size': '.75em',
              }}
            >
              <IconFluentChevronDown24Filled />
            </i>
            <div
              style={{
                display: 'block',
                overflow: 'hidden',
                'text-overflow': 'ellipsis',
                'max-width': 'calc(100% - 16px)',
                opacity: state.valueIndex !== -1 ? 1 : 0.5,
              }}
            >
              <span>{state.valueLabel || state.placeholder}</span>
            </div>
          </button>
        </Show>
      </FloatingUiCore.Trigger>
    </div>
  )
}
