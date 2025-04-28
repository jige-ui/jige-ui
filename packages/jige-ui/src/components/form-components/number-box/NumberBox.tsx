import inputCss from 'sass:../input/input.scss'
import css from 'sass:./number-box.scss'
import { mountStyle } from 'solid-uses'

import { dataIf } from '~/common/dataset'
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
  disableBind?: boolean
}) {
  mountStyle(inputCss, 'jige-ui-input')
  mountStyle(css, 'jige-ui-number-box')
  return (
    <Root {...props}>
      {(state) => (
        <div
          class='jg-input-wrapper'
          data-focused={dataIf(state.focused)}
          data-disabled={dataIf(state.disabled)}
        >
          <NumberInput class='jg-input-native' />
          <MinusAndPlus class='jg-number-box-tools' />
        </div>
      )}
    </Root>
  )
}
