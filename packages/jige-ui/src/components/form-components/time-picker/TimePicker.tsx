import { FloatingUiCore } from 'jige-core'
import { Root } from './Root'
import { TimePanel } from './time-panel'
import { Trigger } from './Trigger'
import { context } from './context'
import { Popover } from '~/components/popover'

function FloatingContent() {
  const [state, actions] = context.useContext()
  const [, floatActs] = FloatingUiCore.useContext()

  return (
    <Popover.Content class='jg-time-picker-panel' animation=''>
      <TimePanel
        itemHeight={state.triggerHeight}
        width={state.triggerWidth}
        type={state.type}
        hour={state.hour}
        minute={state.minute}
        second={state.second}
        onCancel={() => {
          floatActs.setOpen(false)
        }}
        onConfirm={(hour, minute, second) => {
          actions.setState({
            hour,
            minute,
            second,
          })
          floatActs.setOpen(false)
        }}
      />
    </Popover.Content>
  )
}

export function TimePicker(props: {
  disabled?: boolean
  disableBind?: boolean
  type?: 'hour' | 'minute' | 'second'
  size?: 'small' | 'medium'
  value?: string
  onChange?: (value: string) => void
}) {
  return (
    <Root
      disableBind={props.disableBind}
      disabled={props.disabled}
      size={props.size}
      value={props.value}
      onChange={props.onChange}
      type={props.type}
    >
      <Trigger />
      <FloatingContent />
    </Root>
  )
}
