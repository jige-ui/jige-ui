import type { EsDay } from 'esday'
import { batch, onCleanup, onMount } from 'solid-js'
import { DatePickerMainPanel } from '../date-picker'
import { context } from './context'
import { Button } from '~/components/button'
import { CheckFill, CloseFill } from '~/components/icons'
import { TimePicker } from '../time-picker'

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

  onMount(() => {
    actions.setState('previewMode', true)
  })

  onCleanup(() => {
    actions.setState('previewMode', false)
  })

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
    <div>
      <div class='jg-dp-range-panel'>
        <DatePickerMainPanel
          value={[...state.dateValue]}
          onCurrYearMonthChange={updateCurrYearMonthData}
          currMonth={state.currYearMonthData.fromMonth}
          currYear={state.currYearMonthData.fromYear}
          disabled={state.disabled}
          cellClass={cellClass}
          onChange={(v) => {
            const length = v.length
            const from = v[length - 2]
            const to = v[length - 1]
            if (state.dateValue[0] !== from || state.dateValue[1] !== to) {
              actions.setDateValue(to)
            }
          }}
          headerRight={
            state.isDateTime
              ? () => (
                  <TimePicker
                    size='small'
                    value={state.timeValue[0]}
                    onChange={(v) => {
                      actions.setState('timeValue', 0, v)
                    }}
                  />
                )
              : undefined
          }
          {...commonProps}
        />
        <div class='jg-dp-divider' />
        <DatePickerMainPanel
          onCurrYearMonthChange={(currYear, currMonth) => {
            updateCurrYearMonthData(currYear, currMonth, false)
          }}
          value={[...state.dateValue]}
          currMonth={state.currYearMonthData.toMonth}
          currYear={state.currYearMonthData.toYear}
          disabled={state.disabled}
          cellClass={cellClass}
          onChange={(v) => {
            const length = v.length
            const from = v[length - 2]
            const to = v[length - 1]
            if (state.dateValue[0] !== from || state.dateValue[1] !== to) {
              actions.setDateValue(to)
            }
          }}
          headerRight={
            state.isDateTime
              ? () => (
                  <TimePicker
                    size='small'
                    value={state.timeValue[1]}
                    onChange={(v) => {
                      actions.setState('timeValue', 1, v)
                    }}
                  />
                )
              : undefined
          }
          {...commonProps}
        />
      </div>
      <div
        style={{
          display: 'flex',
          'justify-content': 'space-between',
          padding: '4px',
          'border-top': '1px solid var(--jg-t-border)',
        }}
      >
        <Button
          variant='text'
          style={{ width: '100%', 'flex-shrink': 1 }}
          icon={<CheckFill />}
          onClick={() => {
            actions.syncPreviewToValue()
            actions.blurTrigger()
          }}
        />
        <Button
          variant='text'
          style={{ width: '100%', 'flex-shrink': 1 }}
          icon={<CloseFill />}
          onClick={() => {
            actions.blurTrigger()
          }}
        />
      </div>
    </div>
  )
}
