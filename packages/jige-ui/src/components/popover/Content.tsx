import { FloatingUiCore } from 'jige-core'
import { type JSX, Show, splitProps } from 'solid-js'
import { combineStyle } from '~/common/dom'
import { RootContext } from '../ROOT/context'

export function Content(props: {
  arrow?: boolean
  background?: string
  color?: string
  zindex?: number
} & JSX.HTMLAttributes<HTMLDivElement>) {
  const [state] = RootContext.useContext()
  const [localProps, otherProps] = splitProps(props, ['arrow', 'background', 'color', 'zindex', 'children', 'class', 'style'])
  return (
    <FloatingUiCore.Content
      {...otherProps}
      class={`${localProps.class || ''} jg-popover-content`}
      style={combineStyle({
        '--jg-popover-bg': localProps.background || 'var(--jg-t-bg1)',
        '--jg-popover-color': localProps.color || 'var(--jg-fg1)',
      }, localProps.style)}
      zindex={localProps.zindex || state.zIndexConfig.popover}
    >
      {localProps.children}
      <Show when={localProps.arrow}>
        <FloatingUiCore.Arrow size={6} class="jg-popover-arrow" />
      </Show>
    </FloatingUiCore.Content>
  )
}
