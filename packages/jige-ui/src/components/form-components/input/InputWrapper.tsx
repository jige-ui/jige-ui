import { InputCore } from 'jige-core'
import { dataIf } from '~/common/dataset'

export function InputWrapper(props: {
  children: any
  focused: boolean
  readonly: boolean
  size: 'small' | 'medium' | 'large'
}) {
  const [state] = InputCore.useContext()
  return (
    <div
      class='jg-input-wrapper'
      data-focused={dataIf(props.focused)}
      data-disabled={dataIf(state.disabled)}
      data-readonly={dataIf(props.readonly)}
      data-small={dataIf(props.size === 'small')}
      data-medium={dataIf(props.size === 'medium')}
      data-large={dataIf(props.size === 'large')}
    >
      {props.children}
    </div>
  )
}
