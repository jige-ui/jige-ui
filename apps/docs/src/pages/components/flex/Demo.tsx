import { Flex } from 'jige-ui'
import { list } from 'radash'
import { For } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    itemsCount: 8,
    justify: 'start' as 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly',
    alignItems: 'center' as 'start' | 'end' | 'center' | 'baseline' | 'stretch',
    flexDirection: 'row' as 'row' | 'col' | 'row-reverse' | 'col-reverse',
    gap: 8,
    inline: false,
    wrap: true,
  })

  return (
    <Playground>
      <Playground.MainArea>
        <Flex
          direction={p.flexDirection}
          justify={p.justify}
          align={p.alignItems}
          size={p.gap}
          wrap={p.wrap}
          inline={p.inline}
        >
          <For each={list(p.itemsCount - 1)}>
            {(item) => (
              <div class={`w-80px h-80px rounded-md ${item % 2 === 0 ? 'bg-amber' : 'bg-blue'}`}>
                Item {item + 1}
              </div>
            )}
          </For>
        </Flex>
      </Playground.MainArea>
      <Playground.PropertySetting
        properties={p}
        onChange={setP}
        typeDeclaration={{
          justify: ['start', 'end', 'center', 'between', 'around', 'evenly'],
          align: ['start', 'end', 'center', 'baseline', 'stretch'],
          direction: ['row', 'col', 'row-reverse', 'col-reverse'],
        }}
      />
    </Playground>
  )
}
