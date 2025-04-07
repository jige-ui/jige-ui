import { Grid } from 'jige-ui'
import { list } from 'radash'
import { For } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    itemsCount: 8,
  })

  return (
    <Playground>
      <Playground.MainArea>
        <Grid cols={'1 md:4 lg:8'} class='gap-4'>
          <For each={list(p.itemsCount - 1)}>
            {(item) => (
              <Grid.Col span={Math.floor(Math.random() * 3) + 1}>
                <div class={`p-4 rounded-md ${item % 2 === 0 ? 'bg-amber' : 'bg-blue'}`}>
                  Item {item + 1}
                </div>
              </Grid.Col>
            )}
          </For>
        </Grid>
      </Playground.MainArea>
      <Playground.PropertySetting
        properties={p}
        onChange={setP}
        typeDeclaration={{
          size: ['small', 'medium', 'large'],
          variant: ['solid', 'text', 'link'],
        }}
      />
    </Playground>
  )
}
