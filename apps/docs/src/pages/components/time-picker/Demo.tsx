import { TimePicker } from 'jige-ui'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    size: 'medium' as 'small' | 'medium',
    type: 'second' as 'hour' | 'second' | 'minute',
  })

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <TimePicker disabled={p.disabled} type={p.type} size={p.size} />
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
