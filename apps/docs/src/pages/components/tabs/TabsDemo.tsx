import { Tabs } from 'jige-ui'
import { list } from 'radash'
import { For, createSignal } from 'solid-js'

export function TabsDemo() {
  const options = ['First', 'Second', 'Third']
  const [active, setActive] = createSignal(options[0])
  return (
    <Tabs
      class='bg-t-bg1 shadow-md rounded-md'
      options={options}
      active={active()}
      onChange={setActive}
    >
      <For each={options}>
        {(item) => (
          <Tabs.Content key={item}>
            <For each={list(Math.ceil(Math.random() * 10))}>
              {(i) => (
                <div class='p-2'>
                  {item} {i}{' '}
                </div>
              )}
            </For>
          </Tabs.Content>
        )}
      </For>
    </Tabs>
  )
}
