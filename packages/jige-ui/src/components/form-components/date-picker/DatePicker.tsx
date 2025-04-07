import { AnimatedGroup } from 'jige-core'
import { Match, Switch, createSignal } from 'solid-js'
import { watch } from 'solid-uses'
import type { MaybeAsync } from '~/common/types'
import { DayPanel } from './DayPanel'
import { HeadTools } from './HeadTools'
import { MonthPanel } from './MonthPanel'
import { Root } from './Root'
import { Trigger } from './Trigger'
import { Wrapper } from './Wrapper'
import { YearList } from './YearList'
import { YearPanel } from './YearPanel'
import { context } from './context'
import type { DatePickerType, DateTypes } from './types'

function AnimatedPanel(props: {
  highlightYears?: number[] | ((visibleYearRange: [number, number]) => MaybeAsync<number[]>)
  highlightMonths?: string[] | ((visibleYear: number) => MaybeAsync<string[]>)
  highlightDates?:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[],
      ) => MaybeAsync<DateTypes[]>)
  disabledDates?:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[],
      ) => MaybeAsync<DateTypes[]>)
}) {
  const [state, actions] = context.useContext()
  const [className, setClassName] = createSignal('')

  watch(
    () => state.activePanel,
    () => {
      setClassName('jg-dp-animated-panel')
    },
    { defer: true },
  )

  return (
    <AnimatedGroup
      active={state.activePanel}
      onChange={actions.setActivePanel}
      class='jg-dp-animated-group'
    >
      <AnimatedGroup.Panel key='day' class={className()}>
        <DayPanel
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

export function DatePicker(props: {
  value?: string
  valueFormat?: string
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  type?: DatePickerType
  dateRange?: [DateTypes, DateTypes]
  highlightYears?: number[] | ((visibleYearRange: [number, number]) => MaybeAsync<number[]>)
  highlightMonths?: string[] | ((visibleYear: number) => MaybeAsync<string[]>)
  highlightDates?:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[],
      ) => MaybeAsync<DateTypes[]>)
  disabledDates?:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[],
      ) => MaybeAsync<DateTypes[]>)
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
            <>
              <HeadTools />
              <AnimatedPanel
                highlightDates={props.highlightDates}
                highlightMonths={props.highlightMonths}
                highlightYears={props.highlightYears}
                disabledDates={props.disabledDates}
              />
            </>
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
