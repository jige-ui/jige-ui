import { ListBox } from './ListItem'
import { Root } from './Root'
import { Trigger } from './Trigger'

export function ComboBox(props: {
  value?: string
  options: string[]
  disabled?: boolean
  onChange?: (value: string) => void
}) {
  return (
    <Root
      value={props.value}
      disabled={props.disabled}
      options={props.options}
      onChange={props.onChange}
    >
      <Trigger />
      <ListBox />
    </Root>
  )
}
