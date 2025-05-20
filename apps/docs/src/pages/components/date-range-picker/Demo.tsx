import { DateRangePicker } from 'jige-ui'
import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    type: 'date' as 'datetime' | 'date',
  })

  const [value, setValue] = createSignal<[string, string]>(['', ''])

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div>起始日期: {value()[0]}</div>
          <div>结束日期: {value()[1]}</div>
          <DateRangePicker
            disabled={p.disabled}
            value={value()}
            onChange={setValue}
            type={p.type}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        properties={p}
        onChange={setP}
        typeDeclaration={{
          type: ['date', 'datetime'],
        }}
      />
    </Playground>
  )
}
