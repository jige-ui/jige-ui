import { DateRangePicker } from 'jige-ui'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    type: 'date' as 'date' | 'month' | 'year',
  })

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <DateRangePicker
            disabled={p.disabled}
            onBlur={() => {
              console.log('blur')
            }}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        properties={p}
        onChange={setP}
        typeDeclaration={{
          type: ['date', 'month', 'year'],
        }}
      />
    </Playground>
  )
}
