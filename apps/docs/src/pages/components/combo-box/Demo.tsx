import { ComboBox } from 'jige-ui'
import { list } from 'radash'
import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    disabled: false,
  })
  const [value, setValue] = createSignal<number>()
  return (
    <Playground>
      <Playground.MainArea>
        <div class='flex items-center gap-2'>
          <div class='flex gap-2 p-1'>
            <div class='text-sm'>Value: </div>
            <span>{value()}</span>
          </div>
          <ComboBox
            style={{ width: '100%' }}
            value={value()}
            options={list(20000).map((v) => ({
              value: v,
              label: `Option ${v}`,
            }))}
            disabled={p.disabled}
            onChange={setValue}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting properties={p} onChange={setP} />
    </Playground>
  )
}
