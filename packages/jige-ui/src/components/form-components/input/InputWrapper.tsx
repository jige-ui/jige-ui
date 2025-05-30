import { InputCore } from 'jige-core'
import { dataIf } from '~/common/dataset'

export function InputWrapper(props: {
  children: any
  focused: boolean
  readonly: boolean
}) {
  const [state] = InputCore.useContext()
  return (
    <div
      class='jg-input-wrapper'
      data-focused={dataIf(props.focused)}
      data-disabled={dataIf(state.disabled)}
      data-readonly={dataIf(props.readonly)}
    >
      {props.children}
    </div>
  )
}
