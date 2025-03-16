import { debounce, isArray, throttle } from 'radash'
import { For, createSignal } from 'solid-js'
import { watch } from 'solid-uses'
import type { MaybeAsync } from '~/common/types'
import { context } from './context'
import { genYears } from './utils'

export function YearPanel(props: {
  highlightYears: number[] | ((visibleYearRange: [number, number]) => MaybeAsync<number[]>)
}) {
  const [state, actions] = context.useContext()
  const [years, setYears] = createSignal<number[]>(genYears(state.currYear))
  // eslint-disable-next-line solid/reactivity
  const throttleYear = throttle({ interval: 60 }, (e) => {
    const maxYear = state.toInst.year()
    const minYear = state.fromInst.year()
    const firstYear = years()[0]
    const lastYear = years()[years().length - 1]

    if (e.deltaY > 0 && lastYear < maxYear) {
      setYears(genYears(lastYear + 12))
    } else if (e.deltaY < 0 && firstYear > minYear) {
      setYears(genYears(firstYear - 12))
    }
  })

  const debounceSetHlYears = debounce({ delay: 200 }, async (ys: number[]) => {
    const getHls = props.highlightYears
    if (isArray(getHls)) {
      actions.setHlYears(getHls)
    } else {
      const years = await getHls([ys[0], ys[ys.length - 1]])
      actions.setHlYears(years)
    }
  })

  const checkYear = (year: number) => {
    return year >= state.fromInst.year() && year <= state.toInst.year()
  }

  watch(years, debounceSetHlYears)
  return (
    <div
      class='jg-dp-year-panel'
      onWheel={(e) => {
        e.preventDefault()
        throttleYear(e)
      }}
    >
      <For each={years()}>
        {(year) => (
          <div
            class='jg-dp-year-panel-year'
            classList={{
              'jg-dp-year-panel-year-hl': state.hlYears.includes(year),
              'jg-dp-disabled': !checkYear(year),
            }}
            onClick={() => {
              if (!checkYear(year)) return
              actions.setCurrYear(year)
              actions.setActivePanel('day')
            }}
            onKeyDown={() => {}}
          >
            {year}
          </div>
        )}
      </For>
    </div>
  )
}
