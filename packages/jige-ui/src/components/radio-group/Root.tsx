import type { JSX } from 'solid-js/jsx-runtime'
import { RadioGroupCore } from 'jige-core'

import css from 'sass:./radio-group.scss'
import { mountStyle } from 'solid-uses'

export function Root(props: {
  children: JSX.Element
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
}) {
  mountStyle(css, 'jige-ui-radio-group')
  return (
    <RadioGroupCore value={props.value} onChange={props.onChange} disabled={props.disabled}>
      {props.children}
    </RadioGroupCore>
  )
}
