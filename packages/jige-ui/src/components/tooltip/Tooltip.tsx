import type { JSX } from 'solid-js/jsx-runtime'
import { FloatingUiCore } from 'jige-core'

import css from 'sass:./tooltip.scss'

import { mountStyle } from 'solid-uses'
import { RootContext } from '../ROOT/context'

export function Tooltip(props: {
  content: string
  children: JSX.Element
  openDelay?: number
  closeDelay?: number
  placement?: 'top' | 'bottom' | 'left' | 'right'
  zIndex?: number
  trigger?: 'hover' | 'click'
  disabled?: boolean
}) {
  mountStyle(css, 'jige-ui-tooltip')
  const [state] = RootContext.useContext()
  return (
    <FloatingUiCore placement={props.placement} openDelay={props.openDelay} closeDelay={props.closeDelay} trigger={props.trigger} disabled={props.disabled}>
      <FloatingUiCore.Trigger>{props.children}</FloatingUiCore.Trigger>
      <FloatingUiCore.Content class="jg-tooltip-content" zindex={props.zIndex || state.zIndexConfig.tooltip}>
        {props.content}
      </FloatingUiCore.Content>
    </FloatingUiCore>
  )
}
