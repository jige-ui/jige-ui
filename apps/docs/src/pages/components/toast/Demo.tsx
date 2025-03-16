import type { ToastType } from 'jige-ui'
import { Button, useToast } from 'jige-ui'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [s, setS] = createStore({
    title: 'title',
    content: 'content',
    timeout: 3000,
    type: 'info' as ToastType,
  })
  const $t = useToast()
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Button
            label='Fire Toast'
            onClick={() => {
              $t[s.type]({
                title: s.title,
                content: s.content,
                timeout: s.timeout,
              })
            }}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        properties={s}
        onChange={setS}
        typeDeclaration={{
          type: ['error', 'warning', 'success', 'info'],
        }}
      />
    </Playground>
  )
}
