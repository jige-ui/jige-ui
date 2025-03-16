import { InputCore } from 'jige-core'
import { setData } from '~/common/dataset'

export function InputWrapper(props: {
  children: any
  focused: boolean
}) {
  const [state] = InputCore.useContext()
  return (
    <div
      class='jg-input-wrapper'
      {...setData({
        focused: props.focused,
        disabled: state.disabled,
      })}
    >
      {props.children}
    </div>
  )
}
