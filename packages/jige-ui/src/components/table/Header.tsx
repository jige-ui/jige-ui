import { TableCore } from 'jige-core'
import type { ComponentProps } from 'solid-js'
import { context } from './context'
import { createElementBounds } from '@solid-primitives/bounds'
import { createWatch } from 'jige-utils'

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
