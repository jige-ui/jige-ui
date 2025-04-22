import { debounce, isArray, throttle } from 'radash'
import { For, createSignal } from 'solid-js'
import { watch } from 'solid-uses'
import { dataIf } from '~/common/dataset'
import { dayes } from '~/common/dayes'
import type { MaybePromise } from '~/common/types'
import { genYears } from '../utils'
import { panelContext } from './context'

export function YearPanel(props: {
  highlightYears: number[] | ((visibleYearRange: [number, number]) => MaybePromise<number[]>)
}) {
  const [state, actions] = panelContext.useContext()
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
            data-selected={dataIf(dayes(state.value).year() === year)}
            data-disabled={dataIf(!checkYear(year))}
            classList={{
              'jg-dp-year-panel-year-hl': state.hlYears.includes(year),
            }}
            onClick={() => {
              if (!checkYear(year)) return
              actions.setCurrYear(year)
              actions.setActivePanel(state.defaultPanel)
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
