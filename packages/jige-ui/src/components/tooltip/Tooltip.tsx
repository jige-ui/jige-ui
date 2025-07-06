import { FloatingUiCore } from 'jige-core'
import type { JSX } from 'solid-js/jsx-runtime'

import aniFloatCss from 'sass:../../styles/common/ani-floating-ui.scss'
import css from 'sass:./tooltip.scss'

import { mountStyle } from 'jige-utils'
import { RootContext } from '../ROOT/context'

export function Tooltip(props: {
  content: string
  children: JSX.Element
  /**
   * @default 350
   */
  openDelay?: number
  closeDelay?: number
  placement?: 'top' | 'bottom' | 'left' | 'right'
  zIndex?: number
  trigger?: 'hover' | 'click'
  disabled?: boolean
}) {
  mountStyle(css, 'jige-ui-tooltip')
  mountStyle(aniFloatCss, 'jige-ui-ani-floating-ui')
  const [state] = RootContext.useContext()
  return (
    <FloatingUiCore
      placement={props.placement}
      openDelay={props.openDelay || 350}
      closeDelay={props.closeDelay}
      trigger={props.trigger}
      disabled={props.disabled}
    >
      <FloatingUiCore.Trigger>{props.children}</FloatingUiCore.Trigger>
      <FloatingUiCore.Content
        class='jg-tooltip-content ani-floating-ui-move'
        zindex={props.zIndex || state.zIndexConfig.tooltip}
      >
        {props.content}
      </FloatingUiCore.Content>
    </FloatingUiCore>
  )
}
