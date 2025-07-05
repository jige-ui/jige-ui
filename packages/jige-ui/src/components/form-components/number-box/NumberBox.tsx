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
  onFocus?: () => void
  onBlur?: () => void
  size?: 'small' | 'medium' | 'large'
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
          data-small={dataIf(props.size === 'small')}
          data-medium={dataIf(props.size === 'medium')}
          data-large={dataIf(props.size === 'large')}
        >
          <NumberInput class='jg-input-native' onBlur={props.onBlur} onFocus={props.onFocus} />
          <MinusAndPlus class='jg-number-box-tools' />
        </div>
      )}
    </Root>
  )
}
