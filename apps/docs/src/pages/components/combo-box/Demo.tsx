import { ComboBox } from 'jige-ui'
import { list } from 'radash'
import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    disabled: false,
  })
  const [value, setValue] = createSignal('25')
  return (
    <Playground>
      <Playground.MainArea>
        <div class="flex items-center gap-2">
          <div class="flex gap-2 p-1">
            <label class="text-sm">Value: </label>
            <span>{value()}</span>
          </div>
          <ComboBox value={value()} options={list(20000).map(v => v.toString())} disabled={p.disabled} onChange={setValue} />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting properties={p} onChange={setP} />

    </Playground>

  )
}
