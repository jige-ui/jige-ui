import { list } from 'radash'
import { createMemo } from 'solid-js'
import { dataIf } from '~/common/dataset'
import { dayes } from '~/common/dayes'
import { Listbox } from '~/components/listbox'
import { context } from './context'

export function YearList() {
  const [state, actions] = context.useContext()

  const items = createMemo(() => {
    const from = state.fromInst.year()
    const to = state.toInst.year()
    return list(from, to)
  })

  const selectIndex = createMemo(() => {
    if (!state.inst.isValid()) return state.currYear - state.fromInst.year()
    return state.inst.year() - state.fromInst.year()
  })

  const checkYear = (year: number) => {
    if (state.dsDates.length === 0) return true
    return state.dsDates.includes(dayes([year]).format('YYYY-MM-DD'))
  }
  return (
    <Listbox
      preventFocus
      items={items()}
      selectIndex={selectIndex()}
      rootHeight={200}
      rowHeight={28}
      virtual
      itemClass='jg-dp-year-list-year-wrapper'
    >
      {(item) => (
        <div
          data-selected={dataIf(state.inst.year() === item)}
          data-disabled={dataIf(!checkYear(item))}
          class='jg-dp-year-list-year'
          onClick={() => {
            actions.setCurrYear(item)
            actions.setValue(dayes([item]))
          }}
          onKeyDown={() => {}}
        >
          {item}
        </div>
      )}
    </Listbox>
  )
}
