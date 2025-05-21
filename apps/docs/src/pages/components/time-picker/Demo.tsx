import { TimePicker } from 'jige-ui'
import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    size: 'medium' as 'small' | 'medium',
    type: 'second' as 'hour' | 'second' | 'minute',
  })

  const [value, setValue] = createSignal('')

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div>value: {value()}</div>
          <TimePicker
            value={value()}
            onChange={setValue}
            disabled={p.disabled}
            type={p.type}
            size={p.size}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        properties={p}
        onChange={setP}
        typeDeclaration={{
          type: ['hour', 'minute', 'second'],
          size: ['small', 'medium'],
        }}
      />
    </Playground>
  )
}
