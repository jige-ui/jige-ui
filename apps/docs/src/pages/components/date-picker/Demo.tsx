/* eslint-disable solid/reactivity */
import { DatePicker } from 'jige-ui'
import { sleep } from 'radash'

export function Demo() {
  return (
    <div>
      <div>
        <DatePicker
          highlightYears={async ([start, end]) => {
            await sleep(1000)
            return [start + 1, end - 1]
          }}
          highlightMonths={['2024-09', '2024-07']}
          highlightDates={['2024-09-01', '2024-07-24']}
          dateRange={['2024-07-01', '2024-09-30']}
          disabledDates={async (_y, _m, dates) => {
            await sleep(1000)
            return dates
          }}
        />
      </div>
      {/* <div>
        <DatePicker valueFormat="YYYY年MM月DD日" />
      </div> */}
    </div>
  )
}
