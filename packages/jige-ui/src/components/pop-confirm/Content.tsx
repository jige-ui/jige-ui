import { FloatingUiCore } from 'jige-core'
import { mergeProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { Button } from '../button'
import { WarningFill } from '../icons'

import css from 'sass:./pop-confirm.scss'
import { mountStyle } from 'solid-uses'

export function Content(props: {
  title?: string
  description?: string
  icon?: JSX.Element
  cancelText?: string
  okText?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
}) {
  mountStyle(css, 'jige-ui-pop-confirm')

  const finalProps = mergeProps(
    {
      icon: (
        <div
          style={{
            color: 'var(--jg-fg-warning)',
            'font-size': '1.25em',
            'margin-right': '4px',
          }}
        >
          <WarningFill />
        </div>
      ),
      cancelText: 'Cancel',
      okText: 'OK',
      title: 'Are you sure?',
      description: 'Are you sure you want to do this?',
    },
    props,
  )

  const [, popActs] = FloatingUiCore.useContext()
  return (
    <div class='jg-pop-confirm-content'>
      <div class='jg-pop-confirm-title'>
        {finalProps.icon}
        {finalProps.title}
      </div>
      <div class='jg-pop-confirm-description'>{finalProps.description}</div>
      <div class='jg-pop-confirm-actions'>
        <Button
          size={'small'}
          onClick={() => {
            finalProps.onCancel?.()
            popActs.setOpen(false)
          }}
        >
          {finalProps.cancelText}
        </Button>
        <Button
          size={'small'}
          onClick={async () => {
            await finalProps.onConfirm?.()
            popActs.setOpen(false)
          }}
          color='var(--jg-t-hl)'
        >
          {finalProps.okText}
        </Button>
      </div>
    </div>
  )
}
