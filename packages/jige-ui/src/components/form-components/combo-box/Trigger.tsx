import { FloatingUiCore, FormCore, hiddenStyle } from 'jige-core'
import { setData } from '~/common/dataset'
import { Form } from '~/components/form'
import { ArrowDown } from '../../icons'
import { context } from './context'

export function Trigger() {
  const [state] = context.useContext()
  const [, fieldCoreActs] = FormCore.useField()
  return (
    <FloatingUiCore.Trigger>
      <button class='jg-combo-box-trigger' {...setData('disabled', state.disabled)}>
        <input
          {...Form.createNativeComponentAttrs()}
          type='text'
          name={state.name}
          value={state.value}
          style={hiddenStyle}
          onBlur={() => {
            fieldCoreActs.handleBlur?.()
          }}
        />
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
          }}
        >
          {state.value}
        </div>
      </button>
    </FloatingUiCore.Trigger>
  )
}
