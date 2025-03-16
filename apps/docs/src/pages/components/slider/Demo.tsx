import { Slider, useToast } from 'jige-ui'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [s, setS] = createStore({
    disabled: false,
  })
  const $t = useToast()
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Slider disabled={s.disabled} />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting properties={s} onChange={setS} />
    </Playground>
  )
}
