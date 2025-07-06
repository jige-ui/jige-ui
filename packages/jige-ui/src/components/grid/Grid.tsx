import { combineStyle } from 'jige-core'
import { type ComponentProps, splitProps } from 'solid-js'
import { mountStyle } from 'jige-utils'
import { cssGenerate } from './cssGenerate'

function generateClassNames(cols: number | string) {
  if (typeof cols === 'number') {
    return `grid-cols-${cols}`
  }
  const colsArr = cols.split(' ')
  const classNames = []
  for (const c of colsArr) {
    if (c.includes(':')) {
      const [breakPoint, col] = c.split(':')
      classNames.push(`${breakPoint}:grid-cols-${col}`)
    } else {
      classNames.push(`grid-cols-${c}`)
    }
  }
  return classNames.join(' ')
}

export function Grid(
  props: {
    cols?: number | string
  } & ComponentProps<'div'>,
) {
  const [local, others] = splitProps(props, ['cols', 'style', 'class'])
  mountStyle(
    cssGenerate({ maxCols: 24, breakPoints: { sm: 640, md: 768, lg: 1024, xl: 1280 } }),
    'jige-ui-grid',
  )

  return (
    <div
      {...others}
      class={[generateClassNames(local.cols || 24), local.class].join(' ')}
      style={combineStyle({ display: 'grid' }, local.style)}
    />
  )
}
