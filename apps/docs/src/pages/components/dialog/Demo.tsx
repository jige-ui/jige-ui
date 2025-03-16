import type { ToastType } from 'jige-ui'
import { Button, useDialog } from 'jige-ui'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [s, setS] = createStore({
    title: 'title',
    content: 'content',
    type: 'info' as ToastType,
  })
  const $d = useDialog()
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Button
            label='Fire Dialog'
            onClick={() => {
              $d[s.type]({
                title: s.title,
                content: s.content,
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
