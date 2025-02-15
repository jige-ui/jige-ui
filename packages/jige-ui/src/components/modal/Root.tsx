import type { JSX } from 'solid-js/jsx-runtime'
import { ModalCore } from 'jige-core'

import css from 'sass:./modal.scss'
import { mountStyle } from 'solid-uses'
import { context } from './context'

export function Root(props: {
  children: JSX.Element
  open?: boolean
  onOpenChange?: (open: boolean) => void
  preventScroll?: boolean
  closeOnInteractOutside?: boolean
  closeOnEsc?: boolean
}) {
  mountStyle(css, 'jige-ui-modal')
  const Context = context.initial()
  return (
    <Context.Provider>
      <ModalCore {...props} />
    </Context.Provider>
  )
}
