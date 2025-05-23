import type { EsDay } from 'esday'
import { For, batch, onCleanup, onMount } from 'solid-js'
import { Button } from '~/components/button'
import IconFluentCheckmark24Regular from '~icons/fluent/checkmark-24-regular'
import IconFluentDismiss24Regular from '~icons/fluent/dismiss-24-regular'
import { DatePickerMainPanel } from '../date-picker'
import { TimePicker } from '../time-picker'
import { context } from './context'

export function Panel(props: {
  presets?: {
    label: string
    value:
      | [string, string]
      | ((state: ReturnType<typeof context.useContext>[0]) => [string, string])
  }[]
}) {
  const [state, actions] = context.useContext()
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
    actions.updateCurrYearMonthData()
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
                    disableBind
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
                    disableBind
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
        <div
          style={{
            display: 'flex',
            'align-items': 'center',
          }}
        >
          <For each={props.presets}>
            {(preset) => (
              <Button
                variant='link'
                label={preset.label}
                onClick={() => {
                  const value =
                    typeof preset.value === 'function' ? preset.value(state) : preset.value
                  actions.setValue(value)
                }}
              />
            )}
          </For>
        </div>
        <div
          style={{
            display: 'flex',
            'align-items': 'center',
            width: '128px',
          }}
        >
          <Button
            variant='text'
            style={{ width: '100%', 'flex-shrink': 1 }}
            icon={<IconFluentCheckmark24Regular />}
            onClick={() => {
              actions.syncPreviewToValue()
              actions.blurTrigger()
            }}
          />
          <Button
            variant='text'
            style={{ width: '100%', 'flex-shrink': 1 }}
            icon={<IconFluentDismiss24Regular />}
            onClick={() => {
              actions.blurTrigger()
            }}
          />
        </div>
      </div>
    </div>
  )
}
