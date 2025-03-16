import { NumberBox } from 'jige-ui'
import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [value, setValue] = createSignal(1)
  const [s, setS] = createStore({
    disabled: false,
    max: 100,
    min: 0,
  })
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div class='b b-t-border rounded-md mb-2'>
            <div class='p-4'>
              value:
              {value()}
            </div>
          </div>
          <NumberBox value={value()} onChange={setValue} {...s} />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting properties={s} onChange={setS} />
    </Playground>
  )
}
