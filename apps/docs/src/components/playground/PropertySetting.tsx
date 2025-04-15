import { FormCore } from 'jige-core'
import { ComboBox, Form, Input, NumberBox, Switcher } from 'jige-ui'
import { isEqual } from 'radash'
import { For, Match, Switch, createSignal } from 'solid-js'
import type { SetStoreFunction } from 'solid-js/store'
import { watch } from 'solid-uses'

export function PropertySetting<T extends { [key: string]: any }>(props: {
  properties: T
  onChange: SetStoreFunction<T>
  typeDeclaration?: Record<string, 'string' | 'number' | 'boolean' | (string | number)[]>
}) {
  const checkType = (key: string) => {
    return props.typeDeclaration?.[key] || typeof props.properties[key]
  }

  const form = FormCore.createForm({
    defaultValues: () => ({ ...props.properties }) as any,
  })

  const [propName, setPropName] = createSignal<string[]>([])

  watch(
    () => ({ ...props.properties }),
    (p) => {
      isEqual(propName(), Object.keys(p)) || setPropName(Object.keys(p))
    },
  )

  watch(
    () => ({ ...form.context[0].formData }),
    (data: any) => {
      props.onChange(data)
    },
  )

  return (
    <div class='flex flex-col w-185px shrink-0'>
      <div class='b-b p-2 b-t-border'>Properties</div>
      <Form staticFormInstance={form}>
        <For each={propName()}>
          {(item) => (
            <FormCore.Field name={item}>
              <div class='flex justify-between items-center m-1 flex-wrap'>
                <Switch>
                  <Match when={checkType(item) === 'boolean'}>
                    <div>{item}</div>
                    <Switcher type='checkbox' />
                  </Match>
                  <Match when={checkType(item) === 'string'}>
                    <div>{item}</div>
                    <Input />
                  </Match>
                  <Match when={checkType(item) === 'number'}>
                    <div>{item}</div>
                    <NumberBox />
                  </Match>
                  <Match when={Array.isArray(checkType(item))}>
                    <div>{item}</div>
                    <ComboBox options={checkType(item) as string[]} />
                  </Match>
                </Switch>
              </div>
            </FormCore.Field>
          )}
        </For>
      </Form>
    </div>
  )
}
