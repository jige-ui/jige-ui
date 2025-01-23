import { RadioGroupCore } from 'jige-core'
import { setData } from '~/common/dataset'

export function Item(props: {
  value: string
  label: string
  disabled?: boolean
}) {
  const [state] = RadioGroupCore.useContext()
  return (
    <RadioGroupCore.Item value={props.value} disabled={props.disabled}>
      <RadioGroupCore.ItemNative />
      <RadioGroupCore.ItemControl>
        <div
          class="jg-radio-group-item"
          {...setData({
            disabled: state.disabled || props.disabled || false,
            checked: state.value === props.value,
          })}
        >
          <button
            class="jg-radio-group-circle"
          />
          <div class="jg-radio-group-text">
            {props.label}
          </div>
        </div>
      </RadioGroupCore.ItemControl>
    </RadioGroupCore.Item>
  )
}
