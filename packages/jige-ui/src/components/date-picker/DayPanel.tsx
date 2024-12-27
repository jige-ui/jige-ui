import type { EsDay } from 'esday'
import type { DateTypes } from './types'

import type { MaybeAsync } from '~/common/types'
import { debounce, isFunction, list } from 'radash'
import { createMemo, createSignal, For } from 'solid-js'
import { watch } from 'solid-uses'
import { dayes } from '~/common/dayes'
import { context } from './context'
import { genCalendarDays, NumberToChinese } from './utils'

export function DayPanel(props: {
  highlightDates: DateTypes[] | ((year: number, month: number, dates: string[]) => MaybeAsync<DateTypes[]>)
  disabledDates: DateTypes[] | ((year: number, month: number, dates: string[]) => MaybeAsync<DateTypes[]>)
}) {
  const [state, actions] = context.useContext()
  const dates = createMemo(() => genCalendarDays(state.currYear, state.currMonth))

  // eslint-disable-next-line solid/reactivity
  const debounceSetHlDates = debounce({ delay: 200 }, async (y: number, m: number) => {
    const getHls = props.highlightDates
    if (isFunction(getHls)) {
      const highlightDates = await getHls(y, m, dates().map(d => d.format('YYYY-MM-DD')))
      if (y === state.currYear && m === state.currMonth)
        actions.setHlDates(highlightDates.map(d => dayes(d).format('YYYY-MM-DD')))
    }
    else {
      actions.setHlDates(getHls.map(d => dayes(d).format('YYYY-MM-DD')))
    }
  })

  const [isLoadingDsDates, setIsLoadingDsDates] = createSignal(false)
  // eslint-disable-next-line solid/reactivity
  const debounceSetDsDates = debounce({ delay: 200 }, async (y: number, m: number) => {
    const getDs = props.disabledDates
    if (isFunction(getDs)) {
      setIsLoadingDsDates(true)
      const disabledDates = await getDs(y, m, dates().map(d => d.format('YYYY-MM-DD')))
      if (y === state.currYear && m === state.currMonth)
        actions.setDsDates(disabledDates.map(d => dayes(d).format('YYYY-MM-DD')))
      setIsLoadingDsDates(false)
    }
    else {
      actions.setDsDates(getDs.map(d => dayes(d).format('YYYY-MM-DD')))
    }
  })

  watch([
    () => state.currYear,
    () => state.currMonth,
    () => props.disabledDates,
    () => props.highlightDates,
  ], ([y, m]) => {
    debounceSetHlDates(y, m)
    debounceSetDsDates(y, m)
  })

  const isDsDay = (day: EsDay) => {
    return !actions.isInDateRange(day) || state.dsDates.includes(day.format('YYYY-MM-DD'))
  }
  return (
    <div
      class="jg-dp-day-panel"
      classList={{
        'jg-dp-panel-disabled': isLoadingDsDates(),
      }}
    >
      <For each={list(6)}>
        {i => (<div class="jg-dp-day-panel-week">{NumberToChinese(i)}</div>)}
      </For>
      <For each={dates()}>
        {day => (
          <div
            class="jg-dp-day-panel-day"
            classList={{
              'jg-dp-is-curr': day.isSame(state.inst, 'day'),
              'jg-dp-is-not-curr-month': day.month() !== state.currMonth,
              'jg-dp-is-today': day.isToday(),
              'jg-dp-disabled': isDsDay(day),
              'jg-dp-day-panel-day-hl': state.hlDates.includes(day.format('YYYY-MM-DD')) && !day.isSame(state.inst, 'day'),
            }}
            onClick={() => {
              if (isDsDay(day))
                return
              actions.setValue(day) && state.refTrigger?.blur()
            }}
          >
            {day.date()}
          </div>
        )}
      </For>
    </div>
  )
}
