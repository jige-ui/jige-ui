import { combineStyle } from 'jige-core'
import type { Component, ComponentProps } from 'solid-js'
import { createMemo, mergeProps, splitProps } from 'solid-js'

type JustifyContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
type FlexDirection = 'row' | 'col' | 'row-reverse' | 'col-reverse'

type FlexProps = ComponentProps<'div'> & {
  direction?: FlexDirection
  justify?: JustifyContent
  align?: AlignItems
  inline?: boolean
  wrap?: boolean
  size?: 'small' | 'medium' | 'large' | number | [number, number]
}

const Flex: Component<FlexProps> = (rawProps) => {
  const props = mergeProps(
    {
      direction: 'row',
      justify: 'between',
      align: 'center',
      inline: false,
      wrap: true,
      size: 'medium',
    } satisfies FlexProps,
    rawProps,
  )
  const [local, others] = splitProps(props, [
    'direction',
    'justify',
    'align',
    'inline',
    'wrap',
    'size',
    'style',
  ])

  const gap = createMemo(() => {
    if (typeof local.size === 'string') {
      switch (local.size) {
        case 'small':
          return '4px 6px'
        case 'medium':
          return '8px 12px'
        case 'large':
          return '16px 24px'
      }
    }
    if (typeof local.size === 'number') {
      return `${local.size}px`
    }
    return `${local.size[0]}px ${local.size[1]}px`
  })

  return (
    <div
      style={combineStyle(
        {
          display: local.inline ? 'inline-flex' : 'flex',
          width: '100%',
          'flex-direction': flexDirectionStyleProperty[local.direction],
          'justify-content': justifyContentStyleProperty[local.justify],
          'align-items': local.align,
          'flex-wrap': local.wrap ? 'wrap' : 'nowrap',
          gap: gap(),
        },
        local.style,
      )}
      {...others}
    />
  )
}

export { Flex }

const justifyContentStyleProperty = {
  start: 'flex-start' as const,
  end: 'flex-end' as const,
  center: 'center' as const,
  between: 'space-between' as const,
  around: 'space-around' as const,
  evenly: 'space-evenly' as const,
}

const flexDirectionStyleProperty = {
  row: 'row' as const,
  col: 'column' as const,
  'row-reverse': 'row-reverse' as const,
  'col-reverse': 'column-reverse' as const,
}
