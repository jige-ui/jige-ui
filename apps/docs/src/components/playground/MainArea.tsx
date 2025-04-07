import type { JSX } from 'solid-js'

export function MainArea(props: {
  children: JSX.Element
}) {
  return (
    <div
      class='flex flex-1 py-20 justify-start items-center flex-col w-full'
      style={{
        'background-image': 'radial-gradient(circle, var(--jg-t-border) 1px, transparent 1px)',
        'background-size': '16px 16px',
      }}
    >
      {props.children}
    </div>
  )
}
