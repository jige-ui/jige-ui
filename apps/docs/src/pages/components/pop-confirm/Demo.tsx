import { Button, PopConfirm, useToast } from 'jige-ui'
import { sleep } from 'radash'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    title: 'warning',
    description: 'Are you sure to delete this item?',
    placement: 'top',
  })

  const $t = useToast()

  return (
    <Playground>
      <Playground.MainArea>
        <PopConfirm
          title={p.title}
          description={p.description}
          placement={p.placement as any}
          onConfirm={async () => {
            await sleep(2000)
            $t.success('Confirmed')
          }}
        >
          <Button label='Click me' />
        </PopConfirm>
      </Playground.MainArea>
      <Playground.PropertySetting
        properties={p}
        onChange={setP}
        typeDeclaration={{
          trigger: ['hover', 'click', 'manual'],
          placement: [
            'top',
            'right',
            'bottom',
            'left',
            'top-start',
            'top-end',
            'right-start',
            'right-end',
            'bottom-start',
            'bottom-end',
            'left-start',
            'left-end',
          ],
        }}
      />
    </Playground>
  )
}
