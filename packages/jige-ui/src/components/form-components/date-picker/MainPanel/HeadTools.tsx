import { throttle } from 'radash'
import { type JSX, Show, createMemo } from 'solid-js'
import { Button } from '~/components/button'
import { NumberToChinese } from '../utils'
import { panelContext } from './context'
import IconFluentCaretUp24Filled from '~icons/fluent/caret-up-24-filled'
import IconFluentCaretDown24Filled from '~icons/fluent/caret-down-24-filled'

export function HeadTools(props: {
  headerRight?: (
    state: ReturnType<typeof panelContext.useContext>[0],
    actions: ReturnType<typeof panelContext.useContext>[1],
  ) => JSX.Element
}) {
  const [state, actions] = panelContext.useContext()
  const throttleMonth = throttle({ interval: 60 }, (e) => {
    actions.monthHandle(e.deltaY > 0 ? 1 : -1)
  })
  const throttleYear = throttle({ interval: 60 }, (e) => {
    actions.setCurrYear(e.deltaY > 0 ? state.currYear + 1 : state.currYear - 1)
  })
  const monthMode = createMemo(() => {
    return state.defaultPanel === 'month'
  })
  return (
    <div class='jg-dp-head-tools'>
      <div>
        <Button
          size={26}
          onClick={() => {
            actions.setState(
              'activePanel',
              state.activePanel === 'year' ? state.defaultPanel : 'year',
            )
          }}
          onWheel={(e) => {
            e.preventDefault()
            throttleYear(e)
          }}
          label={`${state.currYear}年`}
          variant='text'
          style={{ 'font-size': '15px', padding: '0 4px' }}
        />
        <Show when={!monthMode()}>
          <Button
            size={26}
            onClick={() => {
              actions.setState(
                'activePanel',
                state.activePanel === 'month' ? state.defaultPanel : 'month',
              )
            }}
            onWheel={(e) => {
              e.preventDefault()
              throttleMonth(e)
            }}
            variant='text'
            style={{ 'font-size': '14px', padding: '0 4px' }}
          >
            {NumberToChinese(state.currMonth + 1)}月
          </Button>
        </Show>
      </div>
      <div class='jg-dp-head-tools-caret'>
        <Show when={!props.headerRight} fallback={props.headerRight!(state, actions)}>
          <Button
            variant='text'
            icon={<IconFluentCaretUp24Filled />}
            onClick={() => {
              monthMode() ? actions.setCurrYear(state.currYear + 1) : actions.monthHandle(1)
            }}
            style={{ 'font-size': '12px' }}
          />
          <Button
            variant='text'
            icon={<IconFluentCaretDown24Filled />}
            onClick={() => {
              monthMode() ? actions.setCurrYear(state.currYear - 1) : actions.monthHandle(-1)
            }}
            style={{ 'font-size': '12px' }}
          />
        </Show>
      </div>
    </div>
  )
}
