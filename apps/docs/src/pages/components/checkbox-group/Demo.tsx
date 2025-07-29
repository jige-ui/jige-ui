import { CheckboxGroup } from 'jige-ui'
import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [value, setValue] = createSignal([1])
  const [s, setS] = createStore({
    disabled: false,
    size: 'medium' as 'small' | 'medium' | 'large',
  })
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <div class='b b-t-border rounded-md'>
            <div class='p-4'>
              Selected value:
              {value()}
            </div>
          </div>
          <CheckboxGroup
            class='flex flex-wrap gap-x-4'
            value={value()}
            onChange={setValue}
            disabled={s.disabled}
            size={s.size}
          >
            <CheckboxGroup.Item value={1}>这是一</CheckboxGroup.Item>
            <CheckboxGroup.Item value={2}>这是二</CheckboxGroup.Item>
            <CheckboxGroup.Item value={3}>这是三</CheckboxGroup.Item>
            <CheckboxGroup.Item value={1}>这是一</CheckboxGroup.Item>
            <CheckboxGroup.Item value={2}>这是二</CheckboxGroup.Item>
            <CheckboxGroup.Item value={3}>这是三</CheckboxGroup.Item>
            <CheckboxGroup.Item value={1}>这是一</CheckboxGroup.Item>
            <CheckboxGroup.Item value={2}>这是二</CheckboxGroup.Item>
            <CheckboxGroup.Item value={3}>这是三</CheckboxGroup.Item>
            <CheckboxGroup.Item value={1}>这是一</CheckboxGroup.Item>
            <CheckboxGroup.Item value={2}>这是二</CheckboxGroup.Item>
            <CheckboxGroup.Item value={3}>这是三</CheckboxGroup.Item>
            <CheckboxGroup.Item value={1}>这是一</CheckboxGroup.Item>
            <CheckboxGroup.Item value={2}>这是二</CheckboxGroup.Item>
            <CheckboxGroup.Item value={3}>这是三</CheckboxGroup.Item>
            <CheckboxGroup.Item value={1}>这是一</CheckboxGroup.Item>
            <CheckboxGroup.Item value={2}>这是二</CheckboxGroup.Item>
            <CheckboxGroup.Item value={3}>这是三</CheckboxGroup.Item>
            <CheckboxGroup.Item value={1}>这是一</CheckboxGroup.Item>
            <CheckboxGroup.Item value={2}>这是二</CheckboxGroup.Item>
            <CheckboxGroup.Item value={3}>这是三</CheckboxGroup.Item>
          </CheckboxGroup>
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        properties={s}
        onChange={setS}
        typeDeclaration={{
          size: ['small', 'medium', 'large'],
        }}
      />
    </Playground>
  )
}
