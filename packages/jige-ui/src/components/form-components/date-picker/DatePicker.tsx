import { Match, Switch } from 'solid-js'
import type { MaybePromise } from '~/common/types'
import { Root } from './Root'
import { Trigger } from './Trigger'
import { Wrapper } from './Wrapper'
import { YearList } from './YearList'
import { context } from './context'
import type { DatePickerType, DateTypes } from './types'
import { MainPanel } from './MainPanel'
import { dayes } from '~/common/dayes'

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

  return (
    <MainPanel
      multiple={false}
      currMonth={state.currMonth}
      currYear={state.currYear}
      value={[state.inst.format('YYYY-MM-DD')]}
      onChange={(v) => {
        if (state.inst.isSame(dayes(v[0]), 'day')) return
        actions.setValue(dayes(v[0]))
      }}
      disabled={state.disabled}
      dateRange={state.dateRange}
      type={state.type as any}
      {...props}
    />
  )
}

export function DatePicker(props: {
  value?: string
  valueFormat?: string
  onChange?: (value: string) => void
  disabled?: boolean
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
      valueFormat={props.valueFormat}
      onChange={props.onChange}
      dateRange={props.dateRange}
      disabled={props.disabled}
      type={props.type}
      placeholder={props.placeholder}
    >
      <Trigger />
      <Wrapper>
        <Switch
          fallback={
            <WrapperMainPanel
              cellClass={props.cellClass || ''}
              highlightDates={props.highlightDates || []}
              highlightMonths={props.highlightMonths || []}
              highlightYears={props.highlightYears || []}
              disabledDates={props.disabledDates || []}
            />
          }
        >
          <Match when={props.type === 'year'}>
            <YearList />
          </Match>
        </Switch>
      </Wrapper>
    </Root>
  )
}
