import { Show } from 'solid-js'
import IconFluentDismiss24Regular from '~icons/fluent/dismiss-24-regular'
import { Button } from '../button'
import { Close } from './Close'

export function Header(props: {
  hideClose?: boolean
  title: string
}) {
  return (
    <div class='jg-drawer-header'>
      <Show when={!props.hideClose}>
        <Close>
          <Button
            class='jg-drawer-close'
            variant='text'
            icon={<IconFluentDismiss24Regular />}
          />
        </Close>
      </Show>
      <div>{props.title}</div>
    </div>
  )
}
