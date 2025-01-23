import { FloatingUiCore } from 'jige-core'
import { setData } from '~/common/dataset'
import { ArrowDown } from '../icons'
import { context } from './context'

export function Trigger() {
  const [state] = context.useContext()
  return (
    <FloatingUiCore.Trigger>
      <div class="jg-combo-box-trigger" {...setData('disabled', state.disabled)}>
        <div class="jg-combo-box-overlay" />
        <i class="jg-combo-box-arrow">
          <ArrowDown />
        </i>
        <div style={{
          'display': 'flex',
          'line-height': '1.3',
        }}
        >
          {state.value}
        </div>

      </div>
    </FloatingUiCore.Trigger>
  )
}
