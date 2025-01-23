import { Button } from 'jige-ui'
import { createMemo } from 'solid-js'
import { createStore } from 'solid-js/store'
import { watch } from 'solid-uses'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    loading: false,
    disabled: false,
    text: false,
    link: false,
  })

  const variant = createMemo(() => {
    if (p.text) {
      return 'text'
    }
    if (p.link) {
      return 'link'
    }
    return 'solid'
  })

  watch(() => p.link, (l) => {
    if (l) {
      setP({ text: false })
    }
  })

  watch(() => p.text, (t) => {
    if (t) {
      setP({ link: false })
    }
  })

  return (
    <Playground>
      <Playground.MainArea>
        <Button loading={p.loading} disabled={p.disabled} variant={variant() as any}>Button</Button>
      </Playground.MainArea>
      <Playground.PropertySetting properties={p} onChange={setP} />
    </Playground>
  )
}
