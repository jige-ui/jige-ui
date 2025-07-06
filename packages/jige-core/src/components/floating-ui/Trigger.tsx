import { makeEventListener } from '@solid-primitives/event-listener'
import { Ref, mergeRefs } from '@solid-primitives/refs'
import { createWatch } from 'jige-utils'
import type { JSX } from 'solid-js'
import { context } from './context'

// this is the trgger component
export function Trigger(props: {
  ref?: HTMLElement | ((el: HTMLElement) => void)
  children: JSX.Element
}) {
  const [state, actions] = context.useContext()

  createWatch(
    () => state.refTrigger,
    (refTrigger) => {
      if (!refTrigger) return

      makeEventListener(refTrigger, 'mouseenter', () => {
        state.trigger === 'hover' && actions.setTimerOpen(true)
      })

      makeEventListener(refTrigger, 'mouseleave', () => {
        state.trigger === 'hover' && actions.setTimerOpen(false)
      })

      makeEventListener(refTrigger, 'click', () => {
        state.trigger === 'click' && actions.setOpen(state.status === 'closed')
      })
    },
  )

  createWatch([() => state.status, () => state.placement], ([status, placement]) => {
    const refTrigger = state.refTrigger
    if (!refTrigger) return

    refTrigger.setAttribute('data-floating-status', status)
    refTrigger.setAttribute('data-floating-placement', placement)
  })

  return (
    <Ref
      ref={
        mergeRefs(props.ref, (el) => {
          actions.setState('refTrigger', el)
        }) as any
      }
    >
      {props.children}
    </Ref>
  )
}
