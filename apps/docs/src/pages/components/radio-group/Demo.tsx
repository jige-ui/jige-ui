import { RadioGroup } from 'jige-ui'
import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [value, setValue] = createSignal('1')
  const [s, setS] = createStore({
    disabled: false,
  })
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div class="b b-t-border rounded-md">
            <div class="p-4">
              Selected value:
              {value()}
            </div>
          </div>
          <RadioGroup value={value()} onChange={setValue} disabled={s.disabled}>
            <RadioGroup.Item value="1" label="Option 1" />
            <RadioGroup.Item value="2" label="Option 2" />
            <RadioGroup.Item value="3" label="Option 3" disabled />
          </RadioGroup>
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting properties={s} onChange={setS} />
    </Playground>
  )
}
