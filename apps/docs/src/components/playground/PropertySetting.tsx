import type { InitialValue } from 'jige-core'
import type { SetStoreFunction } from 'solid-js/store'
import { FormCore } from 'jige-core'
import { Input, Switcher } from 'jige-ui'
import { createMemo, For, Match, Switch } from 'solid-js'

export function PropertySetting<T extends InitialValue>(props: {
  properties: T
  onChange: SetStoreFunction<T>
}) {
  const propNames = createMemo(() => Object.keys(props.properties))
  return (
    <div class="flex flex-col w-185px">
      <div class="b-b p-2 b-t-border">
        Properties
      </div>
      <FormCore value={props.properties} onChange={props.onChange as any}>
        <For each={propNames()}>
          {item => (
            <FormCore.Item name={item}>
              <Switch>
                <Match when={typeof props.properties[item] === 'boolean'}>
                  <div class="flex justify-between items-center m-1">
                    <label>{item}</label>
                    <Switcher type="checkbox" />
                  </div>
                </Match>
                <Match when={typeof props.properties[item] === 'string'}>
                  <div>
                    <label>{item}</label>
                    <Input />
                  </div>
                </Match>
                <Match when={typeof props.properties[item] === 'number'}>
                  <div>
                    <label>{item}</label>
                    <Input type="number" />
                  </div>
                </Match>
              </Switch>
            </FormCore.Item>
          )}
        </For>
      </FormCore>
    </div>

  )
}
