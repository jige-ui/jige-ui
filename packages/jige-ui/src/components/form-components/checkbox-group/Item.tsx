import { CheckboxGroupCore, dataIf } from 'jige-core'
import { type JSX, Show, createMemo } from 'solid-js'
import type { SimpleType } from '~/common/types'
import { AnimatedChecked } from '~/components/icons'
import { context } from './context'

export function Item<T extends SimpleType>(props: {
  disabled?: boolean
  value: T
  children: JSX.Element
}) {
  const [groupState] = context.useContext()
  return (
    <CheckboxGroupCore.Item value={props.value as string} disabled={props.disabled}>
      <CheckboxGroupCore.ItemNative />
      <CheckboxGroupCore.ItemControl>
        {(state) => {
          const checked = createMemo(() => state.value.includes(props.value as string))
          return (
            <div
              class='jg-checkbox-item'
              data-small={dataIf(groupState.size === 'small')}
              data-medium={dataIf(groupState.size !== 'small' && groupState.size !== 'large')}
              data-large={dataIf(groupState.size === 'large')}
              data-disabled={dataIf(state.disabled)}
            >
              <div
                class='jg-checkbox-box'
                data-checked={dataIf(checked())}
                data-disabled={dataIf(state.disabled)}
              >
                <Show when={checked()}>
                  <i class='jg-checkbox-icon'>
                    <AnimatedChecked />
                  </i>
                </Show>
              </div>
              <div
                style={{
                  'margin-left': '.5em',
                }}
              >
                {props.children}
              </div>
            </div>
          )
        }}
      </CheckboxGroupCore.ItemControl>
    </CheckboxGroupCore.Item>
  )
}
