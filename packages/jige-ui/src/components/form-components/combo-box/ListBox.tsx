import { FloatingUiCore, dataIf } from 'jige-core'
import { createWatch } from 'jige-utils'
import { batch } from 'solid-js'
import { RootContext } from '~/components/ROOT/context'
import { Listbox as LB } from '../../listbox'
import { context } from './context'

export function ListBox(props: {
  size: 'small' | 'medium' | 'large'
}) {
  const [rootState] = RootContext.useContext()
  const [state, actions] = context.useContext()

  const [floatState, floatActs] = FloatingUiCore.useContext()

  createWatch(
    () => [floatState.status, floatState.middlewareData.shift.y] as const,
    ([s, y]) => {
      if (s === 'opening') {
        actions.setState('isCalculating', true)
        if (!state.editable) {
          const $scrollEl = floatState.refContent?.querySelector('.jg-combo-box-scrollarea')
            ?.firstChild as HTMLElement
          if ($scrollEl) {
            if (state.valueIndex === -1) {
              actions.setState('offset', 0)
            } else {
              const floatHeight = floatState.refContent?.clientHeight || 0
              const totalHeight = state.valueIndex * state.listItemHeight
              const scrollTop = totalHeight - floatHeight / 2 + state.listItemHeight / 2

              $scrollEl.scrollTop = scrollTop
              const toTop = totalHeight - $scrollEl.scrollTop + state.listItemHeight

              batch(() => {
                actions.setState('originY', totalHeight - $scrollEl.scrollTop)
                actions.setState('offset', -toTop - 8)
              })

              if (y) {
                const scrollTop = $scrollEl.scrollTop
                $scrollEl.scrollTop = scrollTop + y
                actions.setState('originY', state.originY - y)
              }
            }
          }
        }

        const height = state.refTrigger?.clientHeight || 20
        const width = state.refTrigger?.clientWidth || 200
        batch(() => {
          actions.setState('listItemHeight', height + 4)
          actions.setState('listItemWidth', width)
          actions.setState('isCalculating', false)
        })
      }

      if (s === 'closed') {
        if (state.editable) {
          actions.setState('editableValue', state.valueLabel)
        }
      }
    },
  )

  return (
    <FloatingUiCore.Content
      class='jg-combo-box-list'
      style={{
        '--jg-combo-box-list-transform-origin': `center ${state.originY}px`,
        width: `${state.listItemWidth}px`,
        opacity: state.isCalculating ? 0 : 1,
      }}
      zindex={rootState.zIndexConfig.popover}
      data-small={dataIf(props.size === 'small')}
      data-medium={dataIf(props.size === 'medium')}
      data-large={dataIf(props.size === 'large')}
    >
      <LB
        rootHeight={240}
        rowHeight={state.listItemHeight}
        selectIndex={state.realOptionIndex}
        selectTrigger='click'
        items={state.realOptions}
        onSelect={(item) => {
          actions.setState('value', item.value)
          floatActs.setOpen(false)
        }}
        class='jg-combo-box-scrollarea'
        itemClass='jg-combo-box-item'
        scrollToSelected={false}
        preventFocus={state.editable}
        fallback={
          <div class='jg-combo-box-empty'>{state.editable ? '没有匹配的选项' : '没有选项'}</div>
        }
      >
        {(item) => <div class='jg-combo-box-item-inner'>{item.label}</div>}
      </LB>
    </FloatingUiCore.Content>
  )
}
