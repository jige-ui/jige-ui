import css from 'sass:./number-box.scss'
import { mountStyle } from 'solid-uses'

import { setData } from '~/common/dataset'
import { MinusAndPlus } from './MinusAndPlus'
import { NumberInput } from './NumberInput'
import { Root } from './Root'

export function NumberBox(props: {
  disabled?: boolean
  max?: number
  min?: number
  value?: number
  onChange?: (value: number) => void
}) {
  mountStyle(css, 'jige-ui-number-box')
  return (
    <Root {...props}>
      {state => (
        <div
          class="jg-number-box"
          {...setData({
            disabled: state.disabled,
            focused: state.focused,
          })}
        >
          <NumberInput class="jg-number-box-input" />
          <MinusAndPlus class="jg-number-box-tools" />
        </div>
      )}
    </Root>
  )
}
