import { SelectCore } from 'jige-core'
import aniFloatCss from 'sass:../../styles/common/ani-floating-ui.scss'
import css from 'sass:./select.scss'

import { For } from 'solid-js'
import { mountStyle } from 'solid-uses'

export function Select(props: {
  value?: string
  options: string[]
  onChange?: (value: string) => void
}) {
  mountStyle(css, 'jige-ui-select')
  mountStyle(aniFloatCss, 'jige-ui-ani-floating-ui')
  return (
    <SelectCore {...props}>
      <SelectCore.Trigger>
        {
          state => (
            <button class="jg-select-trigger">
              {state.value || '请选择'}
            </button>
          )
        }
      </SelectCore.Trigger>
      <SelectCore.Content class="jg-select-content ani-floating-ui-move">
        <For each={props.options}>
          {option => (
            <SelectCore.Option value={option} class="jg-select-option">
              {option}
            </SelectCore.Option>
          )}
        </For>
      </SelectCore.Content>
    </SelectCore>
  )
}
