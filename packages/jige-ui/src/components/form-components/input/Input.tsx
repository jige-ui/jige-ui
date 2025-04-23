import styles from 'sass:./input.scss'
import { Match, Switch } from 'solid-js'
import { mountStyle } from 'solid-uses'

import { NormalInput } from './NormalInput'
import { PasswordInput } from './PasswordInput'
import { Textarea } from './Textarea'
import type { JigeInputProps } from './types'

export function Input(props: JigeInputProps) {
  mountStyle(styles, 'jige-ui-input')
  return (
    <Switch fallback={<NormalInput {...props} />}>
      <Match when={props.type === 'textarea'}>
        <Textarea
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      </Match>
      <Match when={props.type === 'password'}>
        <PasswordInput {...props} />
      </Match>
    </Switch>
  )
}
