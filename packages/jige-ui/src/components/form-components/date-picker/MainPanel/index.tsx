import type { EsDay } from 'esday'
import { AnimatedGroup } from 'jige-core'
import { batch, createSignal } from 'solid-js'
import { watch } from 'solid-uses'
import type { MaybePromise } from '~/common/types'
import type { DateTypes } from '../types'
import { DayPanel } from './DayPanel'
import { HeadTools } from './HeadTools'
import { MonthPanel } from './MonthPanel'
import { YearPanel } from './YearPanel'
import { panelContext } from './context'

function AnimatedPanel(props: {
  cellClass: string | ((day: EsDay) => string)
  highlightYears: number[] | ((visibleYearRange: [number, number]) => MaybePromise<number[]>)
  highlightMonths: string[] | ((visibleYear: number) => MaybePromise<string[]>)
  highlightDates:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[],
      ) => MaybePromise<DateTypes[]>)
  disabledDates:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[],
      ) => MaybePromise<DateTypes[]>)
}) {
  const [state] = panelContext.useContext()
  const [className, setClassName] = createSignal('')

  watch(
    () => state.activePanel,
    () => {
      setClassName('jg-dp-animated-panel')
    },
    { defer: true },
  )

  return (
    <AnimatedGroup active={state.activePanel} class='jg-dp-animated-group'>
      <AnimatedGroup.Panel key='day' class={className()}>
        <DayPanel
          cellClass={props.cellClass || ''}
          highlightDates={props.highlightDates || []}
          disabledDates={props.disabledDates || []}
        />
      </AnimatedGroup.Panel>
      <AnimatedGroup.Panel key='month' class={className()}>
        <MonthPanel highlightMonths={props.highlightMonths || []} />
      </AnimatedGroup.Panel>
      <AnimatedGroup.Panel key='year' class={className()}>
        <YearPanel highlightYears={props.highlightYears || []} />
      </AnimatedGroup.Panel>
    </AnimatedGroup>
  )
}

export function MainPanel(props: {
  onCurrYearMonthChange?: (year: number, month: number) => void
  value: string[]
  onChange: (value: string[]) => void
  disabled: boolean
  type: 'date' | 'month'
  currYear: number
  currMonth: number
  dateRange: [DateTypes, DateTypes]
  cellClass: string | ((day: EsDay) => string)
  highlightYears: number[] | ((visibleYearRange: [number, number]) => MaybePromise<number[]>)
  highlightMonths: string[] | ((visibleYear: number) => MaybePromise<string[]>)
  multiple: boolean
  highlightDates:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[],
      ) => MaybePromise<DateTypes[]>)
  disabledDates:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[],
      ) => MaybePromise<DateTypes[]>)
}) {
  const Context = panelContext.initial({
    value: () => props.value,
    dateRange: () => props.dateRange,
    disabled: () => props.disabled,
    currYear: () => props.currYear,
    type: () => props.type,
    multiple: () => props.multiple,
    activePanel: () => {
      switch (props.type) {
        case 'month':
          return 'month'
        default:
          return 'day'
      }
    },
  })

  const [state, actions] = Context.value

  watch(
    () => state.value,
    (v) => {
      props.onChange(v)
    },
  )

  watch(
    () => props.currMonth,
    (m) => {
      batch(() => {
        if (m > 11) {
          actions.setCurrMonth(0)
          actions.setCurrYear(state.currYear + 1)
        } else if (m < 0) {
          actions.setCurrMonth(11)
          actions.setCurrYear(state.currYear - 1)
        } else {
          actions.setCurrMonth(m)
        }
      })
    },
  )

  watch(
    () => [state.currYear, state.currMonth],
    ([y, m]) => {
      props.onCurrYearMonthChange?.(y, m)
    },
  )

  return (
    <Context.Provider>
      <div>
        <HeadTools />
        <AnimatedPanel
          cellClass={props.cellClass}
          highlightDates={props.highlightDates}
          highlightMonths={props.highlightMonths}
          highlightYears={props.highlightYears}
          disabledDates={props.disabledDates}
        />
      </div>
    </Context.Provider>
  )
}
