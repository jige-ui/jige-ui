import { ComboBox } from 'jige-ui'
import { list } from 'radash'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    disabled: false,
  })
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <ComboBox value="25" options={list(100).map(v => v.toString())} disabled={p.disabled} />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting properties={p} onChange={setP} />

    </Playground>

  )
}
