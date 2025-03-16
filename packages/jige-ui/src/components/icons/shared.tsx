import { createMemo } from 'solid-js'

export function IconSvgWrapper(props: {
  children: any
  viewBoxSize?: number
}) {
  const size = createMemo(() => props.viewBoxSize || 24)
  return (
    <svg
      aria-label='icon'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox={`0 0 ${size()} ${size()}`}
    >
      {props.children}
    </svg>
  )
}
