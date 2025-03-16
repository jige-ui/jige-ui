import { FloatingUiCore, FormCore, hiddenStyle } from 'jige-core'
import { setData } from '~/common/dataset'
import { Form } from '~/components/form'
import { ArrowDown } from '../../icons'
import { context } from './context'

export function Trigger() {
  const [state] = context.useContext()
  const [fieldState] = Form.useFieldContext()
  const [, fieldCoreActs] = FormCore.useField()
  return (
    <FloatingUiCore.Trigger>
      <div class='jg-combo-box-trigger' {...setData('disabled', state.disabled)}>
        <input
          aria-labelledby={fieldState.labelID}
          aria-describedby={fieldState.descriptionID}
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
            display: 'flex',
            'line-height': '1.3',
          }}
        >
          {state.value}
        </div>
      </div>
    </FloatingUiCore.Trigger>
  )
}
