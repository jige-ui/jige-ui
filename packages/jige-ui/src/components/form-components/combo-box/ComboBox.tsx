import { undefinedOr } from 'jige-core'
import type { JSX } from 'solid-js/jsx-runtime'
import type { SimpleType } from '~/common/types'
import { ListBox } from './ListBox'
import { Root } from './Root'
import { Trigger } from './Trigger'

function normalizeOptions<T extends SimpleType>(
  options: (T | { label: string; value: T })[],
): { label: string; value: T }[] {
  return options.map((option) => {
    if (typeof option !== 'object') {
      return { label: `${option}`, value: option }
    }
    return option as { label: string; value: T }
  })
}

export function ComboBox<T extends SimpleType>(props: {
  value?: T
  options: (T | { label: string; value: T })[]
  disabled?: boolean
  onChange?: (value: T) => void
  placeholder?: string
  disableBind?: boolean
  class?: string
  style?: string | JSX.CSSProperties
  size?: 'small' | 'medium' | 'large'
}) {
  return (
    <Root
      value={props.value}
      disabled={props.disabled}
      options={normalizeOptions(props.options)}
      onChange={props.onChange}
      placeholder={props.placeholder || '请选择...'}
      disableBind={props.disableBind || false}
    >
      <Trigger class={props.class} style={props.style} size={undefinedOr(props.size, 'medium')} />
      <ListBox size={undefinedOr(props.size, 'medium')} />
    </Root>
  )
}
