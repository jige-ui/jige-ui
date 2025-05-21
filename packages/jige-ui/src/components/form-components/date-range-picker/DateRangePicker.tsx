import dpCss from 'sass:../date-picker/date-picker.scss'
import inputCss from 'sass:../input/input.scss'
import css from 'sass:./range-picker.scss'
import { isArray } from 'radash'
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
  type?: 'datetime' | 'date'
  presets?: [
    {
      label: string
      value: [string, string]
    },
  ]
}) {
  mountStyle(dpCss, 'jige-ui-date-picker')
  mountStyle(inputCss, 'jige-ui-input')
  mountStyle(css, 'jige-ui-date-range-picker')
  const Context = context.initial({
    placeholder: () => props.placeholder,
    disabled: () => props.disabled,
    type: () => props.type,
  })

  const [state, actions] = Context.value

  watch(
    () => [...state.value],
    (v) => {
      props.onChange?.(v as [string, string])
    },
    { defer: true },
  )

  watch(
    () => props.value,
    (v) => {
      if (v && v[0] !== state.value[0] && v[1] !== state.value[1]) {
        actions.setValue(v)
      }
    },
  )

  watch(
    () => state.type,
    () => {
      actions.setState('dateValue', ['', ''])
      actions.setState('timeValue', ['00:00:00', '00:00:00'])
      actions.syncPreviewToValue()
    },
    { defer: true },
  )

  watch(
    () => [...state.timeValue],
    (v) => {
      console.log(v)
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
          if (isArray(v)) {
            const safeV = ['', ''] as [string, string]
            safeV[0] = v[0] || ''
            safeV[1] = v[1] || ''
            if (safeV[0] !== state.value[0] || safeV[1] !== state.value[1]) {
              actions.setValue(safeV)
            }
          }
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
          closeDelay={28}
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
            <Panel presets={props.presets} />
          </Popover.Content>
        </Popover>
      </Form.Bind>
    </Context.Provider>
  )
}
