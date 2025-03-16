import { throttle } from 'radash'
import { context } from './context'
import { NumberToChinese } from './utils'

export function HeadTools() {
  const [state, actions] = context.useContext()
  const throttleMonth = throttle({ interval: 60 }, (e) => {
    actions.monthHandle(e.deltaY > 0 ? 1 : -1)
  })
  const throttleYear = throttle({ interval: 60 }, (e) => {
    actions.setCurrYear(e.deltaY > 0 ? state.currYear + 1 : state.currYear - 1)
  })
  return (
    <div class='jg-dp-head-tools'>
      <button
        type='button'
        class='jg-dp-head-tools-year'
        onClick={() => {
          actions.setActivePanel(state.activePanel === 'year' ? 'day' : 'year')
        }}
        onWheel={(e) => {
          e.preventDefault()
          throttleYear(e)
        }}
      >
        {state.currYear}
      </button>
      <button
        class='jg-dp-head-tools-month'
        type='button'
        onClick={() => {
          actions.setActivePanel(state.activePanel === 'month' ? 'day' : 'month')
        }}
        onWheel={(e) => {
          e.preventDefault()
          throttleMonth(e)
        }}
      >
        {NumberToChinese(state.currMonth + 1)}月
      </button>
    </div>
  )
}
