import { esday } from 'esday'
import { debounce, isFunction, list } from 'radash'
import { For } from 'solid-js'
import { watch } from 'solid-uses'
import type { MaybeAsync } from '~/common/types'
import { context } from './context'
import { NumberToChinese } from './utils'

export function MonthPanel(props: {
  highlightMonths: string[] | ((visibleYear: number) => MaybeAsync<string[]>)
}) {
  const [state, actions] = context.useContext()
  const debounceSetHlMonths = debounce({ delay: 200 }, async (y: number) => {
    const getHls = props.highlightMonths
    if (isFunction(getHls)) {
      const mons = await getHls(y)
      actions.setHlMonths(mons)
    } else {
      actions.setHlMonths(getHls)
    }
  })

  const isHl = (m: number) => {
    const inst = esday().year(state.currYear).month(m)

    return state.hlMonths.includes(inst.format('YYYY-MM'))
  }

  const checkMonth = (month: number) => {
    const year = state.currYear
    const inst = esday().year(year).month(month)
    return inst >= state.fromInst && inst <= state.toInst
  }

  watch(() => state.currYear, debounceSetHlMonths)
  return (
    <div class='jg-dp-month-panel'>
      <For each={list(11)}>
        {(month) => (
          <div
            class='jg-dp-month-panel-month'
            classList={{
              'jg-dp-month-panel-month-hl': isHl(month),
              'jg-dp-disabled': !checkMonth(month),
            }}
            onClick={() => {
              if (!checkMonth(month)) return
              actions.setCurrMonth(month)
              actions.setActivePanel('day')
            }}
            onKeyDown={() => {}}
          >
            {NumberToChinese(month + 1)}月
          </div>
        )}
      </For>
    </div>
  )
}
