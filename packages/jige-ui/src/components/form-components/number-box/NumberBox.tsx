import css from 'sass:./number-box.scss'
import inputCss from 'sass:../input/input.scss'
import { mountStyle } from 'solid-uses'

import { setData } from '~/common/dataset'
import { MinusAndPlus } from './MinusAndPlus'
import { NumberInput } from './NumberInput'
import { Root } from './Root'

export function NumberBox(props: {
  disabled?: boolean
  placeholder?: string
  max?: number
  min?: number
  value?: number
  onChange?: (value: number) => void
}) {
  mountStyle(inputCss, 'jige-ui-input')
  mountStyle(css, 'jige-ui-number-box')
  return (
    <Root {...props}>
      {(state) => (
        <div
          class='jg-input-wrapper'
          {...setData({
            disabled: state.disabled,
            focused: state.focused,
          })}
        >
          <NumberInput class='jg-input-native' />
          <MinusAndPlus class='jg-number-box-tools' />
        </div>
      )}
    </Root>
  )
}
