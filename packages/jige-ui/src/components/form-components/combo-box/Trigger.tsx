import { FloatingUiCore, hiddenStyle } from 'jige-core'
import type { JSX } from 'solid-js/jsx-runtime'
import { dataIf } from '~/common/dataset'
import { Form } from '~/components/form'
import IconFluentChevronDown24Filled from '~icons/fluent/chevron-down-24-filled'
import { context } from './context'

export function Trigger(props: {
  style?: string | JSX.CSSProperties
  class?: string
  size: 'small' | 'medium' | 'large'
}) {
  const [state, actions] = context.useContext()
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
            <span>{state.valueLabel}</span>
          </div>
        </button>
      </FloatingUiCore.Trigger>
    </div>
  )
}
