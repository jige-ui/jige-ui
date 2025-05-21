import { FloatingUiCore, hiddenStyle } from 'jige-core'
import type { JSX } from 'solid-js/jsx-runtime'
import { dataIf } from '~/common/dataset'
import { Form } from '~/components/form'
import { ArrowDown } from '../../icons'
import { context } from './context'

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
        value={state.value}
        style={hiddenStyle}
        readOnly
      />
      <FloatingUiCore.Trigger>
        <button
          style={props.style}
          type='button'
          class={['jg-combo-box-trigger', props.class].join(' ')}
          data-disabled={dataIf(state.disabled)}
        >
          <div class='jg-combo-box-overlay' />
          <i class='jg-combo-box-arrow'>
            <ArrowDown />
          </i>
          <div
            style={{
              display: 'block',
              'line-height': '1.3',
              overflow: 'hidden',
              'text-overflow': 'ellipsis',
              'max-width': 'calc(100% - 16px)',
              opacity: state.valueIndex !== -1 ? 1 : 0.5,
            }}
          >
            {state.valueLabel}
          </div>
        </button>
      </FloatingUiCore.Trigger>
    </div>
  )
}
