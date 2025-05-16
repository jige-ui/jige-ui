import dpCss from 'sass:../date-picker/date-picker.scss'
import inputCss from 'sass:../input/input.scss'
import css from 'sass:./range-picker.scss'
import { mountStyle, watch } from 'solid-uses'
import { Form } from '~/components/form'
import { Popover } from '~/components/popover'
import { Panel } from './Panel'
import { Trigger } from './Trigger'
import { context } from './context'

export function DateRangePicker(props: {
  disabled?: boolean
  value?: [string, string]
  onChange?: (value: [string, string]) => void
  onBlur?: () => void
  placeholder?: [string, string]
  disableBind?: boolean
}) {
  mountStyle(dpCss, 'jige-ui-date-picker')
  mountStyle(inputCss, 'jige-ui-input')
  mountStyle(css, 'jige-ui-date-range-picker')
  const Context = context.initial({
    value: () => props.value,
    placeholder: () => props.placeholder,
    disabled: () => props.disabled,
  })

  const [state, actions] = Context.value

  watch(
    () => [...state.value],
    (v) => {
      console.log('DateRangePicker', v)

      props.onChange?.(v as [string, string])
    },
  )

  return (
    <Context.Provider>
      <Form.Bind
        propDisabled={props.disabled}
        setDisabled={(d) => {
          actions.setState('disabled', d)
        }}
        value={state.value}
        setValue={(v) => {
          actions.setState('value', v)
        }}
        setName={(n) => {
          actions.setState('name', n)
        }}
        disableBind={props.disableBind}
      >
        <Popover
          placement='bottom-start'
          trigger='manual'
          disabled={state.disabled}
          closeDelay={50}
        >
          <Trigger onBlur={props.onBlur || (() => {})} />
          <Popover.Content
            onMouseDown={(e) => {
              e.preventDefault()
            }}
            style={{
              padding: 0,
              border: '1px solid var(--jg-t-border)',
            }}
          >
            <Panel />
          </Popover.Content>
        </Popover>
      </Form.Bind>
    </Context.Provider>
  )
}
