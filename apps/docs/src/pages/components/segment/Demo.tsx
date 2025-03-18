import { Segment } from 'jige-ui'
import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [value, setValue] = createSignal('Apple')
  const [s, setS] = createStore({
    disabled: false,
  })
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div class='b b-t-border rounded-md mb-2'>
            <div class='p-2'>
              Selected value:
              {value()}
            </div>
          </div>
          <Segment
            value={value()}
            onChange={setValue}
            options={['Apple', 'Banana', 'Watermelon', 'Orange', 'Pineapple']}
            disabled={s.disabled}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting properties={s} onChange={setS} />
    </Playground>
  )
}
