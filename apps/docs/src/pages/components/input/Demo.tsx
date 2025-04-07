import { Input } from 'jige-ui'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    disabled: false,
    clearable: false,
    type: 'text' as 'text' | 'textarea' | 'password',
  })

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Input
            disabled={p.disabled}
            clearable={p.clearable}
            type={p.type}
            placeholder='Input some'
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        properties={p}
        onChange={setP}
        typeDeclaration={{
          type: ['text', 'textarea', 'password'],
        }}
      />
    </Playground>
  )
}
