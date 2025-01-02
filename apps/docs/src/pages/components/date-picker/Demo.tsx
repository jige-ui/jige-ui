/* eslint-disable solid/reactivity */
import { DatePicker } from 'jige-ui'
import { sleep } from 'radash'
import { createMemo, createSignal } from 'solid-js'

export function Demo() {
  const [currDates, setCurrDates] = createSignal<string[]>([])
  const [hlDates, setHlDates] = createSignal<string[]>([])
  const dsDates = createMemo(() => currDates().filter(d => !hlDates().includes(d)))
  return (
    <div>
      <div>
        <DatePicker
          highlightYears={async ([start, end]) => {
            await sleep(1000)
            return [start + 1, end - 1]
          }}
          highlightMonths={['2024-09', '2024-07']}
          highlightDates={async (_y, _m, dates) => {
            console.log(1)
            setCurrDates(dates)
            await sleep(1000)

            setHlDates(['2024-07-01', '2024-07-02', '2024-07-03'])
            return ['2024-07-01', '2024-07-02', '2024-07-03']
          }}
          dateRange={['2024-07-01', '2024-09-30']}
          disabledDates={dsDates()}
        />
      </div>
      {/* <div>
        <DatePicker valueFormat="YYYY年MM月DD日" />
      </div> */}
    </div>
  )
}
