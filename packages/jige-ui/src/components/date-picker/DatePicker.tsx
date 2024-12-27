import type { DateTypes } from './types'
import type { MaybeAsync } from '~/common/types'
import { AnimatedGroup } from 'jige-core'
import { context } from './context'
import { DayPanel } from './DayPanel'
import { HeadTools } from './HeadTools'
import { MonthPanel } from './MonthPanel'
import { Root } from './Root'
import { Trigger } from './Trigger'
import { Wrapper } from './Wrapper'
import { YearPanel } from './YearPanel'

function AnimatedPanel(props: {
  highlightYears?: number[] | ((visibleYearRange: [number, number]) => MaybeAsync<number[]>)
  highlightMonths?: string[] | ((visibleYear: number) => MaybeAsync<string[]>)
  highlightDates?: DateTypes[] | ((visibleYear: number, visibleMonth: number, visibleDates: string[]) => MaybeAsync<DateTypes[]>)
  disabledDates?: DateTypes[] | ((visibleYear: number, visibleMonth: number, visibleDates: string[]) => MaybeAsync<DateTypes[]>)
}) {
  const [state, actions] = context.useContext()
  return (
    <AnimatedGroup active={state.activePanel} onChange={actions.setActivePanel} class="jg-dp-animated-group">
      <AnimatedGroup.Panel key="day" class="jg-dp-animated-panel">
        <DayPanel highlightDates={props.highlightDates || []} disabledDates={props.disabledDates || []} />
      </AnimatedGroup.Panel>
      <AnimatedGroup.Panel key="month" class="jg-dp-animated-panel">
        <MonthPanel highlightMonths={props.highlightMonths || []} />
      </AnimatedGroup.Panel>
      <AnimatedGroup.Panel key="year" class="jg-dp-animated-panel">
        <YearPanel highlightYears={props.highlightYears || []} />
      </AnimatedGroup.Panel>
    </AnimatedGroup>
  )
}

export function DatePicker(props: {
  value?: string
  valueFormat?: string
  onChange?: (value: string) => void
  dateRange?: [DateTypes, DateTypes]
  highlightYears?: number[] | ((visibleYearRange: [number, number]) => MaybeAsync<number[]>)
  highlightMonths?: string[] | ((visibleYear: number) => MaybeAsync<string[]>)
  highlightDates?: DateTypes[] | ((visibleYear: number, visibleMonth: number, visibleDates: string[]) => MaybeAsync<DateTypes[]>)
  disabledDates?: DateTypes[] | ((visibleYear: number, visibleMonth: number, visibleDates: string[]) => MaybeAsync<DateTypes[]>)
}) {
  return (
    <Root
      value={props.value}
      valueFormat={props.valueFormat}
      onChange={props.onChange}
      dateRange={props.dateRange}

    >
      <Trigger />
      <Wrapper>
        <HeadTools />
        <AnimatedPanel
          highlightDates={props.highlightDates}
          highlightMonths={props.highlightMonths}
          highlightYears={props.highlightYears}
          disabledDates={props.disabledDates}
        />
      </Wrapper>
    </Root>
  )
}
