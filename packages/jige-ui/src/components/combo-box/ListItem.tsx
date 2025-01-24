import { FloatingUiCore } from 'jige-core'
import { For } from 'solid-js'
import { setData } from '~/common/dataset'
import { Scrollbar } from '../scrollbar'
import { context } from './context'

export function ListBox() {
  const [state, actions] = context.useContext()

  const [, floatActs] = FloatingUiCore.useContext()

  return (
    <FloatingUiCore.Content
      class="jg-combo-box-list"
      style={{
        '--jg-combo-box-list-transform-origin': `center ${state.originY}px`,
      }}
    >
      <Scrollbar maxHeight="220px" class="jg-combo-box-scrollarea" color="var(--jg-fg4)">
        <div class="jg-combo-box-list-inner">
          <For each={state.options}>
            {(option, index) => (
              <div
                data-index={index()}
                class="jg-combo-box-item"
                {...setData('checked', option === state.value)}
                style={{
                  height: `${state.listItemHeight}px`,
                  width: `${state.listItemWidth}px`,
                }}
                onClick={() => {
                  actions.setValue(option)
                  floatActs.setOpen(false)
                }}
              >
                {option}
              </div>
            )}
          </For>
        </div>

      </Scrollbar>
    </FloatingUiCore.Content>
  )
}
