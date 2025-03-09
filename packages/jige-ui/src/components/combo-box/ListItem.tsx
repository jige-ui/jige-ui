import { FloatingUiCore } from 'jige-core'
import { Listbox as LB } from '../listbox'
import { context } from './context'

export function ListBox() {
  const [state, actions] = context.useContext()

  const [, floatActs] = FloatingUiCore.useContext()

  return (
    <FloatingUiCore.Content
      class="jg-combo-box-list"
      style={{
        '--jg-combo-box-list-transform-origin': `center ${state.originY}px`,
        'width': `${state.listItemWidth}px`,
      }}
    >
      <LB
        rootHeight={240}
        rowHeight={state.listItemHeight}
        selectIndex={state.valueIndex}
        selectTrigger="click"
        items={state.options}
        onSelect={(item) => {
          actions.setValue(item)
          floatActs.setOpen(false)
        }}
        class="jg-combo-box-scrollarea"
        itemClass="jg-combo-box-item"
        scrollToSelected={false}
      >
        {item => item }
      </LB>
    </FloatingUiCore.Content>
  )
}
