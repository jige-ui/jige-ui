import { ModalCore } from 'jige-core'
import type { JSX } from 'solid-js/jsx-runtime'

import css from 'sass:./drawer.scss'
import { mountStyle } from 'jige-utils'

export function Root(props: {
  children: JSX.Element
  open?: boolean
  onOpenChange?: (open: boolean) => void
  preventScroll?: boolean
  closeOnClickMask?: boolean
  closeOnEsc?: boolean
}) {
  mountStyle(css, 'jige-ui-drawer')
  return <ModalCore {...props} />
}
