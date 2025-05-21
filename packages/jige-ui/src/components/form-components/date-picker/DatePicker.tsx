import { onCleanup, onMount } from 'solid-js'
import { dayes } from '~/common/dayes'
import type { MaybePromise } from '~/common/types'
import { Button } from '~/components/button'
import { CheckFill, CloseFill } from '~/components/icons'
import { TimePicker } from '../time-picker'
import { MainPanel } from './MainPanel'
import { Root } from './Root'
import { Trigger } from './Trigger'
import { Wrapper } from './Wrapper'
import { context } from './context'
import type { DatePickerType, DateTypes } from './types'

function WrapperMainPanel(props: {
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
  cellClass: string | ((day: DateTypes) => string)
}) {
  const [state, actions] = context.useContext()

  onMount(() => {
    actions.setState('previewMode', true)
  })

  onCleanup(() => {
    actions.setState('previewMode', false)
  })

  return (
    <div>
      <MainPanel
        width={256}
        multiple={false}
        currMonth={state.currMonth}
        currYear={state.currYear}
        value={[state.dateValue]}
        onChange={(v) => {
          if (v[0] === state.dateValue) return
          if (state.type === 'month') {
            actions.setState('dateValue', dayes(v[0]).format('YYYY-MM'))
            return
          }
          actions.setState('dateValue', v[0])
        }}
        disabled={state.disabled}
        dateRange={state.dateRange}
        type={state.type as any}
        headerRight={
          state.isDateTime
            ? () => (
                <TimePicker
                  size='small'
                  disableBind
                  value={state.timeValue}
                  onChange={(v) => {
                    if (v === state.timeValue) return
                    actions.setState('timeValue', v)
                  }}
                  type={state.type as any}
                />
              )
            : undefined
        }
        {...props}
      />
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
          size={30}
          style={{ width: '100%', 'flex-shrink': 1 }}
          icon={<CheckFill />}
          onClick={() => {
            actions.syncPreviewToValue()
            state.triggerRef?.blur()
          }}
        />
        <Button
          variant='text'
          size={30}
          style={{ width: '100%', 'flex-shrink': 1 }}
          icon={<CloseFill />}
          onClick={() => {
            state.triggerRef?.blur()
          }}
        />
      </div>
    </div>
  )
}

export function DatePicker(props: {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  disableBind?: boolean
  placeholder?: string
  type?: DatePickerType
  dateRange?: [DateTypes, DateTypes]
  cellClass?: string | ((day: DateTypes) => string)
  highlightYears?: number[] | ((visibleYearRange: [number, number]) => MaybePromise<number[]>)
  highlightMonths?: string[] | ((visibleYear: number) => MaybePromise<string[]>)
  highlightDates?:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[],
      ) => MaybePromise<DateTypes[]>)
  disabledDates?:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[],
      ) => MaybePromise<DateTypes[]>)
}) {
  return (
    <Root
      value={props.value}
      onChange={props.onChange}
      dateRange={props.dateRange}
      disabled={props.disabled}
      type={props.type}
      placeholder={props.placeholder}
      disableBind={props.disableBind || false}
    >
      <Trigger />
      <Wrapper>
        <WrapperMainPanel
          cellClass={props.cellClass || ''}
          highlightDates={props.highlightDates || []}
          highlightMonths={props.highlightMonths || []}
          highlightYears={props.highlightYears || []}
          disabledDates={props.disabledDates || []}
        />
      </Wrapper>
    </Root>
  )
}
