import { Tabs } from 'jige-ui'
import { createSignal, For } from 'solid-js'

export function TabsDemo() {
  const options = ['First', 'Second', 'Third']
  const [active, setActive] = createSignal(options[0])
  return (
    <Tabs
      options={options}
      active={active()}
      onChange={setActive}
    >
      <For each={options}>
        {item => (
          <Tabs.Content key={item}>
            {item}
          </Tabs.Content>
        )}
      </For>
    </Tabs>
  )
}
