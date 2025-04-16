import { FloatingUiCore, hiddenStyle } from 'jige-core'
import { setData } from '~/common/dataset'
import { ArrowDown } from '../../icons'
import { context } from './context'
import { Form } from '~/components/form'

export function Trigger() {
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
        <button type='button' class='jg-combo-box-trigger' {...setData('disabled', state.disabled)}>
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
              opacity: state.value ? 1 : 0.5,
            }}
          >
            {state.value || state.placeholder}
          </div>
        </button>
      </FloatingUiCore.Trigger>
    </div>
  )
}
