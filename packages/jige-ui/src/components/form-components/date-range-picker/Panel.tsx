import { context } from './context'
import { DatePickerMainPanel } from '../date-picker'
import { batch } from 'solid-js'
import type { EsDay } from 'esday'

export function Panel() {
  const [state, actions] = context.useContext()
  actions.updateCurrYearMonthData()
  const commonProps = {
    dateRange: ['1800-01-01', '2200-01-01'] as [string, string],
    highlightYears: [] as number[],
    highlightMonths: [] as string[],
    highlightDates: [] as string[],
    disabledDates: [] as string[],
    type: 'date' as const,
    multiple: true,
  }

  const updateCurrYearMonthData = (currYear: number, currMonth: number, isFromPanel = true) => {
    batch(() => {
      const setCurrYearMonthData = (key: keyof typeof state.currYearMonthData, value: number) => {
        actions.setState('currYearMonthData', key, value)
      }
      if (isFromPanel) {
        setCurrYearMonthData('fromYear', currYear)
        setCurrYearMonthData('fromMonth', currMonth)
        if (state.currYearMonthData.toYear < currYear) {
          setCurrYearMonthData('toYear', currYear)
        }
        if (
          state.currYearMonthData.toYear === currYear &&
          state.currYearMonthData.toMonth <= currMonth
        ) {
          setCurrYearMonthData('toMonth', currMonth + 1)
        }
      } else {
        setCurrYearMonthData('toYear', currYear)
        setCurrYearMonthData('toMonth', currMonth)
        if (state.currYearMonthData.fromYear > currYear) {
          setCurrYearMonthData('fromYear', currYear)
        }
        if (
          state.currYearMonthData.fromYear === currYear &&
          state.currYearMonthData.fromMonth >= currMonth
        ) {
          setCurrYearMonthData('fromMonth', currMonth - 1)
        }
      }
    })
  }

  const cellClass = (day: EsDay) => {
    const from = state.fromInst
    const to = state.toInst
    const isInRange = day > from && day < to

    return isInRange ? 'jg-dp-cell-in-range' : ''
  }

  return (
    <div class='jg-dp-range-panel'>
      <DatePickerMainPanel
        value={[...state.value]}
        onCurrYearMonthChange={updateCurrYearMonthData}
        currMonth={state.currYearMonthData.fromMonth}
        currYear={state.currYearMonthData.fromYear}
        disabled={state.disabled}
        cellClass={cellClass}
        onChange={(v) => {
          const length = v.length
          const from = v[length - 2]
          const to = v[length - 1]
          if (state.value[0] !== from || state.value[1] !== to) {
            actions.setValue(to)
          }
        }}
        {...commonProps}
      />
      <div class='jg-dp-divider' />
      <DatePickerMainPanel
        onCurrYearMonthChange={(currYear, currMonth) => {
          updateCurrYearMonthData(currYear, currMonth, false)
        }}
        value={[...state.value]}
        currMonth={state.currYearMonthData.toMonth}
        currYear={state.currYearMonthData.toYear}
        disabled={state.disabled}
        cellClass={cellClass}
        onChange={(v) => {
          const length = v.length
          const from = v[length - 2]
          const to = v[length - 1]
          if (state.value[0] !== from || state.value[1] !== to) {
            actions.setValue(to)
          }
        }}
        {...commonProps}
      />
    </div>
  )
}
