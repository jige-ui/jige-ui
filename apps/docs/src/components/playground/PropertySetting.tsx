import type { InitialValue } from 'jige-core'
import type { SetStoreFunction } from 'solid-js/store'
import { FormCore } from 'jige-core'
import { ComboBox, Input, NumberBox, Switcher } from 'jige-ui'
import { createMemo, For, Match, Switch } from 'solid-js'

export function PropertySetting<T extends InitialValue>(props: {
  properties: T
  onChange: SetStoreFunction<T>
  typeDeclaration?: Record<string, 'string' | 'number' | 'boolean' | string[]>
}) {
  const propNames = createMemo(() => Object.keys(props.properties))
  const checkType = (key: string) => {
    return props.typeDeclaration?.[key] || typeof props.properties[key]
  }
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
                <Match when={checkType(item) === 'boolean'}>
                  <div class="flex justify-between items-center m-1">
                    <label>{item}</label>
                    <Switcher type="checkbox" />
                  </div>
                </Match>
                <Match when={checkType(item) === 'string'}>
                  <div class="flex justify-between items-center m-1">
                    <label>{item}</label>
                    <Input />
                  </div>
                </Match>
                <Match when={checkType(item) === 'number'}>
                  <div class="flex justify-between items-center m-1">
                    <label>{item}</label>
                    <NumberBox />
                  </div>
                </Match>
                <Match when={Array.isArray(checkType(item))}>
                  <div class="flex justify-between items-center m-1">
                    <label>{item}</label>
                    <ComboBox options={checkType(item) as string[]} />
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
