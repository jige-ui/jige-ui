import { FloatingUiCore, dataIf } from 'jige-core'
import { RootContext } from '~/components/ROOT/context'
import { Listbox as LB } from '../../listbox'
import { context } from './context'

export function ListBox(props: {
  size: 'small' | 'medium' | 'large'
}) {
  const [rootState] = RootContext.useContext()
  const [state, actions] = context.useContext()

  const [, floatActs] = FloatingUiCore.useContext()

  return (
    <FloatingUiCore.Content
      class='jg-combo-box-list'
      style={{
        '--jg-combo-box-list-transform-origin': `center ${state.originY}px`,
        width: `${state.listItemWidth}px`,
      }}
      zindex={rootState.zIndexConfig.popover}
      data-small={dataIf(props.size === 'small')}
      data-medium={dataIf(props.size === 'medium')}
      data-large={dataIf(props.size === 'large')}
    >
      <LB
        rootHeight={240}
        rowHeight={state.listItemHeight}
        selectIndex={state.valueIndex}
        selectTrigger='click'
        items={state.options}
        onSelect={(item) => {
          actions.setState('value', item.value)
          floatActs.setOpen(false)
        }}
        class='jg-combo-box-scrollarea'
        itemClass='jg-combo-box-item'
        scrollToSelected={false}
      >
        {(item) => <div class='jg-combo-box-item-inner'>{item.label}</div>}
      </LB>
    </FloatingUiCore.Content>
  )
}
