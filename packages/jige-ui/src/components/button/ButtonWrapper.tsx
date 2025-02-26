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
  disabled?: boolean
  ref?: HTMLAnchorElement | HTMLButtonElement | ((el: HTMLAnchorElement | HTMLButtonElement) => void)
  type: 'button' | 'submit' | 'reset'
  download?: boolean
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

  return (
    <Dynamic
      disabled={props.disabled}
      component={isAnchor() ? 'a' : 'button'}
      type={props.type}
      ref={props.ref as any}
      href={props.href}
      target={props.target}
      download={props.download}
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
        '--jg-btn-fg': state.color ? 'white' : 'var(--jg-fg2)',
        '--jg-btn-bg': state.color || 'var(--jg-t-bg1)',
        '--jg-btn-link-fg': state.color || 'var(--jg-fg-link)',
        '--jg-btn-text-fg': state.color || 'var(--jg-fg2)',
        'border-radius': '.25em',
      }, props.style)}
      class={finalClasses()}
    >
      {props.children}
    </Dynamic>
  )
}
