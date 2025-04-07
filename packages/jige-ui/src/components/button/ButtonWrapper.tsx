import { combineStyle } from 'jige-core'
import { createMemo, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { runIgnoreError } from '~/common/dom'
import { context } from './context'
import type { ButtonElement } from './types'

export function ButtonWrapper<T = string | undefined>(
  props: {
    href: T
    onClick?: (e: MouseEvent) => void | Promise<void>
    size: 'small' | 'medium' | 'large'
  } & ButtonElement<T>,
) {
  const [local, others] = splitProps(props, ['onClick', 'size', 'style', 'class'])
  const [state, actions] = context.useContext()
  const isAnchor = createMemo(() => {
    return !!props.href
  })

  const finalClasses = createMemo(() => {
    const classes = ['jg-btn', `jg-btn-${state.variant}`]

    if (state.iconOnly) classes.push('jg-btn-icon-only')
    if (state.loading) classes.push('is-loading')
    if (props.class) classes.push(props.class)

    return classes.join(' ')
  })

  const fontSize = createMemo(() => {
    if (props.size === 'small') return '13px'
    if (props.size === 'large') return '16px'
    return '14px'
  })

  const thisHeight = createMemo(() => {
    if (state.variant === 'solid' || state.variant === 'text') {
      if (props.size === 'small') return '24px'
      if (props.size === 'large') return '40px'
      return '32px'
    }

    return 'initial'
  })

  return (
    <Dynamic
      {...others}
      component={(isAnchor() ? 'a' : 'button') as any}
      onClick={(e: any) => {
        if (state.loading || isAnchor() || state.disabled) return
        if (local.onClick) {
          const doClick = async () => {
            actions.setLoading(true)
            if (local.onClick) {
              // eslint-disable-next-line solid/reactivity
              await runIgnoreError(() => local.onClick!(e))
            }
            actions.setLoading(false)
          }
          doClick()
        }
      }}
      style={combineStyle(
        {
          '--jg-btn-fg': state.color ? 'white' : 'var(--jg-fg2)',
          '--jg-btn-bg': state.color || 'var(--jg-t-bg1)',
          '--jg-btn-link-fg': state.color || 'var(--jg-fg-link)',
          '--jg-btn-text-fg': state.color || 'var(--jg-fg2)',
          '--jg-height': thisHeight(),
          '--jg-font-size': fontSize(),
          'border-radius': '.25em',
        },
        local.style,
      )}
      class={[finalClasses(), local.class].join(' ')}
    />
  )
}
