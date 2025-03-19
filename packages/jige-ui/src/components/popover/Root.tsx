import { FloatingUiCore } from 'jige-core'
import type { JSX } from 'solid-js'

import aniFloatCss from 'sass:../../styles/common/ani-floating-ui.scss'
import css from 'sass:./popover.scss'
import { mountStyle } from 'solid-uses'

export function Root(props: {
  children: JSX.Element
  trigger?: 'click' | 'hover' | 'manual'
  placement?:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
  openDelay?: number
  closeDelay?: number
  disabled?: boolean
}) {
  mountStyle(css, 'jige-ui-popover')
  mountStyle(aniFloatCss, 'jige-ui-ani-floating-ui')
  return <FloatingUiCore {...props} />
}
