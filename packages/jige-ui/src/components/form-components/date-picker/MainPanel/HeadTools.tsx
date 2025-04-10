import { throttle } from 'radash'
import { Show, createMemo } from 'solid-js'
import { Button } from '~/components/button'
import { CaretDown, CaretUp } from '~/components/icons'
import { panelContext } from './context'
import { NumberToChinese } from '../utils'

export function HeadTools() {
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
          onClick={() => {
            actions.setActivePanel(state.activePanel === 'year' ? state.defaultPanel : 'year')
          }}
          onWheel={(e) => {
            e.preventDefault()
            throttleYear(e)
          }}
          label={`${state.currYear}年`}
          variant='text'
        />
        <Show when={!monthMode()}>
          <Button
            onClick={() => {
              actions.setActivePanel(state.activePanel === 'month' ? state.defaultPanel : 'month')
            }}
            onWheel={(e) => {
              e.preventDefault()
              throttleMonth(e)
            }}
            variant='text'
          >
            {NumberToChinese(state.currMonth + 1)}月
          </Button>
        </Show>
      </div>
      <div class='jg-dp-head-tools-caret'>
        <Button
          variant='text'
          icon={<CaretUp />}
          onClick={() => {
            monthMode() ? actions.setCurrYear(state.currYear + 1) : actions.monthHandle(1)
          }}
        />
        <Button
          variant='text'
          icon={<CaretDown />}
          onClick={() => {
            monthMode() ? actions.setCurrYear(state.currYear - 1) : actions.monthHandle(-1)
          }}
        />
      </div>
    </div>
  )
}
