import { createElementBounds } from '@solid-primitives/bounds'
import { TableCore } from 'jige-core'
import { createWatch } from 'jige-utils'
import type { ComponentProps } from 'solid-js'
import { context } from './context'

export function Header(props: ComponentProps<'thead'>) {
  const [state, acts] = context.useContext()

  const bounds = createElementBounds(() => state.refHeader)

  createWatch(
    () => bounds.height,
    (h) => {
      acts.setState('headerHeight', h || 0)
    },
  )

  return (
    <div
      style={{
        overflow: 'hidden',
      }}
      ref={(el) => {
        acts.setState('refHeader', el)
      }}
    >
      <TableCore.Header {...props} />
    </div>
  )
}
