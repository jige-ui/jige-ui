import { ModalCore } from 'jige-core'
import { Show } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { Button } from '../button'
import { CloseLargeFill } from '../icons'

export function Header(props: {
  hideClose?: boolean
  children?: JSX.Element
  label?: string
}) {
  const [, modalActs] = ModalCore.useContext()

  return (
    <div class='jg-modal-header'>
      <div class='jg-modal-header-title'>{props.label || props.children}</div>
      <div class='jg-modal-header-close'>
        <Show when={!props.hideClose}>
          <Button
            color='var(--jg-fg3)'
            variant='text'
            icon={<CloseLargeFill />}
            onClick={() => {
              modalActs.setOpen(false)
            }}
          />
        </Show>
      </div>
    </div>
  )
}
