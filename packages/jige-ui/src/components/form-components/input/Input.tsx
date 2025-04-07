import styles from 'sass:./input.scss'
import { Match, Switch } from 'solid-js'
import { mountStyle } from 'solid-uses'

import { NormalInput } from './NormalInput'
import { PasswordInput } from './PasswordInput'
import { Textarea } from './Textarea'

export function Input(props: {
  type?: 'text' | 'textarea' | 'password'
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
}) {
  mountStyle(styles, 'jige-ui-input')
  return (
    <Switch fallback={<NormalInput {...(props as any)} />}>
      <Match when={props.type === 'textarea'}>
        <Textarea {...props} />
      </Match>
      <Match when={props.type === 'password'}>
        <PasswordInput {...props} />
      </Match>
    </Switch>
  )
}
