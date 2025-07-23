import { TableCore } from 'jige-core'
import type { JSX } from 'solid-js'
import { context } from './context'

export function Header(props: {
  children: JSX.Element
}) {
  const [, acts] = context.useContext()
  return (
    <div
      ref={(el) => {
        acts.setState('refHeader', el)
      }}
    >
      <TableCore.Header>{props.children}</TableCore.Header>
    </div>
  )
}
