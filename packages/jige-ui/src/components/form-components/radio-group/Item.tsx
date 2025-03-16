import { FormCore, RadioGroupCore } from 'jige-core'
import { setData } from '~/common/dataset'

export function Item(props: {
  value: string
  label: string
  disabled?: boolean
}) {
  const [state] = RadioGroupCore.useContext()
  const [, fieldCoreActs] = FormCore.useField()
  return (
    <RadioGroupCore.Item value={props.value} disabled={props.disabled}>
      <RadioGroupCore.ItemNative
        onBlur={() => {
          fieldCoreActs.handleBlur?.()
        }}
      />
      <RadioGroupCore.ItemControl>
        <div
          class='jg-radio-group-item'
          {...setData({
            disabled: state.disabled || props.disabled || false,
            checked: state.value === props.value,
          })}
        >
          <button type='button' class='jg-radio-group-circle' />
          <div class='jg-radio-group-text'>{props.label}</div>
        </div>
      </RadioGroupCore.ItemControl>
    </RadioGroupCore.Item>
  )
}
