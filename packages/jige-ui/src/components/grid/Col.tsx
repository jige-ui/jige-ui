import { combineStyle } from 'jige-core'
import { type ComponentProps, splitProps } from 'solid-js'

function generateClassNames(span: number | string) {
  if (typeof span === 'number') {
    return `col-span-${span}`
  }
  const spanArr = span.split(' ')
  const classNames = []
  for (const s of spanArr) {
    if (s.includes(':')) {
      const [breakPoint, span] = s.split(':')
      classNames.push(`${breakPoint}:col-span-${span}`)
    } else {
      classNames.push(`col-span-${s}`)
    }
  }
}

export function Col(
  props: ComponentProps<'div'> & {
    span?: number | string
  },
) {
  const [local, others] = splitProps(props, ['span', 'style', 'class'])

  return (
    <div
      {...others}
      class={[generateClassNames(props.span || 1), local.class].join(' ')}
      style={combineStyle({ display: 'block' }, local.style)}
    />
  )
}
