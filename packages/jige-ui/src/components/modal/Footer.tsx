import { ModalCore } from 'jige-core'
import { Show, children } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { Button } from '../button'

export function Footer(props: {
  okText?: string
  cancelText?: string
  children?: JSX.Element
  onOk?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
  ref?: HTMLDivElement
}) {
  const child = children(() => props.children)
  const [, modalActs] = ModalCore.useContext()

  return (
    <div ref={props.ref}>
      <Show
        when={child()}
        fallback={
          <div class='jg-modal-footer'>
            <Button
              variant='text'
              color='var(--jg-fg3)'
              label={props.cancelText || '取消'}
              onClick={async () => {
                await props.onCancel?.()
                modalActs.setOpen(false)
              }}
            />
            <Button
              color='var(--jg-t-hl'
              label={props.okText || '确认'}
              onClick={async () => {
                await props.onOk?.()
                modalActs.setOpen(false)
              }}
            />
          </div>
        }
      >
        {child()}
      </Show>
    </div>
  )
}
