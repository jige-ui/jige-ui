import css from 'sass:./skeleton.scss'
import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'

import { combineStyle } from 'jige-core'
import { mountStyle } from 'jige-utils'

export function Node(
  props: {
    width?: string
    height?: string
    radius?: string
  } & JSX.HTMLAttributes<HTMLDivElement>,
) {
  mountStyle(css, 'jige-ui-skeleton')
  const [local, others] = splitProps(props, ['width', 'height', 'radius', 'style', 'class'])
  return (
    <div
      {...others}
      class={`jg-sk jg-sk-animated ${local.class ?? ''}`}
      style={combineStyle(
        {
          width: local.width || '100%',
          height: local.height || '12px',
          'border-radius': local.radius || '4px',
          position: 'relative',
        },
        local.style,
      )}
    />
  )
}
