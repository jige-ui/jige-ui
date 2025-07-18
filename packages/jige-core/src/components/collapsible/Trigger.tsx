import type { MaybeContextChild } from '@/common/props'
import { callMaybeContextChild } from '@/common/props'
import { makeEventListener } from '@solid-primitives/event-listener'
import { Ref } from '@solid-primitives/refs'
import { createWatch } from 'jige-utils'
import { createSignal } from 'solid-js'
import context from './context'

export function Trigger(props: {
  children: MaybeContextChild<ReturnType<typeof context.useContext>>
}) {
  const [state, actions] = context.useContext()
  const [ref, setRef] = createSignal<HTMLElement>()
  let unMountEv = () => {}

  createWatch(ref, (el) => {
    unMountEv()
    if (!el) {
      return
    }

    unMountEv = makeEventListener(el, 'click', () => {
      if (state.status === 'closed') {
        actions.open()
      } else if (state.status === 'opened') {
        actions.close()
      }
    })
  })

  return <Ref ref={setRef}>{callMaybeContextChild(context.useContext(), props.children)}</Ref>
}
