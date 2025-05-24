import { DatePicker } from 'jige-ui'
import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    type: 'date',
  })

  const [value, setValue] = createSignal('')

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div>日期: {value()}</div>
          <DatePicker
            disabled={p.disabled}
            type={p.type as any}
            value={value()}
            onChange={setValue}
            onFocus={() => console.log('focus')}
            onBlur={() => console.log('blur')}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        properties={p}
        onChange={setP}
        typeDeclaration={{
          type: ['date', 'month', 'hour', 'minute', 'second'],
        }}
      />
    </Playground>
  )
}
