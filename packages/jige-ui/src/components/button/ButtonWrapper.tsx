import type { JSX } from 'solid-js/jsx-runtime'
import { createMemo } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { combineStyle, runIgnoreError } from '~/common/dom'
import { context } from './context'

export function ButtonWrapper(props: {
  children: JSX.Element
  onClick?: (e: MouseEvent) => void | Promise<void>
  href?: string
  style?: string | JSX.CSSProperties
  class?: string
  target?: string
  shape?: 'rounded' | 'circle' | 'squared'
  disabled?: boolean
}) {
  const [state, actions] = context.useContext()
  const isAnchor = createMemo(() => {
    return !!props.href
  })

  const finalClasses = createMemo(() => {
    const classes = ['jg-btn', `jg-btn-${state.variant}`]

    if (state.iconOnly)
      classes.push('jg-btn-icon-only')
    if (state.loading)
      classes.push('is-loading')
    if (props.class)
      classes.push(props.class)

    return classes.join(' ')
  })

  const borderRadius = createMemo(() => {
    switch (props.shape) {
      case 'circle':
        return '50%'
      case 'squared':
        return '0'
      default:
        return '0.25em'
    }
  })

  return (
    <Dynamic
      disabled={props.disabled}
      component={isAnchor() ? 'a' : 'button'}
      href={props.href}
      target={props.target}
      onClick={(e: any) => {
        if (state.loading || isAnchor() || props.disabled)
          return
        if (props.onClick) {
          const doClick = async () => {
            actions.setLoading(true)
            if (props.onClick) {
              // eslint-disable-next-line solid/reactivity
              await runIgnoreError(() => props.onClick!(e))
            }
            actions.setLoading(false)
          }
          doClick()
        }
      }}
      style={combineStyle({
        '--jg-btn-color': state.color || 'var(--jg-fg1)',
        '--jg-btn-border-color': state.color || 'var(--jg-t-border)',
        '--jg-btn-link-color': state.color || 'var(--jg-fg-link)',
        '--jg-btn-hl-color': state.color || 'var(--jg-t-hl)',
        'border-radius': borderRadius(),
      }, props.style)}
      class={finalClasses()}
    >
      {props.children}
    </Dynamic>
  )
}
