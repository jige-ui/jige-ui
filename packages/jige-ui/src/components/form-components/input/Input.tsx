import styles from 'sass:./input.scss'
import { mountStyle } from 'jige-utils'
import { Match, Switch } from 'solid-js'

import { NormalInput } from './NormalInput'
import { PasswordInput } from './PasswordInput'
import { Textarea } from './Textarea'
import type { JigeInputProps } from './types'

export function Input(props: JigeInputProps) {
  mountStyle(styles, 'jige-ui-input')
  return (
    <Switch fallback={<NormalInput {...props} />}>
      <Match when={props.type === 'textarea'}>
        <Textarea {...props} />
      </Match>
      <Match when={props.type === 'password'}>
        <PasswordInput {...props} />
      </Match>
    </Switch>
  )
}
