/* eslint-disable solid/reactivity */
import { ModalCore } from 'jige-core'
import { createMemo, Show } from 'solid-js'
import { Button } from '../button'

export function Footer(props: {
  type: 'error' | 'warning' | 'success'
  positiveText: string
  negativeText: string
  onPositiveClick?: () => void | Promise<void>
  onNegativeClick?: () => void | Promise<void>
}) {
  const [, actions] = ModalCore.useContext()
  const color = createMemo(() => {
    switch (props.type) {
      case 'error':
        return 'var(--jg-fg-danger)'
      case 'success':
        return 'var(--jg-fg-success)'
      case 'warning':
        return 'var(--jg-fg-warning)'
    }
  })
  return (
    <div style={{
      'display': 'flex',
      'align-items': 'center',
      'gap': '8px',
      'padding': '8px',
    }}
    >
      <Show when={props.negativeText}>
        <Button
          variant="text"
          color="var(--jg-fg4)"
          label={props.negativeText}
          onClick={async () => {
            await props.onNegativeClick?.()
            actions.setOpen(false)
          }}
        />
      </Show>
      <Show when={props.positiveText}>
        <Button
          color={color()}
          label={props.positiveText}
          onClick={async () => {
            await props.onPositiveClick?.()
            actions.setOpen(false)
          }}
        />
      </Show>
    </div>
  )
}
